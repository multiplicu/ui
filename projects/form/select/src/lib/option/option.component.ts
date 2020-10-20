import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  InjectionToken,
  Input,
  OnDestroy,
  Optional,
  Output,
  QueryList,
  ViewEncapsulation,
} from '@angular/core';
import {
  BooleanInput,
  coerceBooleanProperty,
  ENTER,
  hasModifierKey,
  SPACE,
} from '@multiplicu/ui/core';
import { Subject } from 'rxjs';
import {
  XcuOptgroupComponent,
  XCU_OPTGROUP,
  _XcuOptgroupBase,
} from './../optgroup/optgroup.component';

/**
 * Option IDs need to be unique across components, so this counter exists outside of
 * the component definition.
 */
let _uniqueIdCounter: number = 0;

/** Event object emitted by XcuOption when selected or deselected. */
export class XcuOptionSelectionChange {
  constructor(
    /** Reference to the option that emitted the event. */
    public source: XcuOptionComponent,
    /** Whether the change in the option's value was a result of a user action. */
    public isUserInput: boolean = false
  ) {}
}

/**
 * Describes a parent component that manages a list of options.
 * Contains properties that the options can inherit.
 * @docs-private
 */
export interface XcuOptionParentComponent {
  disableRipple?: boolean;
  multiple?: boolean;
}

/**
 * Injection token used to provide the parent component to options.
 */
export const XCU_OPTION_PARENT_COMPONENT = new InjectionToken<
  XcuOptionParentComponent
>('XCU_OPTION_PARENT_COMPONENT');

@Directive()
export class _XcuOptionBase implements AfterViewChecked, OnDestroy {
  private _selected = false;
  private _active = false;
  private _disabled = false;
  private _mostRecentViewValue = '';

  /** Whether the wrapping component is in multiple selection mode. */
  public get multiple() {
    return this._parent && this._parent.multiple;
  }

  /** Whether or not the option is currently selected. */
  public get selected(): boolean {
    return this._selected;
  }

  /** The form value of the option. */
  @Input()
  public value: any;

  /** The unique ID of the option. */
  @Input()
  public id: string = `xcu-option-${_uniqueIdCounter++}`;

  /** Whether the option is disabled. */
  @Input()
  public get disabled(): any {
    return (this.group && this.group.disabled) || this._disabled;
  }
  public set disabled(value: any) {
    this._disabled = coerceBooleanProperty(value);
  }

  /** Whether ripples for the option are disabled. */
  public get disableRipple(): boolean {
    return this._parent && this._parent.disableRipple;
  }

  /** Event emitted when the option is selected or deselected. */
  // tslint:disable-next-line:no-output-on-prefix
  @Output() readonly onSelectionChange = new EventEmitter<
    XcuOptionSelectionChange
  >();

  /** Emits when the state of the option changes and any parents have to be notified. */
  readonly _stateChanges = new Subject<void>();

  constructor(
    private _element: ElementRef<HTMLElement>,
    private _changeDetectorRef: ChangeDetectorRef,
    private _parent: XcuOptionParentComponent,
    readonly group: _XcuOptgroupBase
  ) {}

  /**
   * Whether or not the option is currently active and ready to be selected.
   * An active option displays styles as if it is focused, but the
   * focus is actually retained somewhere else. This comes in handy
   * for components like autocomplete where focus must remain on the input.
   */
  public get active(): boolean {
    return this._active;
  }

  /**
   * The displayed value of the option. It is necessary to show the selected option in the
   * select's trigger.
   */
  public get viewValue(): string {
    // TODO(kara): Add input property alternative for node envs.
    return (this._getHostElement().textContent || '').trim();
  }

  /** Selects the option. */
  public select(): void {
    if (!this._selected) {
      this._selected = true;
      this._changeDetectorRef.markForCheck();
      this._emitSelectionChangeEvent();
    }
  }

  /** Deselects the option. */
  public deselect(): void {
    if (this._selected) {
      this._selected = false;
      this._changeDetectorRef.markForCheck();
      this._emitSelectionChangeEvent();
    }
  }

  // /** Sets focus onto this option. */
  // public focus(_origin?: FocusOrigin, options?: FocusOptions): void {
  //   // Note that we aren't using `_origin`, but we need to keep it because some internal consumers
  //   // use `XcuOptionComponent` in a `FocusKeyManager` and we need it to match `FocusableOption`.
  //   const element = this._getHostElement();

  //   if (typeof element.focus === 'function') {
  //     element.focus(options);
  //   }
  // }

  /**
   * This method sets display styles on the option to make it appear
   * active. This is used by the ActiveDescendantKeyManager so key
   * events will display the proper options as active on arrow key events.
   */
  public setActiveStyles(): void {
    if (!this._active) {
      this._active = true;
      this._changeDetectorRef.markForCheck();
    }
  }

