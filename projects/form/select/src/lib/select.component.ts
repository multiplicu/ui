import {
  AfterContentInit,
  Attribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  DoCheck,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  QueryList,
  Self,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormGroupDirective,
  NgControl,
  NgForm,
} from '@angular/forms';
import {
  A,
  ActiveDescendantKeyManager,
  BooleanInput,
  CanDisable,
  CanDisableCtor,
  CanUpdateErrorState,
  CanUpdateErrorStateCtor,
  coerceBooleanProperty,
  coerceNumberProperty,
  DOWN_ARROW,
  ENTER,
  ErrorStateMatcher,
  hasModifierKey,
  HasTabIndex,
  HasTabIndexCtor,
  LEFT_ARROW,
  mixinDisabled,
  mixinErrorState,
  mixinTabIndex,
  NumberInput,
  RIGHT_ARROW,
  SelectionModel,
  SPACE,
  UP_ARROW,
} from '@multiplicu/ui/core';
import {
  XcuFormFieldComponent,
  XcuFormFieldControl,
  XCU_FORM_FIELD,
} from '@multiplicu/ui/form/form-field';
import { defer, merge, Observable, Subject } from 'rxjs';
import {
  filter,
  map,
  startWith,
  switchMap,
  take,
  takeUntil,
} from 'rxjs/operators';
import { getXcuSelectNonArrayValueError } from './errors/select-errors';
import { XcuOptgroupComponent } from './optgroup/optgroup.component';
import {
  XcuOptionComponent,
  XcuOptionSelectionChange,
  _countGroupLabelsBeforeOption,
  _getOptionScrollPosition,
} from './option/option.component';

let nextUniqueId: number = 0;

/**
 * The following style constants are necessary to save here in order
 * to properly calculate the alignment of the selected option over
 * the trigger element.
 */

/** The max height of the select's overlay panel */
export const SELECT_PANEL_MAX_HEIGHT = 256;

/** The panel's padding on the x-axis */
export const SELECT_PANEL_PADDING_X = 16;

/** The panel's x axis padding if it is indented (e.g. there is an option group). */
export const SELECT_PANEL_INDENT_PADDING_X = SELECT_PANEL_PADDING_X * 2;

/** The height of the select items in `em` units. */
export const SELECT_ITEM_HEIGHT_EM = 3;

/** Change event object that is emitted when the select value has changed. */
export class XcuSelectChange {
  constructor(
    /** Reference to the select that emitted the change event. */
    public source: XcuSelectComponent,
    /** Current value of the select that emitted the event. */
    public value: any
  ) {}
}

// Boilerplate for applying mixins to MatSelect.
/** @docs-private */
class XcuSelectBase {
  constructor(
    public _elementRef: ElementRef,
    public _defaultErrorStateMatcher: ErrorStateMatcher,
    public _parentForm: NgForm,
    public _parentFormGroup: FormGroupDirective,
    public ngControl: NgControl
  ) {}
}
const _XcuSelectMixinBase: CanDisableCtor &
  HasTabIndexCtor &
  CanUpdateErrorStateCtor &
  typeof XcuSelectBase = mixinTabIndex(
  mixinDisabled(mixinErrorState(XcuSelectBase))
);

