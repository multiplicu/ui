import {
  ChangeDetectionStrategy,
  ElementRef,
  ChangeDetectorRef,
  Input,
  Output,
  EventEmitter,
  HostBinding,
  ViewChild,
  forwardRef,
  Component,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  CanDisableCtor,
  mixinDisabled,
  coerceBooleanProperty,
} from '@multiplicu/ui/core';

// Increasing integer for generating unique ids for checkbox components.
let nextUniqueId: number = 0;

/**
 * Provider Expression that allows mat-checkbox to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)].
 * @docs-private
 */
export const CHECKBOX_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => XcuCheckboxComponent),
  multi: true,
};

/** Change event object emitted by MatCheckbox. */
export class XcuCheckboxChange {
  /** The source MatCheckbox of the event. */
  source: XcuCheckboxComponent;
  /** The new `checked` value of the checkbox. */
  checked: boolean;
}

/**
 * Represents the different states that require custom transitions between them.
 * @docs-private
 */
export const enum TransitionCheckState {
  /** The initial state of the component before any user interaction. */
  Init,
  /** The state representing the component when it's becoming checked. */
  Checked,
  /** The state representing the component when it's becoming unchecked. */
  Unchecked,
  /** The state representing the component when it's becoming indeterminate. */
  Indeterminate,
}

const CHECKBOX_HOST_ATTRIBUTES = ['xcu-checkbox', 'xcu-checkbox--small'];

class XcuCheckboxBase {
  public constructor(public elementRef: ElementRef) {}
}

const _XcuCheckboxMixinBase: CanDisableCtor &
  typeof XcuCheckboxBase = mixinDisabled(XcuCheckboxBase);

