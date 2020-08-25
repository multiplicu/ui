import {
  ChangeDetectionStrategy,
  Component,
  DoCheck,
  ElementRef,
  Input,
  Optional,
  Self,
} from '@angular/core';
import { FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import {
  CanUpdateErrorState,
  CanUpdateErrorStateCtor,
  coerceBooleanProperty,
  ErrorStateMatcher,
  getSupportedInputTypes,
  mixinErrorState,
} from '@multiplicu/ui/core';
import { XcuFormFieldControl } from '@multiplicu/ui/form/form-field';
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
const _XcuInputMixinBase: CanUpdateErrorStateCtor &
  typeof XcuInputBase = mixinErrorState(XcuInputBase);

@Component({
  selector: 'input[xcu-input], textarea[xcu-input]',
  exportAs: 'xcuInput',
  host: {
    class: 'xcu-input-element',
    // Native input properties that are overwritten by Angular inputs need to be synced with
    // the native input element. Otherwise property bindings for those don't work.
    '[attr.id]': 'id',
    '[disabled]': 'disabled',
    '[required]': 'required',
    '[attr.readonly]': 'readonly || null',
    '[attr.aria-invalid]': 'errorState',
    '[attr.aria-required]': 'required.toString()',
  },
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: XcuFormFieldControl, useExisting: XcuInputComponent }],
})
export class XcuInputComponent extends _XcuInputMixinBase
  implements XcuFormFieldControl<any>, DoCheck, CanUpdateErrorState {
  protected _uid = `xcu-input-${nextUniqueId++}`;
  protected _previousNativeValue: any;
  private _inputValueAccessor: { value: any };

  /** Whether the component is a textarea. */
  readonly _isTextarea: boolean;

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
   * Implemented as part of XcuFormFieldControl.
   * @docs-private
   */
  @Input()
  public get required(): boolean {
    return this._required;
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
    let validity: ValidityState = (this._elementRef
      .nativeElement as HTMLInputElement).validity;
    return validity && validity.badInput;
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
    protected _elementRef: ElementRef<HTMLInputElement | HTMLTextAreaElement>,
    @Optional() @Self() public ngControl: NgControl,
    @Optional() _parentForm: NgForm,
    @Optional() _parentFormGroup: FormGroupDirective,
    public _defaultErrorStateMatcher: ErrorStateMatcher
  ) {
    super(_defaultErrorStateMatcher, _parentForm, _parentFormGroup, ngControl);

    const element: HTMLInputElement | HTMLTextAreaElement = this._elementRef
      .nativeElement;

    this._inputValueAccessor = element;
  }

  public ngDoCheck(): void {
    if (this.ngControl) {
      // We need to re-evaluate this on every change detection cycle, because there are some
      // error triggers that we can't subscribe to (e.g. parent form submissions). This means
      // that whatever logic is in here has to be super lean or we risk destroying the performance.
      this.updateErrorState();
    }

    // We need to dirty-check the native element's value, because there are some cases where
    // we won't be notified when it changes (e.g. the consumer isn't using forms or they're
    // updating the value using `emitEvent: false`).
    this._dirtyCheckNativeValue();
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
}
