import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  Inject,
  IterableChanges,
  IterableDiffer,
  IterableDiffers,
  OnChanges,
  OnDestroy,
  Optional,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import { BooleanInput } from '@multiplicu/ui/core';
import { CanStick, CanStickCtor, mixinHasStickyInput } from './can-stick';
import { XcuCellDef, XcuColumnDef } from './cell';
import { XCU_TABLE } from './tokens';

/**
 * The row template that can be used by the mat-table. Should not be used outside of the
 * material library.
 */
export const XCU_ROW_TEMPLATE = `<ng-container xcuCellOutlet></ng-container>`;

/**
 * Base class for the XcuHeaderRowDef and XcuRowDef that handles checking their columns inputs
 * for changes and notifying the table.
 */
@Directive()
export abstract class BaseRowDef implements OnChanges {
  /** The columns to be displayed on this row. */
  columns: Iterable<string>;

  /** Differ used to check if any changes were made to the columns. */
  protected _columnsDiffer: IterableDiffer<any>;

  constructor(
    /** @docs-private */ public template: TemplateRef<any>,
    protected _differs: IterableDiffers
  ) {}

  public ngOnChanges(changes: SimpleChanges): void {
    // Create a new columns differ if one does not yet exist. Initialize it based on initial value
    // of the columns property or an empty array if none is provided.
    if (!this._columnsDiffer) {
      const columns =
        (changes['columns'] && changes['columns'].currentValue) || [];
      this._columnsDiffer = this._differs.find(columns).create();
      this._columnsDiffer.diff(columns);
    }
  }

  /**
   * Returns the difference between the current columns and the columns from the last diff, or null
   * if there is no difference.
   */
  public getColumnsDiff(): IterableChanges<any> | null {
    return this._columnsDiffer.diff(this.columns);
  }

  /** Gets this row def's relevant cell template from the provided column def. */
  public extractCellTemplate(column: XcuColumnDef): TemplateRef<any> {
    if (this instanceof XcuHeaderRowDef) {
      return column.headerCell.template;
    }
    if (this instanceof XcuFooterRowDef) {
      return column.footerCell.template;
    } else {
      return column.cell.template;
    }
  }
}

// Boilerplate for applying mixins to XcuHeaderRowDef.
/** @docs-private */
class XcuHeaderRowDefBase extends BaseRowDef {}
const _XcuHeaderRowDefBase: CanStickCtor & typeof XcuHeaderRowDefBase =
  mixinHasStickyInput(XcuHeaderRowDefBase);

/**
 * Header row definition for the XCU table.
 * Captures the header row's template and other header properties such as the columns to display.
 */
@Directive({
  selector: '[xcuHeaderRowDef]',
  inputs: ['columns: xcuHeaderRowDef', 'sticky: xcuHeaderRowDefSticky'],
})
export class XcuHeaderRowDef
  extends _XcuHeaderRowDefBase
  implements CanStick, OnChanges
{
  constructor(
    template: TemplateRef<any>,
    _differs: IterableDiffers,
    @Inject(XCU_TABLE) @Optional() public _table?: any
  ) {
    super(template, _differs);
  }

  // Prerender fails to recognize that ngOnChanges in a part of this class through inheritance.
  // Explicitly define it so that the method is called as part of the Angular lifecycle.
  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
  }

  static ngAcceptInputType_sticky: BooleanInput;
}

// Boilerplate for applying mixins to XcuFooterRowDef.
/** @docs-private */
class XcuFooterRowDefBase extends BaseRowDef {}
const _XcuFooterRowDefBase: CanStickCtor & typeof XcuFooterRowDefBase =
  mixinHasStickyInput(XcuFooterRowDefBase);

/**
 * Footer row definition for the XCU table.
 * Captures the footer row's template and other footer properties such as the columns to display.
 */
@Directive({
  selector: '[xcuFooterRowDef]',
  inputs: ['columns: xcuFooterRowDef', 'sticky: xcuFooterRowDefSticky'],
})
export class XcuFooterRowDef
  extends _XcuFooterRowDefBase
  implements CanStick, OnChanges
{
  constructor(
    template: TemplateRef<any>,
    _differs: IterableDiffers,
    @Inject(XCU_TABLE) @Optional() public _table?: any
  ) {
    super(template, _differs);
  }

  // Prerender fails to recognize that ngOnChanges in a part of this class through inheritance.
  // Explicitly define it so that the method is called as part of the Angular lifecycle.
  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
  }

  static ngAcceptInputType_sticky: BooleanInput;
}

/**
 * Data row definition for the XCU table.
 * Captures the header row's template and other row properties such as the columns to display and
 * a when predicate that describes when this row should be used.
 */