  /**
   * This method removes display styles on the option that made it appear
   * active. This is used by the ActiveDescendantKeyManager so key
   * events will display the proper options as active on arrow key events.
   */
  public setInactiveStyles(): void {
    if (this._active) {
      this._active = false;
      this._changeDetectorRef.markForCheck();
    }
  }

  /** Gets the label to be used when determining whether the option should be focused. */
  public getLabel(): string {
    return this.viewValue;
  }

  /** Ensures the option is selected when activated from the keyboard. */
  public _handleKeydown(event: KeyboardEvent): void {
    if (
      (event.keyCode === ENTER || event.keyCode === SPACE) &&
      !hasModifierKey(event)
    ) {
      this._selectViaInteraction();

      // Prevent the page from scrolling down and form submits.
      event.preventDefault();
    }
  }

  /**
   * `Selects the option while indicating the selection came from the user. Used to
   * determine if the select's view -> model callback should be invoked.`
   */
  public _selectViaInteraction(): void {
    if (!this.disabled) {
      this._selected = this.multiple ? !this._selected : true;
      this._changeDetectorRef.markForCheck();
      this._emitSelectionChangeEvent(true);
    }
  }

  /**
   * Gets the `aria-selected` value for the option. We explicitly omit the `aria-selected`
   * attribute from single-selection, unselected options. Including the `aria-selected="false"`
   * attributes adds a significant amount of noise to screen-reader users without providing useful
   * information.
   */
  public _getAriaSelected(): boolean | null {
    return this.selected || (this.multiple ? false : null);
  }

  /** Returns the correct tabindex for the option depending on disabled state. */
  public _getTabIndex(): string {
    return this.disabled ? '-1' : '0';
  }

  /** Gets the host DOM element. */
  public _getHostElement(): HTMLElement {
    return this._element.nativeElement;
  }

  public ngAfterViewChecked(): void {
    // Since parent components could be using the option's label to display the selected values
    // (e.g. `mat-select`) and they don't have a way of knowing if the option's label has changed
    // we have to check for changes in the DOM ourselves and dispatch an event. These checks are
    // relatively cheap, however we still limit them only to selected options in order to avoid
    // hitting the DOM too often.
    if (this._selected) {
      const viewValue = this.viewValue;

      if (viewValue !== this._mostRecentViewValue) {
        this._mostRecentViewValue = viewValue;
        this._stateChanges.next();
      }
    }
  }

  public ngOnDestroy(): void {
    this._stateChanges.complete();
  }

  /** Emits the selection change event. */
  private _emitSelectionChangeEvent(isUserInput = false): void {
    this.onSelectionChange.emit(
      new XcuOptionSelectionChange(this, isUserInput)
    );
  }

  static ngAcceptInputType_disabled: BooleanInput;
}

@Component({
  selector: 'xcu-option, [xcu-option]',
  exportAs: 'xcuOption',
  host: {
    role: 'option',
  },
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class XcuOptionComponent extends _XcuOptionBase {
  public constructor(
    element: ElementRef<HTMLElement>,
    changeDetectorRef: ChangeDetectorRef,
    @Optional()
    @Inject(XCU_OPTION_PARENT_COMPONENT)
    parent: XcuOptionParentComponent,
    @Optional() @Inject(XCU_OPTGROUP) group: XcuOptgroupComponent
  ) {
    super(element, changeDetectorRef, parent, group);
  }
}

/**
 * Counts the amount of option group labels that precede the specified option.
 * @param optionIndex Index of the option at which to start counting.
 * @param options Flat list of all of the options.
 * @param optionGroups Flat list of all of the option groups.
 * @docs-private
 */
export function _countGroupLabelsBeforeOption(
  optionIndex: number,
  options: QueryList<XcuOptionComponent>,
  optionGroups: QueryList<XcuOptgroupComponent>
): number {
  if (optionGroups.length) {
    let optionsArray = options.toArray();
    let groups = optionGroups.toArray();
    let groupCounter = 0;

    for (let i = 0; i < optionIndex + 1; i++) {
      if (
        optionsArray[i].group &&
        optionsArray[i].group === groups[groupCounter]
      ) {
        groupCounter++;
      }
    }

    return groupCounter;
  }

  return 0;
}

/**
 * Determines the position to which to scroll a panel in order for an option to be into view.
 * @param optionOffset Offset of the option from the top of the panel.
 * @param optionHeight Height of the options.
 * @param currentScrollPosition Current scroll position of the panel.
 * @param panelHeight Height of the panel.
 * @docs-private
 */
export function _getOptionScrollPosition(
  optionOffset: number,
  optionHeight: number,
  currentScrollPosition: number,
  panelHeight: number
): number {
  if (optionOffset < currentScrollPosition) {
    return optionOffset;
  }

  if (optionOffset + optionHeight > currentScrollPosition + panelHeight) {
    return Math.max(0, optionOffset - panelHeight + optionHeight);
  }

  return currentScrollPosition;
}
