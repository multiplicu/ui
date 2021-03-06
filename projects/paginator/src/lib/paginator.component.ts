import { OnChanges, SimpleChanges } from '@angular/core';
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Directive,
  EventEmitter,
  Inject,
  InjectionToken,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  BooleanInput,
  CanDisable,
  CanDisableCtor,
  coerceBooleanProperty,
  coerceNumberProperty,
  HasInitialized,
  HasInitializedCtor,
  mixinDisabled,
  mixinInitialized,
  NumberInput,
} from '@multiplicu/ui/core';
import { Subscription } from 'rxjs';
import { XcuPaginatorIntl } from './paginator-intl';

export type XcuFormFieldAppearance = 'legacy' | 'standard' | 'fill' | 'outline';

/** The default page size if there is no page size and there are no provided page size options. */
const DEFAULT_PAGE_SIZE = 50;

/**
 * Change event object that is emitted when the user selects a
 * different page size or navigates to another page.
 */
export class PageEvent {
  /** The current page index. */
  pageIndex: number;

  /**
   * Index of the page that was selected previously.
   * @breaking-change 8.0.0 To be made into a required property.
   */
  previousPageIndex?: number;

  /** The current page size */
  pageSize: number;

  /** The current total number of items being paged */
  length: number;
}

/** Object that can be used to configure the default options for the paginator module. */
export interface XcuPaginatorDefaultOptions {
  /** Number of items to display on a page. By default set to 50. */
  pageSize?: number;

  /** The set of provided page size options to display to the user. */
  pageSizeOptions?: number[];

  /** Whether to hide the page size selection UI from the user. */
  hidePageSize?: boolean;

  /** Whether to show the first/last buttons UI to the user. */
  showFirstLastButtons?: boolean;

  /** The default form-field appearance to apply to the page size options selector. */
  formFieldAppearance?: XcuFormFieldAppearance;
}

/** Injection token that can be used to provide the default options for the paginator module. */
export const XCU_PAGINATOR_DEFAULT_OPTIONS =
  new InjectionToken<XcuPaginatorDefaultOptions>(
    'XCU_PAGINATOR_DEFAULT_OPTIONS'
  );

// Boilerplate for applying mixins to _XcuPaginatorBase.
/** @docs-private */
class XcuPaginatorMixinBase {}
const _XcuPaginatorMixinBase: CanDisableCtor &
  HasInitializedCtor &
  typeof XcuPaginatorMixinBase = mixinDisabled(
  mixinInitialized(XcuPaginatorMixinBase)
);

/**
 * Base class with all of the `XcuPaginator` functionality.
 * @docs-private
 */