@Component({
  selector: 'xcu-checkbox, input[xcu-checkbox]',
  exportAs: 'xcuCheckbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CHECKBOX_CONTROL_VALUE_ACCESSOR],
})
export class XcuCheckboxComponent
  extends _XcuCheckboxMixinBase
  implements ControlValueAccessor {
  /**
   * Attached to the aria-label attribute of the host element. In most cases, aria-labelledby will
   * take precedence so this may be omitted.
   */
  @Input('aria-label') public ariaLabel: string = '';

  /**
   * Users can specify the `aria-labelledby` attribute which will be forwarded to the input element
   */
  @Input('aria-labelledby') public ariaLabelledby: string | null = null;

  /** The 'aria-describedby' attribute is read after the element's label and field type. */
  @Input('aria-describedby') public ariaDescribedby: string;

  private _uniqueId: string = `xcu-checkbox-${++nextUniqueId}`;

  /** A unique id for the checkbox input. If none is supplied, it will be auto-generated. */
  @Input() public id: string = this._uniqueId;

  /** Name value will be applied to the input element if present */
  @Input() public name: string | null = null;

  /** Returns the unique id for the visual hidden input. */
  public get inputId(): string {
    return `${this.id || this._uniqueId}-input`;
  }

  /** Returns the type of input, generally a checkbox. */
  public get type(): string {
    return this.radio ? 'radio' : 'checkbox';
  }

  /** Whether the checkbox is required. */
  @Input()
  public get required(): boolean {
    return this._required;
  }
  public set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
  }
  private _required: boolean;

  /**
   * Whether the checkbox is disabled. This fully overrides the implementation provided by
   * mixinDisabled, but the mixin is still required because mixinTabIndex requires it.
   */
  @Input()
  @HostBinding('class.disabled')
  public get disabled() {
    return this._disabled;
  }
  public set disabled(value: any) {
    const newValue = coerceBooleanProperty(value);

    if (newValue !== this.disabled) {
      this._disabled = newValue;
      this._changeDetectorRef.markForCheck();
    }
  }
  private _disabled: boolean = false;

  /**
   * Whether the checkbox is checked.
   */
  @Input()
  public get checked(): boolean {
    return this._checked;
  }
  public set checked(value: boolean) {
    if (value !== this.checked) {
      this._checked = value;
      this._changeDetectorRef.markForCheck();
    }
  }
  private _checked: boolean = false;

  /**
   * Whether the input should be a radio element styled as a checkbox.
   */
  @Input()
  public get radio(): boolean {
    return this._radio;
  }
  public set radio(value: boolean) {
    this._radio = coerceBooleanProperty(value);
  }
  private _radio: boolean = false;

  /**
   * Whether the checkbox is indeterminate. This is also known as "mixed" mode and can be used to
   * represent a checkbox with three states, e.g. a checkbox that represents a nested list of
   * checkable items. Note that whenever checkbox is manually clicked, indeterminate is immediately
   * set to false.
   */
  @Input()
  public get indeterminate(): boolean {
    return this._indeterminate;
  }
  public set indeterminate(value: boolean) {
    const changed: boolean = value !== this._indeterminate;
    this._indeterminate = coerceBooleanProperty(value);

    if (changed) {
      if (this._indeterminate) {
        this.transitionCheckState_(TransitionCheckState.Indeterminate);
      } else {
        this.transitionCheckState_(
          this.checked
            ? TransitionCheckState.Checked
            : TransitionCheckState.Unchecked
        );
      }

      this.indeterminateChange.emit(this._indeterminate);
    }

    this._syncIndeterminate(this._indeterminate);
  }
  private _indeterminate: boolean = false;

  /** Event emitted when the checkbox's `checked` value changes. */
  @Output() public readonly change: EventEmitter<
    XcuCheckboxChange
  > = new EventEmitter<XcuCheckboxChange>();

  /** Event emitted when the checkbox's `indeterminate` value changes. */
  @Output() public readonly indeterminateChange: EventEmitter<
    boolean
  > = new EventEmitter<boolean>();

  /** The native `<input type="checkbox">` element */
  @ViewChild('input') private _inputElement: ElementRef<HTMLInputElement>;

  private _currentCheckState: TransitionCheckState = TransitionCheckState.Init;

  /**
   * Called when the checkbox is blurred. Needed to properly implement ControlValueAccessor.
   * @docs-private
   */
  private _onTouched: () => any = () => {};

  private _controlValueAccessorChangeFn: (value: any) => void = () => {};

  public constructor(
    public elementRef: ElementRef,
    private _changeDetectorRef: ChangeDetectorRef
  ) {
    super(elementRef);

    // For each of the variant selectors that is present in the checkbox's host
    // attributes, add the correct corresponding class.
    for (const attr of CHECKBOX_HOST_ATTRIBUTES) {
      if (this._hasHostAttributes(attr)) {
        (this._getHostElement() as HTMLElement).classList.add(attr);
      }
    }

    // Add a class that applies to all checkboxs. This makes it easier to target if somebody
    // wants to target all checkboxs. We do it here rather than `host` to ensure that
    // the class is applied to derived classes.
    elementRef.nativeElement.classList.add('xcu-checkbox');
  }

  /** Toggles the `checked` state of the checkbox. */
  public toggle(): void {
    this.checked = !this.checked;
  }

  /**
   * Event handler for checkbox input element.
   * Toggles checked state if element is not disabled.
   * Do not toggle on (change) event since IE doesn't fire change event when
   *   indeterminate checkbox is clicked.
   * @param event
   */
  public onInputClick(event: Event): void {
    // We have to stop propagation for click events on the visual hidden input element.
    // By default, when a user clicks on a label element, a generated click event will be
    // dispatched on the associated input element. Since we are using a label element as our
    // root container, the click event on the `checkbox` will be executed twice.
    // The real click event will bubble up, and the generated click event also tries to bubble up.
    // This will lead to multiple click events.
    // Preventing bubbling for the second event will solve that issue.
    event.stopPropagation();
  }

  public onInteractionEvent(event: Event): void {
    // We always have to stop propagation on the change event.
    // Otherwise the change event, from the input element, will bubble up and
    // emit its event object to the `change` output.
    event.stopPropagation();

    if (!this.disabled) {
      this.toggle();
      this.transitionCheckState_(
        this._checked
          ? TransitionCheckState.Checked
          : TransitionCheckState.Unchecked
      );

      // Emit our custom change event if the native input emitted one.
      // It is important to only emit it, if the native input triggered one, because
      // we don't want to trigger a change event, when the `checked` variable changes for example.
      this._emitChangeEvent();
    }
  }

  public getAriaChecked(): 'true' | 'false' | 'mixed' {
    if (this.checked) {
      return 'true';
    }

    return this.indeterminate ? 'mixed' : 'false';
  }

  // Implemented as part of ControlValueAccessor.
  public writeValue(value: any): void {
    this.checked = !!value;
  }

  // Implemented as part of ControlValueAccessor.
  public registerOnChange(fn: (value: any) => void): void {
    this._controlValueAccessorChangeFn = fn;
  }

  // Implemented as part of ControlValueAccessor.
  public registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  // Implemented as part of ControlValueAccessor.
  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  private transitionCheckState_(newState: TransitionCheckState): void {
    let oldState: TransitionCheckState = this._currentCheckState;
    let element: HTMLElement = this.elementRef.nativeElement;

    if (oldState === newState) {
      return;
    }

    this._currentCheckState = newState;
  }

  private _emitChangeEvent(): void {
    const event: XcuCheckboxChange = new XcuCheckboxChange();
    event.source = this;
    event.checked = this.checked;

    this._controlValueAccessorChangeFn(this.checked);
    this.change.emit(event);
  }

  /**
   * Syncs the indeterminate value with the checkbox DOM node.
   *
   * We sync `indeterminate` directly on the DOM node, because in Ivy the check for whether a
   * property is supported on an element boils down to `if (propName in element)`. Domino's
   * HTMLInputElement doesn't have an `indeterminate` property so Ivy will warn during
   * server-side rendering.
   */
  private _syncIndeterminate(value: boolean): void {
    const nativeCheckbox: ElementRef<HTMLInputElement> = this._inputElement;

    if (nativeCheckbox) {
      nativeCheckbox.nativeElement.indeterminate = value;
    }
  }

  /** Gets whether the button has one of the given attributes. */
  private _hasHostAttributes(...attributes: string[]): boolean {
    return attributes.some((attribute) =>
      this._getHostElement().hasAttribute(attribute)
    );
  }

  private _getHostElement(): any {
    return this.elementRef.nativeElement;
  }
}
