/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import {
  Directive,
  EventEmitter,
  Inject,
  InjectionToken,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
} from '@angular/core';
import {
  BooleanInput,
  CanDisable,
  CanDisableCtor,
  coerceBooleanProperty,
  HasInitialized,
  HasInitializedCtor,
  mixinDisabled,
  mixinInitialized,
} from '@multiplicu/ui/core';
import { Subject } from 'rxjs';
import { SortDirection } from './sort-direction';
import { getSortInvalidDirectionError } from './sort-errors';

/** Interface for a directive that holds sorting state consumed by `XcuSortHeader`. */
export interface XcuSortable {
  /** The id of the column being sorted. */
  id: string;

  /** Starting sort direction. */
  start: 'asc' | 'desc';

  /** Whether to disable clearing the sorting state. */
  disableClear: boolean;
}

/** The current sort state. */
export interface Sort {
  /** The id of the column being sorted. */
  active: string;

  /** The sort direction. */
  direction: SortDirection;
}

/** Default options for `xcu-sort`.  */
export interface XcuSortDefaultOptions {
  /** Whether to disable clearing the sorting state. */
  disableClear?: boolean;
}

/** Injection token to be used to override the default options for `xcu-sort`. */
export const XCU_SORT_DEFAULT_OPTIONS =
  new InjectionToken<XcuSortDefaultOptions>('XCU_SORT_DEFAULT_OPTIONS');

// Boilerplate for applying mixins to XcuSort.
/** @docs-private */
class XcuSortBase {}
const _XcuSortMixinBase: HasInitializedCtor &
  CanDisableCtor &
  typeof XcuSortBase = mixinInitialized(mixinDisabled(XcuSortBase));

/** Container for XcuSortables to manage the sort state and provide default sort parameters. */
@Directive({
  selector: '[xcuSort]',
  exportAs: 'xcuSort',
  host: { class: 'xcu-sort' },
  inputs: ['disabled: xcuSortDisabled'],
})
export class XcuSort
  extends _XcuSortMixinBase
  implements CanDisable, HasInitialized, OnChanges, OnDestroy, OnInit
{
  /** Collection of all registered sortables that this directive manages. */
  sortables = new Map<string, XcuSortable>();

  /** Used to notify any child components listening to state changes. */
  readonly _stateChanges = new Subject<void>();

  /** The id of the most recently sorted XcuSortable. */
  @Input('xcuSortActive') active: string;

  /**
   * The direction to set when an XcuSortable is initially sorted.
   * May be overriden by the XcuSortable's sort start.
   */
  @Input('xcuSortStart') start: 'asc' | 'desc' = 'asc';

  /** The sort direction of the currently active XcuSortable. */
  @Input('xcuSortDirection')
  get direction(): SortDirection {
    return this._direction;
  }
  set direction(direction: SortDirection) {
    if (direction && direction !== 'asc' && direction !== 'desc') {
      throw getSortInvalidDirectionError(direction);
    }
    this._direction = direction;
  }
  private _direction: SortDirection = '';

  /**
   * Whether to disable the user from clearing the sort by finishing the sort direction cycle.
   * May be overriden by the XcuSortable's disable clear input.
   */
  @Input('xcuSortDisableClear')
  get disableClear(): boolean {
    return this._disableClear;
  }
  set disableClear(v: boolean) {
    this._disableClear = coerceBooleanProperty(v);
  }
  private _disableClear: boolean;

  /** Event emitted when the user changes either the active sort or sort direction. */
  @Output('xcuSortChange') readonly sortChange: EventEmitter<Sort> =
    new EventEmitter<Sort>();

  constructor(
    @Optional()
    @Inject(XCU_SORT_DEFAULT_OPTIONS)
    private _defaultOptions?: XcuSortDefaultOptions
  ) {
    super();
  }

  /**
   * Register function to be used by the contained XcuSortables. Adds the XcuSortable to the
   * collection of XcuSortables.
   */
  register(sortable: XcuSortable): void {
    this.sortables.set(sortable.id, sortable);
  }

  /**
   * Unregister function to be used by the contained XcuSortables. Removes the XcuSortable from the
   * collection of contained XcuSortables.
   */
  deregister(sortable: XcuSortable): void {
    this.sortables.delete(sortable.id);
  }

  /** Sets the active sort id and determines the new sort direction. */
  sort(sortable: XcuSortable): void {
    if (this.active != sortable.id) {
      this.active = sortable.id;
      this.direction = sortable.start ? sortable.start : this.start;
    } else {
      this.direction = this.getNextSortDirection(sortable);
    }

    this.sortChange.emit({ active: this.active, direction: this.direction });
  }

  /** Returns the next sort direction of the active sortable, checking for potential overrides. */
  getNextSortDirection(sortable: XcuSortable): SortDirection {
    if (!sortable) {
      return '';
    }

    // Get the sort direction cycle with the potential sortable overrides.
    const disableClear =
      sortable?.disableClear ??
      this.disableClear ??
      !!this._defaultOptions?.disableClear;
    let sortDirectionCycle = getSortDirectionCycle(
      sortable.start || this.start,
      disableClear
    );

    // Get and return the next direction in the cycle
    let nextDirectionIndex = sortDirectionCycle.indexOf(this.direction) + 1;
    if (nextDirectionIndex >= sortDirectionCycle.length) {
      nextDirectionIndex = 0;
    }
    return sortDirectionCycle[nextDirectionIndex];
  }

  ngOnInit() {
    this._markInitialized();
  }

  ngOnChanges() {
    this._stateChanges.next();
  }

  ngOnDestroy() {
    this._stateChanges.complete();
  }

  static ngAcceptInputType_disableClear: BooleanInput;
  static ngAcceptInputType_disabled: BooleanInput;
}

/** Returns the sort direction cycle to use given the provided parameters of order and clear. */
function getSortDirectionCycle(
  start: 'asc' | 'desc',
  disableClear: boolean
): SortDirection[] {
  let sortOrder: SortDirection[] = ['asc', 'desc'];
  if (start == 'desc') {
    sortOrder.reverse();
  }
  if (!disableClear) {
    sortOrder.push('');
  }

  return sortOrder;
}