@Directive({
  selector: '[xcuRowDef]',
  inputs: ['columns: xcuRowDefColumns', 'when: xcuRowDefWhen'],
})
export class XcuRowDef<T> extends BaseRowDef {
  /**
   * Function that should return true if this row template should be used for the provided index
   * and row data. If left undefined, this row will be considered the default row template to use
   * when no other when functions return true for the data.
   * For every row, there must be at least one when function that passes or an undefined to default.
   */
  when: (index: number, rowData: T) => boolean;

  // TODO(andrewseguin): Add an input for providing a switch function to determine
  //   if this template should be used.
  constructor(
    template: TemplateRef<any>,
    _differs: IterableDiffers,
    @Inject(XCU_TABLE) @Optional() public _table?: any
  ) {
    super(template, _differs);
  }
}

/** Context provided to the row cells when `multiTemplateDataRows` is false */
export interface XcuCellOutletRowContext<T> {
  /** Data for the row that this cell is located within. */
  $implicit?: T;

  /** Index of the data object in the provided data array. */
  index?: number;

  /** Length of the number of total rows. */
  count?: number;

  /** True if this cell is contained in the first row. */
  first?: boolean;

  /** True if this cell is contained in the last row. */
  last?: boolean;

  /** True if this cell is contained in a row with an even-numbered index. */
  even?: boolean;

  /** True if this cell is contained in a row with an odd-numbered index. */
  odd?: boolean;
}

/**
 * Context provided to the row cells when `multiTemplateDataRows` is true. This context is the same
 * as XcuCellOutletRowContext except that the single `index` value is replaced by `dataIndex` and
 * `renderIndex`.
 */
export interface XcuCellOutletMultiRowContext<T> {
  /** Data for the row that this cell is located within. */
  $implicit?: T;

  /** Index of the data object in the provided data array. */
  dataIndex?: number;

  /** Index location of the rendered row that this cell is located within. */
  renderIndex?: number;

  /** Length of the number of total rows. */
  count?: number;

  /** True if this cell is contained in the first row. */
  first?: boolean;

  /** True if this cell is contained in the last row. */
  last?: boolean;

  /** True if this cell is contained in a row with an even-numbered index. */
  even?: boolean;

  /** True if this cell is contained in a row with an odd-numbered index. */
  odd?: boolean;
}

/**
 * Outlet for rendering cells inside of a row or header row.
 * @docs-private
 */
@Directive({ selector: '[xcuCellOutlet]' })
export class XcuCellOutlet implements OnDestroy {
  /** The ordered list of cells to render within this outlet's view container */
  cells: XcuCellDef[];

  /** The data context to be provided to each cell */
  context: any;

  /**
   * Static property containing the latest constructed instance of this class.
   * Used by the XCU table when each XcuHeaderRow and XcuRow component is created using
   * createEmbeddedView. After one of these components are created, this property will provide
   * a handle to provide that component's cells and context. After init, the XcuCellOutlet will
   * construct the cells with the provided context.
   */
  static mostRecentCellOutlet: XcuCellOutlet | null = null;

  constructor(public _viewContainer: ViewContainerRef) {
    XcuCellOutlet.mostRecentCellOutlet = this;
  }

  ngOnDestroy() {
    // If this was the last outlet being rendered in the view, remove the reference
    // from the static property after it has been destroyed to avoid leaking memory.
    if (XcuCellOutlet.mostRecentCellOutlet === this) {
      XcuCellOutlet.mostRecentCellOutlet = null;
    }
  }
}

/** Header template container that contains the cell outlet. Adds the right class and role. */
@Component({
  selector: 'xcu-header-row, tr[xcu-header-row]',
  template: XCU_ROW_TEMPLATE,
  host: {
    class: 'header-row',
    role: 'row',
  },
  // See note on XcuTable for explanation on why this uses the default change detection strategy.
  // tslint:disable-next-line:validate-decorators
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.None,
})
export class XcuHeaderRow {}

/** Footer template container that contains the cell outlet. Adds the right class and role. */
@Component({
  selector: 'xcu-footer-row, tr[xcu-footer-row]',
  template: XCU_ROW_TEMPLATE,
  host: {
    class: 'footer-row',
    role: 'row',
  },
  // See note on XcuTable for explanation on why this uses the default change detection strategy.
  // tslint:disable-next-line:validate-decorators
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.None,
})
export class XcuFooterRow {}

/** Data row template container that contains the cell outlet. Adds the right class and role. */
@Component({
  selector: 'xcu-row, tr[xcu-row]',
  template: XCU_ROW_TEMPLATE,
  host: {
    class: 'row',
    role: 'row',
  },
  // See note on XcuTable for explanation on why this uses the default change detection strategy.
  // tslint:disable-next-line:validate-decorators
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.None,
})
export class XcuRow {}

/** Row that can be used to display a message when no data is shown in the table. */
@Directive({
  selector: 'ng-template[xcuNoDataRow]',
})
export class XcuNoDataRow {
  constructor(public templateRef: TemplateRef<any>) {}
}
