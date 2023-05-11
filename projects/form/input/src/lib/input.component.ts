import {
  ChangeDetectionStrategy,
  Component,
  DoCheck,
  ElementRef,
  Inject,
  Input,
  NgZone,
  Optional,
  Self,
} from '@angular/core';
import {
  FormGroupDirective,
  NgControl,
  NgForm,
  Validators,
} from '@angular/forms';
import {
  CanUpdateErrorState,
  CanUpdateErrorStateCtor,
  coerceBooleanProperty,
  ErrorStateMatcher,
  getSupportedInputTypes,
  mixinErrorState,
  Platform,
} from '@multiplicu/ui/core';
import {
  XcuFormFieldComponent,
  XcuFormFieldControl,
  XCU_FORM_FIELD,
} from '@multiplicu/ui/form/form-field';
import { Subject } from 'rxjs';

let nextUniqueId: number = 0;

// Boilerplate for applying mixins to MatInput.
/** @docs-private */
class XcuInputBase {
  constructor(
    public _defaultErrorStateMatcher: ErrorStateMatcher,
    public _parentForm: NgForm,
    public _parentFormGroup: FormGroupDirective,
    /** @docs-private */
    public ngControl: NgControl
  ) {}
}
const _XcuInputMixinBase: CanUpdateErrorStateCtor & typeof XcuInputBase =
  mixinErrorState(XcuInputBase);