@Component({
  selector: 'xcu-select, select[xcu-select]',
  exportAs: 'xcuSelect',
  host: {
    role: 'listbox',
  },
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class XcuSelectComponent extends _XcuSelectMixinBase
  implements
    AfterContentInit,
    OnInit,
    OnChanges,
    OnDestroy,
    DoCheck,
    ControlValueAccessor,
    CanDisable,
    HasTabIndex,
    XcuFormFieldControl<any>,
    CanUpdateErrorState {
  /** Whether or not the overlay panel is open. */
  private _panelOpen: boolean = false;

  /** Whether filling out the select is required in the form. */
  private _required: boolean = false;

  /** The scroll position of the overlay panel, calculated to center the selected option. */
  private _scrollTop: number = 0;

  /** The placeholder displayed in the trigger of the select. */
  private _placeholder: string;

  /** Whether the component is in multiple selection mode. */
  private _multiple: boolean = false;

  /** Comparison function to specify which option is displayed. Defaults to object equality. */
  private _compareWith = (o1: any, o2: any) => o1 === o2;

  /** Unique id for this input. */
  private _uid = `xcu-select-${nextUniqueId++}`;

  /** Emits whenever the component is destroyed. */
  private readonly _destroy = new Subject<void>();

  /** The aria-describedby attribute on the select for improved a11y. */
  private _ariaDescribedby: string;

  /** The cached font-size of the trigger element. */
  public _triggerFontSize: number = 0;

  /** Deals with the selection logic. */
  private _selectionModel: SelectionModel<XcuOptionComponent>;

  /** Manages keyboard events for options in the panel. */
  private _keyManager: ActiveDescendantKeyManager<XcuOptionComponent>;

  /** `View -> model callback called when value changes` */
  private _onChange: (value: any) => void = () => {};

  /** `View -> model callback called when select has been touched` */
  private _onTouched = () => {};

  public _valueId: string = `xcu-select-value-${nextUniqueId++}`;

  /** Whether the select is focused. */
  public get focused(): boolean {
    return this._focused || this._panelOpen;
  }
  private _focused = false;

  /** A name for this control that can be used by `xcu-form-field`. */
  public controlType: string = 'xcu-select';

  /** Panel containing the select options. */
  @ViewChild('panel')
  public panel: ElementRef;

  /** All of the defined groups of options. */
  @ContentChildren(XcuOptgroupComponent, { descendants: true })
  optionGroups: QueryList<XcuOptgroupComponent>;

  /** All of the defined select options. */
  @ContentChildren(XcuOptionComponent, { descendants: true })
  public options: QueryList<XcuOptionComponent>;

  /** Whether the component is required. */
  @Input()
  public get required(): boolean {
    return this._required;
  }
  public set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }

  /** Placeholder to be shown if no value has been selected. */
  @Input()
  public get placeholder(): string {
    return this._placeholder;
  }
  public set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }

  /** Whether the user should be allowed to select multiple options. */
  @Input()
  public get multiple(): boolean {
    return this._multiple;
  }
  public set multiple(value: boolean) {
    // if (
    //   this._selectionModel &&
    //   (typeof ngDevMode === 'undefined' || ngDevMode)
    // ) {
    //   throw getMatSelectDynamicMultipleError();
    // }

    this._multiple = coerceBooleanProperty(value);
  }

  /**
   * Function to compare the option values with the selected values. The first argument
   * is a value from an option. The second is a value from the selection. A boolean
   * should be returned.
   */
  @Input()
  public get compareWith() {
    return this._compareWith;
  }
  public set compareWith(fn: (o1: any, o2: any) => boolean) {
    // if (
    //   typeof fn !== 'function' &&
    //   (typeof ngDevMode === 'undefined' || ngDevMode)
    // ) {
    //   throw getMatSelectNonFunctionValueError();
    // }
    this._compareWith = fn;
    // if (this._selectionModel) {
    //   // A different comparator means the selection could change.
    //   this._initializeSelection();
    // }
  }

  /** Value of the select control. */
  @Input()
  public get value(): any {
    return this._value;
  }
  public set value(newValue: any) {
    if (newValue !== this._value) {
      if (this.options) {
        this._setSelectionByValue(newValue);
      }

      this._value = newValue;
    }
  }
  private _value: any;

  /** Aria label of the select. If not specified, the placeholder will be used as label. */
  @Input('aria-label')
  public ariaLabel: string = '';

  /** Input that can be used to specify the `aria-labelledby` attribute. */
  @Input('aria-labelledby')
  public ariaLabelledby: string;

  /** Object used to control when error messages are shown. */
  @Input()
  public errorStateMatcher: ErrorStateMatcher;

  /** Time to wait in milliseconds after the last keystroke before moving focus to an item. */
  @Input()
  public get typeaheadDebounceInterval(): number {
    return this._typeaheadDebounceInterval;
  }
  public set typeaheadDebounceInterval(value: number) {
    this._typeaheadDebounceInterval = coerceNumberProperty(value);
  }
  private _typeaheadDebounceInterval: number;

  /**
   * Function used to sort the values in a select in multiple mode.
   * Follows the same logic as `Array.prototype.sort`.
   */
  @Input()
  public sortComparator: (
    a: XcuOptionComponent,
    b: XcuOptionComponent,
    options: XcuOptionComponent[]
  ) => number;

  /** Unique id of the element. */
  @Input()
  public get id(): string {
    return this._id;
  }
  public set id(value: string) {
    this._id = value || this._uid;
    this.stateChanges.next();
  }
  private _id: string;

  /** Combined stream of all of the child options' change events. */
  readonly optionSelectionChanges: Observable<XcuOptionSelectionChange> = defer(
    () => {
      const options = this.options;

      if (options) {
        return options.changes.pipe(
          startWith(options),
          switchMap(() =>
            merge(...options.map((option) => option.onSelectionChange))
          )
        );
      }

      return this._ngZone.onStable.pipe(
        take(1),
        switchMap(() => this.optionSelectionChanges)
      );
    }
  ) as Observable<XcuOptionSelectionChange>;

  /** Whether or not the overlay panel is open. */
  public get panelOpen(): boolean {
    return this._panelOpen;
  }

  /** Event emitted when the selected value has been changed by the user. */
  @Output() readonly selectionChange: EventEmitter<
    XcuSelectChange
  > = new EventEmitter<XcuSelectChange>();

  /** Event emitted when the select panel has been toggled. */
  @Output() readonly openedChange: EventEmitter<boolean> = new EventEmitter<
    boolean
  >();

  /** Event emitted when the select has been opened. */
  @Output('opened') readonly _openedStream: Observable<
    void
  > = this.openedChange.pipe(
    filter((o) => o),
    map(() => {})
  );

  /** Event emitted when the select has been closed. */
  @Output('closed') readonly _closedStream: Observable<
    void
  > = this.openedChange.pipe(
    filter((o) => !o),
    map(() => {})
  );

  /**
   * Event that emits whenever the raw value of the select changes. This is here primarily
   * to facilitate the two-way binding for the `value` input.
   * @docs-private
   */
  @Output() readonly valueChange: EventEmitter<any> = new EventEmitter<any>();

  public constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _ngZone: NgZone,
    public _defaultErrorStateMatcher: ErrorStateMatcher,
    public elementRef: ElementRef,
    @Optional() _parentForm: NgForm,
    @Optional() _parentFormGroup: FormGroupDirective,
    @Optional()
    @Inject(XCU_FORM_FIELD)
    private _parentFormField: XcuFormFieldComponent,
    @Self() @Optional() public ngControl: NgControl,
    @Attribute('tabindex') tabIndex: string
  ) {
    super(
      elementRef,
      _defaultErrorStateMatcher,
      _parentForm,
      _parentFormGroup,
      ngControl
    );

    if (this.ngControl) {
      // Note: we provide the value accessor through here, instead of
      // the `providers` to avoid running into a circular import.
      // this.ngControl.valueAccessor = this;
    }

    this.tabIndex = parseInt(tabIndex) || 0;

    // Force setter to be called in case id was not specified.
    this.id = this.id;
  }

  public ngOnInit(): void {
    this._selectionModel = new SelectionModel<XcuOptionComponent>(
      this.multiple
    );
    this.stateChanges.next();
  }

  public ngAfterContentInit(): void {
    this._initKeyManager();

    this._selectionModel.changed
      .pipe(takeUntil(this._destroy))
      .subscribe((event) => {
        event.added.forEach((option) => option.select());
        event.removed.forEach((option) => option.deselect());
      });

    this.options.changes
      .pipe(startWith(null), takeUntil(this._destroy))
      .subscribe(() => {
        this._resetOptions();
        this._initializeSelection();
      });
  }

  public ngDoCheck(): void {
    if (this.ngControl) {
      this.updateErrorState();
    }
  }

  public ngOnChanges(changes: SimpleChanges) {
    // Updating the disabled state is handled by `mixinDisabled`, but we need to additionally let
    // the parent form field know to run change detection when the disabled state changes.
    if (changes['disabled']) {
      this.stateChanges.next();
    }

    if (changes['typeaheadDebounceInterval'] && this._keyManager) {
      this._keyManager.withTypeAhead(this._typeaheadDebounceInterval);
    }
  }

  public ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
    this.stateChanges.complete();
  }

  /** Toggles the overlay panel open or closed. */
  public toggle(): void {
    this.panelOpen ? this.close() : this.open();
  }

  /** Opens the overlay panel. */
  public open(): void {
    if (
      this.disabled ||
      !this.options ||
      !this.options.length ||
      this._panelOpen
    ) {
      return;
    }

    // this._triggerRect = this.trigger.nativeElement.getBoundingClientRect();
    // Note: The computed font-size will be a string pixel value (e.g. "16px").
    // `parseInt` ignores the trailing 'px' and converts this to a number.
    // this._triggerFontSize = parseInt(getComputedStyle(this.trigger.nativeElement).fontSize || '0');

    this._panelOpen = true;
    this._keyManager.withHorizontalOrientation(null);
    // this._calculateOverlayPosition();
    // this._highlightCorrectOption();
    this._changeDetectorRef.markForCheck();

    // Set the font size on the panel element once it exists.
    // this._ngZone.onStable.pipe(take(1)).subscribe(() => {
    //   if (this._triggerFontSize && this.overlayDir.overlayRef &&
    //       this.overlayDir.overlayRef.overlayElement) {
    //     this.overlayDir.overlayRef.overlayElement.style.fontSize = `${this._triggerFontSize}px`;
    //   }
    // });
  }

  /** Closes the overlay panel and focuses the host element. */
  public close(): void {
    if (this._panelOpen) {
      this._panelOpen = false;
      this._keyManager.withHorizontalOrientation('rtl'); //this._isRtl() ? 'rtl' : 'ltr');
      this._changeDetectorRef.markForCheck();
      this._onTouched();
    }
  }

  /**
   * Sets the select's value. Part of the ControlValueAccessor interface
   * required to integrate with Angular's core forms API.
   *
   * @param value New value to be written to the model.
   */
  public writeValue(value: any): void {
    this.value = value;
  }

  /**
   * Saves a callback function to be invoked when the select's value
   * changes from user input. Part of the ControlValueAccessor interface
   * required to integrate with Angular's core forms API.
   *
   * @param fn Callback to be triggered when the value changes.
   */
  public registerOnChange(fn: (value: any) => void): void {
    this._onChange = fn;
  }

  /**
   * Saves a callback function to be invoked when the select is blurred
   * by the user. Part of the ControlValueAccessor interface required
   * to integrate with Angular's core forms API.
   *
   * @param fn Callback to be triggered when the component has been touched.
   */
  public registerOnTouched(fn: () => {}): void {
    this._onTouched = fn;
  }

  /**
   * Disables the select. Part of the ControlValueAccessor interface required
   * to integrate with Angular's core forms API.
   *
   * @param isDisabled Sets whether the component is disabled.
   */
  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this._changeDetectorRef.markForCheck();
    this.stateChanges.next();
  }

  /** The currently selected option. */
  get selected(): XcuOptionComponent | XcuOptionComponent[] {
    return this.multiple
      ? this._selectionModel.selected
      : this._selectionModel.selected[0];
  }

  /** Handles all keydown events on the select. */
  public _handleKeydown(event: KeyboardEvent): void {
    if (!this.disabled) {
      this.panelOpen
        ? this._handleOpenKeydown(event)
        : this._handleClosedKeydown(event);
    }
  }

  /** Handles keyboard events while the select is closed. */
  private _handleClosedKeydown(event: KeyboardEvent): void {
    const keyCode: number = event.keyCode;
    const isArrowKey: boolean =
      keyCode === DOWN_ARROW ||
      keyCode === UP_ARROW ||
      keyCode === LEFT_ARROW ||
      keyCode === RIGHT_ARROW;
    const isOpenKey: boolean = keyCode === ENTER || keyCode === SPACE;
    const manager = this._keyManager;

    // Open the select on ALT + arrow key to match the native <select>
    if (
      (!manager.isTyping() && isOpenKey && !hasModifierKey(event)) ||
      ((this.multiple || event.altKey) && isArrowKey)
    ) {
      event.preventDefault(); // prevents the page from scrolling down when pressing space
      this.open();
    } else if (!this.multiple) {
      const previouslySelectedOption = this.selected;
      manager.onKeydown(event);
      const selectedOption = this.selected;

      // Since the value has changed, we need to announce it ourselves.
      if (selectedOption && previouslySelectedOption !== selectedOption) {
        // We set a duration on the live announcement, because we want the live element to be
        // cleared after a while so that users can't navigate to it using the arrow keys.
        // this._liveAnnouncer.announce(
        //   (selectedOption as HTMLElement).nodeValue,
        //   10000
        // );
      }
    }
  }

  /** Handles keyboard events when the selected is open. */
  private _handleOpenKeydown(event: KeyboardEvent): void {
    const manager = this._keyManager;
    const keyCode = event.keyCode;
    const isArrowKey = keyCode === DOWN_ARROW || keyCode === UP_ARROW;
    const isTyping = manager.isTyping();

    if (isArrowKey && event.altKey) {
      // Close the select on ALT + arrow key to match the native <select>
      event.preventDefault();
      this.close();
      // Don't do anything in this case if the user is typing,
      // because the typing sequence can include the space key.
    } else if (
      !isTyping &&
      (keyCode === ENTER || keyCode === SPACE) &&
      manager.activeItem &&
      !hasModifierKey(event)
    ) {
      event.preventDefault();
      manager.activeItem._selectViaInteraction();
    } else if (!isTyping && this._multiple && keyCode === A && event.ctrlKey) {
      event.preventDefault();
      const hasDeselectedOptions = this.options.some(
        (opt) => !opt.disabled && !opt.selected
      );

      this.options.forEach((option) => {
        if (!option.disabled) {
          hasDeselectedOptions ? option.select() : option.deselect();
        }
      });
    } else {
      const previouslyFocusedIndex = manager.activeItemIndex;

      manager.onKeydown(event);

      if (
        this._multiple &&
        isArrowKey &&
        event.shiftKey &&
        manager.activeItem &&
        manager.activeItemIndex !== previouslyFocusedIndex
      ) {
        manager.activeItem._selectViaInteraction();
      }
    }
  }

  private _onFocus(): void {
    if (!this.disabled) {
      this._focused = true;
      this.stateChanges.next();
    }
  }

  /**
   * Calls the touched callback only if the panel is closed. Otherwise, the trigger will
   * "blur" to the panel when it opens, causing a false positive.
   */
  private _onBlur(): void {
    this._focused = false;

    if (!this.disabled && !this.panelOpen) {
      this._onTouched();
      this._changeDetectorRef.markForCheck();
      this.stateChanges.next();
    }
  }

  /**
   * Callback that is invoked when the overlay panel has been attached.
   */
  public _onAttached(): void {
    // this.overlayDir.positionChange.pipe(take(1)).subscribe(() => {
    //   this._changeDetectorRef.detectChanges();
    //   this._calculateOverlayOffsetX();
    //   this.panel.nativeElement.scrollTop = this._scrollTop;
    // });
  }

  /** Whether the select has a value. */
  public get empty(): boolean {
    return !this._selectionModel || this._selectionModel.isEmpty();
  }

  private _initializeSelection(): void {
    // Defer setting the value in order to avoid the "Expression
    // has changed after it was checked" errors from Angular.
    Promise.resolve().then(() => {
      this._setSelectionByValue(
        this.ngControl ? this.ngControl.value : this._value
      );
      this.stateChanges.next();
    });
  }

  /**
   * Sets the selected option based on a value. If no option can be
   * found with the designated value, the select trigger is cleared.
   */
  private _setSelectionByValue(value: any | any[]): void {
    if (this.multiple && value) {
      if (
        !Array.isArray(value) //&&
        // (typeof ngDevMode === 'undefined' || ngDevMode)
      ) {
        throw getXcuSelectNonArrayValueError();
      }

      this._selectionModel.clear();
      value.forEach((currentValue: any) => this._selectValue(currentValue));
      this._sortValues();
    } else {
      this._selectionModel.clear();
      const correspondingOption = this._selectValue(value);

      // Shift focus to the active item. Note that we shouldn't do this in multiple
      // mode, because we don't know what option the user interacted with last.
      if (correspondingOption) {
        this._keyManager.updateActiveItem(correspondingOption);
      } else if (!this.panelOpen) {
        // Otherwise reset the highlighted option. Note that we only want to do this while
        // closed, because doing it while open can shift the user's focus unnecessarily.
        this._keyManager.updateActiveItem(-1);
      }
    }

    this._changeDetectorRef.markForCheck();
  }

  /**
   * Finds and selects and option based on its value.
   * @returns Option that has the corresponding value.
   */
  private _selectValue(value: any): XcuOptionComponent | undefined {
    const correspondingOption = this.options.find(
      (option: XcuOptionComponent) => {
        try {
          // Treat null as a special reset value.
          return option.value != null && this._compareWith(option.value, value);
        } catch (error) {
          // if (typeof ngDevMode === 'undefined' || ngDevMode) {
          //   // Notify developers of errors in their comparator.
          //   console.warn(error);
          // }
          return false;
        }
      }
    );

    if (correspondingOption) {
      this._selectionModel.select(correspondingOption);
    }

    return correspondingOption;
  }

  /** Sets up a key manager to listen to keyboard events on the overlay panel. */
  private _initKeyManager() {
    this._keyManager = new ActiveDescendantKeyManager<XcuOptionComponent>(
      this.options
    )
      .withTypeAhead(this._typeaheadDebounceInterval)
      .withVerticalOrientation()
      .withHorizontalOrientation('rtl') //this._isRtl() ? 'rtl' : 'ltr')
      .withHomeAndEnd()
      .withAllowedModifierKeys(['shiftKey']);

    this._keyManager.tabOut.pipe(takeUntil(this._destroy)).subscribe(() => {
      if (this.panelOpen) {
        // Select the active item when tabbing away. This is consistent with how the native
        // select behaves. Note that we only want to do this in single selection mode.
        if (!this.multiple && this._keyManager.activeItem) {
          this._keyManager.activeItem._selectViaInteraction();
        }

        // Restore focus to the trigger before closing. Ensures that the focus
        // position won't be lost if the user got focus into the overlay.
        this.focus();
        this.close();
      }
    });

    this._keyManager.change.pipe(takeUntil(this._destroy)).subscribe(() => {
      if (this._panelOpen && this.panel) {
        this._scrollActiveOptionIntoView();
      } else if (
        !this._panelOpen &&
        !this.multiple &&
        this._keyManager.activeItem
      ) {
        this._keyManager.activeItem._selectViaInteraction();
      }
    });
  }

  /** Drops current option subscriptions and IDs and resets from scratch. */
  private _resetOptions(): void {
    const changedOrDestroyed = merge(this.options.changes, this._destroy);

    this.optionSelectionChanges
      .pipe(takeUntil(changedOrDestroyed))
      .subscribe((event) => {
        this._onSelect(event.source, event.isUserInput);

        if (event.isUserInput && !this.multiple && this._panelOpen) {
          this.close();
          this.focus();
        }
      });

    // Listen to changes in the internal state of the options and react accordingly.
    // Handles cases like the labels of the selected options changing.
    merge(...this.options.map((option) => option._stateChanges))
      .pipe(takeUntil(changedOrDestroyed))
      .subscribe(() => {
        this._changeDetectorRef.markForCheck();
        this.stateChanges.next();
      });
  }

  /** Invoked when an option is clicked. */
  private _onSelect(option: XcuOptionComponent, isUserInput: boolean): void {
    const wasSelected = this._selectionModel.isSelected(option);

    if (option.value == null && !this._multiple) {
      option.deselect();
      this._selectionModel.clear();

      if (this.value != null) {
        this._propagateChanges(option.value);
      }
    } else {
      if (wasSelected !== option.selected) {
        option.selected
          ? this._selectionModel.select(option)
          : this._selectionModel.deselect(option);
      }

      if (isUserInput) {
        this._keyManager.setActiveItem(option);
      }

      if (this.multiple) {
        this._sortValues();

        if (isUserInput) {
          // In case the user selected the option with their mouse, we
          // want to restore focus back to the trigger, in order to
          // prevent the select keyboard controls from clashing with
          // the ones from `mat-option`.
          this.focus();
        }
      }
    }

    if (wasSelected !== this._selectionModel.isSelected(option)) {
      this._propagateChanges();
    }

    this.stateChanges.next();
  }

  /** Sorts the selected values in the selected based on their order in the panel. */
  private _sortValues(): void {
    if (this.multiple) {
      const options = this.options.toArray();

      this._selectionModel.sort((a, b) => {
        return this.sortComparator
          ? this.sortComparator(a, b, options)
          : options.indexOf(a) - options.indexOf(b);
      });
      this.stateChanges.next();
    }
  }

  /** Emits change event to set the model value. */
  private _propagateChanges(fallbackValue?: any): void {
    let valueToEmit: any = null;

    if (this.multiple) {
      valueToEmit = (this.selected as XcuOptionComponent[]).map(
        (option) => option.value
      );
    } else {
      valueToEmit = this.selected
        ? (this.selected as XcuOptionComponent).value
        : fallbackValue;
    }

    this._value = valueToEmit;
    this.valueChange.emit(valueToEmit);
    this._onChange(valueToEmit);
    this.selectionChange.emit(new XcuSelectChange(this, valueToEmit));
    this._changeDetectorRef.markForCheck();
  }

  /**
   * Highlights the selected item. If no option is selected, it will highlight
   * the first item instead.
   */
  private _highlightCorrectOption(): void {
    if (this._keyManager) {
      if (this.empty) {
        this._keyManager.setFirstItemActive();
      } else {
        this._keyManager.setActiveItem(this._selectionModel.selected[0]);
      }
    }
  }

  /** Scrolls the active option into view. */
  private _scrollActiveOptionIntoView(): void {
    const activeOptionIndex = this._keyManager.activeItemIndex || 0;
    const labelCount = _countGroupLabelsBeforeOption(
      activeOptionIndex,
      this.options,
      this.optionGroups
    );
    const itemHeight = this._getItemHeight();

    this.panel.nativeElement.scrollTop = _getOptionScrollPosition(
      (activeOptionIndex + labelCount) * itemHeight,
      itemHeight,
      this.panel.nativeElement.scrollTop,
      SELECT_PANEL_MAX_HEIGHT
    );
  }

  /** Focuses the select element. */
  public focus(options?: FocusOptions): void {
    this._elementRef.nativeElement.focus(options);
  }

  /** Gets the index of the provided option in the option list. */
  private _getOptionIndex(option: XcuOptionComponent): number | undefined {
    return this.options.reduce(
      (
        result: number | undefined,
        current: XcuOptionComponent,
        index: number
      ) => {
        if (result !== undefined) {
          return result;
        }

        return option === current ? index : undefined;
      },
      undefined
    );
  }

  /** Gets the aria-labelledby for the select panel. */
  public _getPanelAriaLabelledby(): string | null {
    if (this.ariaLabel) {
      return null;
    }

    const labelId = this._getLabelId();
    return this.ariaLabelledby ? labelId + ' ' + this.ariaLabelledby : labelId;
  }

  /** Determines the `aria-activedescendant` to be set on the host. */
  private _getAriaActiveDescendant(): string | null {
    if (this.panelOpen && this._keyManager && this._keyManager.activeItem) {
      return this._keyManager.activeItem.id;
    }

    return null;
  }

  /** Gets the ID of the element that is labelling the select. */
  private _getLabelId(): string {
    return '';
  }

  /** Calculates the height of the select's options. */
  private _getItemHeight(): number {
    return this._triggerFontSize * SELECT_ITEM_HEIGHT_EM;
  }

  /** Calculates the amount of items in the select. This includes options and group labels. */
  private _getItemCount(): number {
    return this.options.length + this.optionGroups.length;
  }

  /** Gets the aria-labelledby of the select component trigger. */
  private _getTriggerAriaLabelledby(): string | null {
    if (this.ariaLabel) {
      return null;
    }

    let value = this._getLabelId() + ' ' + this._valueId;

    if (this.ariaLabelledby) {
      value += ' ' + this.ariaLabelledby;
    }

    return value;
  }

  /**
   * Implemented as part of MatFormFieldControl.
   * @docs-private
   */
  public setDescribedByIds(ids: string[]): void {
    this._ariaDescribedby = ids.join(' ');
  }

  /**
   * Implemented as part of MatFormFieldControl.
   * @docs-private
   */
  public onContainerClick(): void {
    this.focus();
    this.open();
  }

  static ngAcceptInputType_required: BooleanInput;
  static ngAcceptInputType_multiple: BooleanInput;
  static ngAcceptInputType_disableOptionCentering: BooleanInput;
  static ngAcceptInputType_typeaheadDebounceInterval: NumberInput;
  static ngAcceptInputType_disabled: BooleanInput;
  static ngAcceptInputType_disableRipple: BooleanInput;
  static ngAcceptInputType_tabIndex: NumberInput;
}
