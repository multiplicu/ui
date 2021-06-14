import {
  ContentChild,
  Directive,
  ElementRef,
  Inject,
  Input,
  Optional,
  TemplateRef,
} from '@angular/core';
import { BooleanInput, coerceBooleanProperty } from '@multiplicu/ui/core';
import { CanStick, CanStickCtor, mixinHasStickyInput } from './can-stick';
import { XCU_TABLE } from './tokens';

/** Base interface for a cell definition. Captures a column's cell template definition. */
export interface CellDef {
  template: TemplateRef<any>;
}

/**
 * Cell definition for a XCU table.
 * Captures the template of a column's data row cell as well as cell-specific properties.
 */
@Directive({ selector: '[xcuCellDef]' })
export class XcuCellDef implements CellDef {
  constructor(/** @docs-private */ public template: TemplateRef<any>) {}
}

/**
 * Header cell definition for a XCU table.
 * Captures the template of a column's header cell and as well as cell-specific properties.
 */
@Directive({ selector: '[xcuHeaderCellDef]' })
export class XcuHeaderCellDef implements CellDef {
  constructor(/** @docs-private */ public template: TemplateRef<any>) {}
}

/**
 * Footer cell definition for a XCU table.
 * Captures the template of a column's footer cell and as well as cell-specific properties.
 */
@Directive({ selector: '[xcuFooterCellDef]' })
export class XcuFooterCellDef implements CellDef {
  constructor(/** @docs-private */ public template: TemplateRef<any>) {}
}

// Boilerplate for applying mixins to XcuColumnDef.
/** @docs-private */
class XcuColumnDefBase {}
const _XcuColumnDefBase: CanStickCtor & typeof XcuColumnDefBase =
  mixinHasStickyInput(XcuColumnDefBase);

/**
 * Column definition for the XCU table.
 * Defines a set of cells available for a table column.
 */
@Directive({
  selector: '[xcuColumnDef]',
  inputs: ['sticky'],
  providers: [
    { provide: 'XCU_SORT_HEADER_COLUMN_DEF', useExisting: XcuColumnDef },
  ],
})
export class XcuColumnDef extends _XcuColumnDefBase implements CanStick {
  /** Unique name for this column. */
  @Input('xcuColumnDef')
  get name(): string {
    return this._name;
  }
  set name(name: string) {
    this._setNameInput(name);
  }
  protected _name: string;

  /**
   * Whether this column should be sticky positioned on the end of the row. Should make sure
   * that it mimics the `CanStick` mixin such that `_hasStickyChanged` is set to true if the value
   * has been changed.
   */
  @Input('stickyEnd')
  get stickyEnd(): boolean {
    return this._stickyEnd;
  }
  set stickyEnd(v: boolean) {
    const prevValue = this._stickyEnd;
    this._stickyEnd = coerceBooleanProperty(v);
    this._hasStickyChanged = prevValue !== this._stickyEnd;
  }
  _stickyEnd: boolean = false;

  /** @docs-private */
  @ContentChild(XcuCellDef) cell: XcuCellDef;

  /** @docs-private */
  @ContentChild(XcuHeaderCellDef) headerCell: XcuHeaderCellDef;

  /** @docs-private */
  @ContentChild(XcuFooterCellDef) footerCell: XcuFooterCellDef;

  /**
   * Transformed version of the column name that can be used as part of a CSS classname. Excludes
   * all non-alphanumeric characters and the special characters '-' and '_'. Any characters that
   * do not match are replaced by the '-' character.
   */
  cssClassFriendlyName: string;

  /**
   * Class name for cells in this column.
   * @docs-private
   */
  _columnCssClassName: string[];

  constructor(@Inject(XCU_TABLE) @Optional() public _table?: any) {
    super();
  }

  /**
   * Overridable method that sets the css classes that will be added to every cell in this
   * column.
   * In the future, columnCssClassName will change from type string[] to string and this
   * will set a single string value.
   * @docs-private
   */
  protected _updateColumnCssClassName() {
    this._columnCssClassName = [`xcu-column-${this.cssClassFriendlyName}`];
  }

  /**
   * This has been extracted to a util because of TS 4 and VE.
   * View Engine doesn't support property rename inheritance.
   * TS 4.0 doesn't allow properties to override accessors or vice-versa.
   * @docs-private
   */
  protected _setNameInput(value: string) {
    // If the directive is set without a name (updated programmatically), then this setter will
    // trigger with an empty string and should not overwrite the programmatically set value.
    if (value) {
      this._name = value;
      this.cssClassFriendlyName = value.replace(/[^a-z0-9_-]/gi, '-');
      this._updateColumnCssClassName();
    }
  }

  static ngAcceptInputType_sticky: BooleanInput;
  static ngAcceptInputType_stickyEnd: BooleanInput;
}

/** Base class for the cells. Adds a CSS classname that identifies the column it renders in. */
export class BaseXcuCell {
  constructor(columnDef: XcuColumnDef, elementRef: ElementRef) {
    // If IE 11 is dropped before we switch to setting a single class name, change to multi param
    // with destructuring.
    const classList = elementRef.nativeElement.classList;
    for (const className of columnDef._columnCssClassName) {
      classList.add(className);
    }
  }
}

/** Header cell template container that adds the right classes and role. */
@Directive({
  selector: 'xcu-header-cell, th[xcu-header-cell]',
  host: {
    class: 'header-cell',
    role: 'columnheader',
  },
})
export class XcuHeaderCell extends BaseXcuCell {
  constructor(columnDef: XcuColumnDef, elementRef: ElementRef) {
    super(columnDef, elementRef);
  }
}

/** Footer cell template container that adds the right classes and role. */
@Directive({
  selector: 'xcu-footer-cell, td[xcu-footer-cell]',
  host: {
    class: 'footer-cell',
    role: 'gridcell',
  },
})
export class XcuFooterCell extends BaseXcuCell {
  constructor(columnDef: XcuColumnDef, elementRef: ElementRef) {
    super(columnDef, elementRef);
  }
}

/** Cell template container that adds the right classes and role. */
@Directive({
  selector: 'xcu-cell, td[xcu-cell]',
  host: {
    class: 'cell',
    role: 'gridcell',
  },
})
export class XcuCell extends BaseXcuCell {
  constructor(columnDef: XcuColumnDef, elementRef: ElementRef) {
    super(columnDef, elementRef);
  }
}