@Directive()
export abstract class _XcuPaginatorBase<
    O extends {
      pageSize?: number;
      pageSizeOptions?: number[];
      hidePageSize?: boolean;
      showFirstLastButtons?: boolean;
    }
  >
  extends _XcuPaginatorMixinBase
  implements OnDestroy, OnChanges, OnInit, CanDisable, HasInitialized
{
  public pageSizeForm: FormGroup;
  private _pageSizeFormChanges: Subscription;

  private _initialized: boolean;
  private _intlChanges: Subscription;

  /** The zero-based page index of the displayed list of items. Defaulted to 0. */
  @Input()
  get pageIndex(): number {
    return this._pageIndex;
  }
  set pageIndex(value: number) {
    this._pageIndex = Math.max(coerceNumberProperty(value), 0);
    this._changeDetectorRef.markForCheck();
  }
  private _pageIndex = 0;

  /** The length of the total number of items that are being paginated. Defaulted to 0. */
  @Input()
  get length(): number {
    return this._length;
  }
  set length(value: number) {
    this._length = coerceNumberProperty(value);
    this._changeDetectorRef.markForCheck();
  }
  private _length = 0;

  /** Number of items to display on a page. By default set to 50. */
  @Input()
  get pageSize(): number {
    return this._pageSize;
  }
  set pageSize(value: number) {
    this._pageSize = Math.max(coerceNumberProperty(value), 0);
    this._updateDisplayedPageSizeOptions();
  }
  private _pageSize: number;

  /** The set of provided page size options to display to the user. */
  @Input()
  get pageSizeOptions(): number[] {
    return this._pageSizeOptions;
  }
  set pageSizeOptions(value: number[]) {
    this._pageSizeOptions = (value || []).map((p) => coerceNumberProperty(p));
    this._updateDisplayedPageSizeOptions();
  }
  private _pageSizeOptions: number[] = [];

  /** Whether to hide the page size selection UI from the user. */
  @Input()
  get hidePageSize(): boolean {
    return this._hidePageSize;
  }
  set hidePageSize(value: boolean) {
    this._hidePageSize = coerceBooleanProperty(value);
  }
  private _hidePageSize = false;

  /** Whether to show the first/last buttons UI to the user. */
  @Input()
  get showFirstLastButtons(): boolean {
    return this._showFirstLastButtons;
  }
  set showFirstLastButtons(value: boolean) {
    this._showFirstLastButtons = coerceBooleanProperty(value);
  }
  private _showFirstLastButtons = false;

  /** Event emitted when the paginator changes the page size or page index. */
  @Output() readonly page: EventEmitter<PageEvent> =
    new EventEmitter<PageEvent>();

  /** Displayed set of page size options. Will be sorted and include current page size. */
  _displayedPageSizeOptions: number[];

  constructor(
    public _intl: XcuPaginatorIntl,
    private _changeDetectorRef: ChangeDetectorRef,
    private _fb: FormBuilder,
    defaults?: O
  ) {
    super();

    this._intlChanges = _intl.changes.subscribe(() =>
      this._changeDetectorRef.markForCheck()
    );

    if (defaults) {
      const { pageSize, pageSizeOptions, hidePageSize, showFirstLastButtons } =
        defaults;

      if (pageSize != null) {
        this._pageSize = pageSize;
      }

      if (pageSizeOptions != null) {
        this._pageSizeOptions = pageSizeOptions;
      }

      if (hidePageSize != null) {
        this._hidePageSize = hidePageSize;
      }

      if (showFirstLastButtons != null) {
        this._showFirstLastButtons = showFirstLastButtons;
      }
    }

    this.pageSizeForm = this._fb.group({
      pageSize: [defaults?.pageSize || ''],
    });

    this._pageSizeFormChanges = this.pageSizeForm.valueChanges.subscribe(
      (val: { pageSize: number }) => this._changePageSize(+val.pageSize)
    );
  }

  ngOnInit() {
    this._initialized = true;
    this._updateDisplayedPageSizeOptions();
    this._markInitialized();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.pageSize) {
      this.pageSizeForm.patchValue(
        {
          pageSize: +changes.pageSize.currentValue,
        },
        { emitEvent: false }
      );
    }
  }

  ngOnDestroy() {
    this._intlChanges.unsubscribe();
    this._pageSizeFormChanges.unsubscribe();
  }

  /** Advances to the next page if it exists. */
  nextPage(): void {
    if (!this.hasNextPage()) {
      return;
    }

    const previousPageIndex = this.pageIndex;
    this.pageIndex++;
    this._emitPageEvent(previousPageIndex);
  }

  /** Move back to the previous page if it exists. */
  previousPage(): void {
    if (!this.hasPreviousPage()) {
      return;
    }

    const previousPageIndex = this.pageIndex;
    this.pageIndex--;
    this._emitPageEvent(previousPageIndex);
  }

  /** Move to the first page if not already there. */
  firstPage(): void {
    // hasPreviousPage being false implies at the start
    if (!this.hasPreviousPage()) {
      return;
    }

    const previousPageIndex = this.pageIndex;
    this.pageIndex = 0;
    this._emitPageEvent(previousPageIndex);
  }

  /** Move to the last page if not already there. */
  lastPage(): void {
    // hasNextPage being false implies at the end
    if (!this.hasNextPage()) {
      return;
    }

    const previousPageIndex = this.pageIndex;
    this.pageIndex = this.getNumberOfPages() - 1;
    this._emitPageEvent(previousPageIndex);
  }

  /** Whether there is a previous page. */
  hasPreviousPage(): boolean {
    return this.pageIndex >= 1 && this.pageSize != 0;
  }

  /** Whether there is a next page. */
  hasNextPage(): boolean {
    const maxPageIndex = this.getNumberOfPages() - 1;
    return this.pageIndex < maxPageIndex && this.pageSize != 0;
  }

  /** Calculate the number of pages */
  getNumberOfPages(): number {
    if (!this.pageSize) {
      return 0;
    }

    return Math.ceil(this.length / this.pageSize);
  }

  /**
   * Changes the page size so that the first item displayed on the page will still be
   * displayed using the new page size.
   *
   * For example, if the page size is 10 and on the second page (items indexed 10-19) then
   * switching so that the page size is 5 will set the third page as the current page so
   * that the 10th item will still be displayed.
   */
  _changePageSize(pageSize: number) {
    // Current page needs to be updated to reflect the new page size. Navigate to the page
    // containing the previous page's first item.
    const startIndex = this.pageIndex * this.pageSize;
    const previousPageIndex = this.pageIndex;

    this.pageIndex = Math.floor(startIndex / pageSize) || 0;
    this.pageSize = pageSize;
    this._emitPageEvent(previousPageIndex);
  }

  /** Checks whether the buttons for going forwards should be disabled. */
  _nextButtonsDisabled() {
    return this.disabled || !this.hasNextPage();
  }

  /** Checks whether the buttons for going backwards should be disabled. */
  _previousButtonsDisabled() {
    return this.disabled || !this.hasPreviousPage();
  }

  /**
   * Updates the list of page size options to display to the user. Includes making sure that
   * the page size is an option and that the list is sorted.
   */
  private _updateDisplayedPageSizeOptions() {
    if (!this._initialized) {
      return;
    }

    // If no page size is provided, use the first page size option or the default page size.
    if (!this.pageSize) {
      this._pageSize =
        this.pageSizeOptions.length != 0
          ? this.pageSizeOptions[0]
          : DEFAULT_PAGE_SIZE;
    }

    this._displayedPageSizeOptions = this.pageSizeOptions.slice();

    if (this._displayedPageSizeOptions.indexOf(this.pageSize) === -1) {
      this._displayedPageSizeOptions.push(this.pageSize);
    }

    // Sort the numbers using a number-specific sort function.
    this._displayedPageSizeOptions.sort((a, b) => a - b);
    this._changeDetectorRef.markForCheck();
  }

  /** Emits an event notifying that a change of the paginator's properties has been triggered. */
  private _emitPageEvent(previousPageIndex: number) {
    this.page.emit({
      previousPageIndex,
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      length: this.length,
    });
  }

  static ngAcceptInputType_pageIndex: NumberInput;
  static ngAcceptInputType_length: NumberInput;
  static ngAcceptInputType_pageSize: NumberInput;
  static ngAcceptInputType_hidePageSize: BooleanInput;
  static ngAcceptInputType_showFirstLastButtons: BooleanInput;
  static ngAcceptInputType_disabled: BooleanInput;
}

/**
 * Component to provide navigation between paged information. Displays the size of the current
 * page, user-selectable options to change that size, what items are being shown, and
 * navigational button to go to the previous or next page.
 */
@Component({
  selector: 'xcu-paginator',
  exportAs: 'xcuPaginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  inputs: ['disabled'],
  host: {
    class: 'xcu-paginator',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class XcuPaginator extends _XcuPaginatorBase<XcuPaginatorDefaultOptions> {
  /** If set, styles the "page size" form field with the designated style. */
  _formFieldAppearance?: XcuFormFieldAppearance;

  constructor(
    intl: XcuPaginatorIntl,
    changeDetectorRef: ChangeDetectorRef,
    _fb: FormBuilder,
    @Optional()
    @Inject(XCU_PAGINATOR_DEFAULT_OPTIONS)
    defaults?: XcuPaginatorDefaultOptions
  ) {
    super(intl, changeDetectorRef, _fb, defaults);

    if (defaults && defaults.formFieldAppearance != null) {
      this._formFieldAppearance = defaults.formFieldAppearance;
    }
  }
}