@Component({
  selector: 'input[xcu-input], textarea[xcu-input], select[xcu-native-control]',
  exportAs: 'xcuInput',
  host: {
    class: 'xcu-input-element',
    // Native input properties that are overwritten by Angular inputs need to be synced with
    // the native input element. Otherwise property bindings for those don't work.
    '[attr.id]': 'id',
    '[disabled]': 'disabled',
    '[required]': 'required',
    '[attr.name]': 'name || null',
    '[attr.readonly]': 'readonly && !_isNativeSelect || null',
    '[attr.aria-invalid]': 'errorState',
    '[attr.aria-required]': 'required.toString()',
    '(focus)': '_focusChanged(true)',
    '(blur)': '_focusChanged(false)',
    '(input)': '_onInput()',
  },
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [{ provide: XcuFormFieldControl, useExisting: XcuInputComponent }],
})
export class XcuInputComponent
  extends _XcuInputMixinBase
  implements XcuFormFieldControl<any>, DoCheck, CanUpdateErrorState
{
  protected _uid = `xcu-input-${nextUniqueId++}`;
  protected _previousNativeValue: any;
  private _inputValueAccessor: { value: any };
  private _previousPlaceholder: string | null;

  /** Whether the component is being rendered on the server. */
  readonly _isServer: boolean;

  /** Whether the component is a native html select. */
  readonly _isNativeSelect: boolean;

  /** Whether the component is a textarea. */
  readonly _isTextarea: boolean;

  /** Whether the input is inside of a form field. */
  readonly _isInFormField: boolean;

  /**
   * Implemented as part of XcuFormFieldControl.
   * @docs-private
   */
  public focused: boolean = false;

  /**
   * Implemented as part of XcuFormFieldControl.
   * @docs-private
   */
  readonly stateChanges: Subject<void> = new Subject<void>();

  /**
   * Implemented as part of XcuFormFieldControl.
   * @docs-private
   */
  public controlType: string = 'xcu-input';

  /**
   * Implemented as part of XcuFormFieldControl.
   * @docs-private
   */
  public autofilled: boolean = false;

  /**
   * Implemented as part of XcuFormFieldControl.
   * @docs-private
   */
  public element!: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

  /**
   * Implemented as part of XcuFormFieldControl.
   * @docs-private
   */
  @Input()
  public get disabled(): boolean {
    if (this.ngControl && this.ngControl.disabled !== null) {
      return this.ngControl.disabled;
    }
    return this._disabled;
  }
  public set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);

    // Browsers may not fire the blur event if the input is disabled too quickly.
    // Reset from here to ensure that the element doesn't become stuck.
    if (this.focused) {
      this.focused = false;
      this.stateChanges.next();
    }
  }
  protected _disabled = false;

  /**
   * Implemented as part of XcuFormFieldControl.
   * @docs-private
   */
  @Input()
  public get id(): string {
    return this._id;
  }
  public set id(value: string) {
    this._id = value || this._uid;
  }
  protected _id: string;

  /**
   * Implemented as part of XcuFormFieldControl.
   * @docs-private
   */
  @Input()
  public placeholder: string;

  /**
   * Name of the input.
   * @docs-private
   */
  @Input()
  public name: string;

  /**
   * Implemented as part of XcuFormFieldControl.
   * @docs-private
   */
  @Input()
  public get required(): boolean {
    return (
      this._required ??
      this.ngControl?.control?.hasValidator(Validators.required) ??
      false
    );
  }
  public set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
  }
  protected _required = false;

  /** Input type of the element. */
  @Input()
  public get type(): string {
    return this._type;
  }
  public set type(value: string) {
    this._type = value || 'text';
    // this._validateType();

    // // When using Angular inputs, developers are no longer able to set the properties on the native
    // // input element. To ensure that bindings for `type` work, we need to sync the setter
    // // with the native property. Textarea elements don't support the type property or attribute.
    // if (!this._isTextarea && getSupportedInputTypes().has(this._type)) {
    //   (this._elementRef.nativeElement as HTMLInputElement).type = this._type;
    // }
  }
  protected _type = 'text';

  /** An object used to control when error messages are shown. */
  @Input() public errorStateMatcher: ErrorStateMatcher;

  /**
   * Implemented as part of XcuFormFieldControl.
   * @docs-private
   */
  @Input('aria-describedby')
  public userAriaDescribedBy: string;

  /**
   * Implemented as part of XcuFormFieldControl.
   * @docs-private
   */
  @Input()
  public get value(): string {
    return this._inputValueAccessor.value;
  }
  public set value(value: string) {
    if (value !== this.value) {
      this._inputValueAccessor.value = value;
      this.stateChanges.next();
    }
  }

  /** Whether the element is readonly. */
  @Input()
  public get readonly(): boolean {
    return this._readonly;
  }
  public set readonly(value: boolean) {
    this._readonly = coerceBooleanProperty(value);
  }
  private _readonly = false;

  protected _neverEmptyInputTypes: string[] = [
    'date',
    'datetime',
    'datetime-local',
    'month',
    'time',
    'week',
  ].filter((t: string) => getSupportedInputTypes().has(t));

  /** Does some manual dirty checking on the native input `value` property. */
  protected _dirtyCheckNativeValue(): void {
    const newValue = this._elementRef.nativeElement.value;

    if (this._previousNativeValue !== newValue) {
      this._previousNativeValue = newValue;
      this.stateChanges.next();
    }
  }

  /** Checks whether the input type is one of the types that are never empty. */
  protected _isNeverEmpty(): boolean {
    return this._neverEmptyInputTypes.indexOf(this._type) > -1;
  }

  /** Checks whether the input is invalid based on the native validation. */
  protected _isBadInput(): boolean {
    // The `validity` property won't be present on platform-server.
    let validity: ValidityState = (
      this._elementRef.nativeElement as HTMLInputElement
    ).validity;
    return validity && validity.badInput;
  }

  /** Gets the current placeholder of the form field. */
  protected _getPlaceholder(): string | null {
    return this.placeholder || null;
  }

  /** Does some manual dirty checking on the native input `placeholder` attribute. */
  private _dirtyCheckPlaceholder(): void {
    const placeholder = this._getPlaceholder();
    if (placeholder !== this._previousPlaceholder) {
      const element = this._elementRef.nativeElement;
      this._previousPlaceholder = placeholder;
      placeholder
        ? element.setAttribute('placeholder', placeholder)
        : element.removeAttribute('placeholder');
    }
  }

  /**
   * Implemented as part of XcuFormFieldControl.
   * @docs-private
   */
  public get empty(): boolean {
    return (
      !this._isNeverEmpty() &&
      !this._elementRef.nativeElement.value &&
      !this._isBadInput() &&
      !this.autofilled
    );
  }

  public constructor(
    protected _elementRef: ElementRef<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
    protected _platform: Platform,
    @Optional() @Self() public ngControl: NgControl,
    @Optional() _parentForm: NgForm,
    @Optional() _parentFormGroup: FormGroupDirective,
    public _defaultErrorStateMatcher: ErrorStateMatcher,
    public ngZone: NgZone,
    @Optional() @Inject(XCU_FORM_FIELD) public _formField: XcuFormFieldComponent
  ) {
    super(_defaultErrorStateMatcher, _parentForm, _parentFormGroup, ngControl);

    this.element = this._elementRef.nativeElement;
    const nodeName = this.element.nodeName.toLowerCase();

    this._inputValueAccessor = this.element;
    this._previousNativeValue = this.value;

    // Force setter to be called in case id was not specified.
    this.id = this.id;

    if (_platform.IOS) {
      ngZone.runOutsideAngular(() => {
        this._elementRef.nativeElement.addEventListener(
          'keyup',
          this._iOSKeyupListener
        );
      });
    }

    this._isServer = !this._platform.isBrowser;
    this._isNativeSelect = nodeName === 'select';
    this._isTextarea = nodeName === 'textarea';
    this._isInFormField = !!_formField;

    if (this._isNativeSelect) {
      this.controlType = (this.element as HTMLSelectElement).multiple
        ? 'xcu-native-select-multiple'
        : 'xcu-native-select';
    }
  }

  public ngAfterViewInit(): void {
    if (this._platform.isBrowser) {
      // this._autofillMonitor
      //   .monitor(this._elementRef.nativeElement)
      //   .subscribe((event) => {
      //     this.autofilled = event.isAutofilled;
      //     this.stateChanges.next();
      //   });
    }
  }

  public ngOnChanges(): void {
    this.stateChanges.next();
  }

  public ngOnDestroy(): void {
    this.stateChanges.complete();

    if (this._platform.IOS) {
      this._elementRef.nativeElement.removeEventListener(
        'keyup',
        this._iOSKeyupListener
      );
    }
  }

  public ngDoCheck(): void {
    if (this.ngControl) {
      // We need to re-evaluate this on every change detection cycle, because there are some
      // error triggers that we can't subscribe to (e.g. parent form submissions). This means
      // that whatever logic is in here has to be super lean or we risk destroying the performance.
      this.updateErrorState();

      // Since the input isn't a `ControlValueAccessor`, we don't have a good way of knowing when
      // the disabled state has changed. We can't use the `ngControl.statusChanges`, because it
      // won't fire if the input is disabled with `emitEvents = false`, despite the input becoming
      // disabled.
      if (
        this.ngControl.disabled !== null &&
        this.ngControl.disabled !== this.disabled
      ) {
        this.disabled = this.ngControl.disabled;
        this.stateChanges.next();
      }
    }

    // We need to dirty-check the native element's value, because there are some cases where
    // we won't be notified when it changes (e.g. the consumer isn't using forms or they're
    // updating the value using `emitEvent: false`).
    this._dirtyCheckNativeValue();

    // We need to dirty-check and set the placeholder attribute ourselves, because whether it's
    // present or not depends on a query which is prone to "changed after checked" errors.
    this._dirtyCheckPlaceholder();
  }

  /** Focuses the input. */
  public focus(options?: FocusOptions): void {
    this._elementRef.nativeElement.focus(options);
  }

  /**
   * Implemented as part of XcuFormFieldControl.
   * @docs-private
   */
  public setDescribedByIds(ids: string[]): void {
    if (ids.length) {
      this._elementRef.nativeElement.setAttribute(
        'aria-describedby',
        ids.join(' ')
      );
    } else {
      this._elementRef.nativeElement.removeAttribute('aria-describedby');
    }
  }

  /**
   * Implemented as part of XcuFormFieldControl.
   * @docs-private
   */
  public onContainerClick(): void {
    // Do not re-focus the input element if the element is already focused. Otherwise it can happen
    // that someone clicks on a time input and the cursor resets to the "hours" field while the
    // "minutes" field was actually clicked. See: https://github.com/angular/components/issues/12849
    if (!this.focused) {
      this.focus();
    }
  }

  /** Callback for the cases where the focused state of the input changes. */
  private _focusChanged(isFocused: boolean): void {
    if (isFocused !== this.focused) {
      this.focused = isFocused;
      this.stateChanges.next();
    }
  }

  private _onInput(): void {
    // This is a noop function and is used to let Angular know whenever the value changes.
    // Angular will run a new change detection each time the `input` event has been dispatched.
    // It's necessary that Angular recognizes the value change, because when floatingLabel
    // is set to false and Angular forms aren't used, the placeholder won't recognize the
    // value changes and will not disappear.
    // Listening to the input event wouldn't be necessary when the input is using the
    // FormsModule or ReactiveFormsModule, because Angular forms also listens to input events.
  }

  private _iOSKeyupListener = (event: Event): void => {
    const el = event.target as HTMLInputElement;

    // Note: We specifically check for 0, rather than `!el.selectionStart`, because the two
    // indicate different things. If the value is 0, it means that the caret is at the start
    // of the input, whereas a value of `null` means that the input doesn't support
    // manipulating the selection range. Inputs that don't support setting the selection range
    // will throw an error so we want to avoid calling `setSelectionRange` on them. See:
    // https://html.spec.whatwg.org/multipage/input.html#do-not-apply
    if (!el.value && el.selectionStart === 0 && el.selectionEnd === 0) {
      // Note: Just setting `0, 0` doesn't fix the issue. Setting
      // `1, 1` fixes it for the first time that you type text and
      // then hold delete. Toggling to `1, 1` and then back to
      // `0, 0` seems to completely fix it.
      el.setSelectionRange(1, 1);
      el.setSelectionRange(0, 0);
    }
  };
}
