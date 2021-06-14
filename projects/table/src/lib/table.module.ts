import { NgModule } from '@angular/core';
import {
  XcuCell,
  XcuCellDef,
  XcuColumnDef,
  XcuFooterCell,
  XcuFooterCellDef,
  XcuHeaderCell,
  XcuHeaderCellDef,
} from './cell';
import { XcuSimpleCellComponent } from './cell/cell.component';
import { XcuSimpleHeadComponent } from './head/head.component';
import {
  XcuCellOutlet,
  XcuFooterRow,
  XcuFooterRowDef,
  XcuHeaderRow,
  XcuHeaderRowDef,
  XcuNoDataRow,
  XcuRow,
  XcuRowDef,
} from './row';
import {
  DataRowOutlet,
  FooterRowOutlet,
  HeaderRowOutlet,
  NoDataRowOutlet,
  XcuRecycleRows,
  XcuTable,
} from './table';
import { XcuSimpleTableComponent } from './table/table.component';
import { XcuTextColumn } from './text-column';

const EXPORTED_DECLARATIONS = [
  XcuTable,
  XcuRowDef,
  XcuCellDef,
  XcuCellOutlet,
  XcuHeaderCellDef,
  XcuFooterCellDef,
  XcuColumnDef,
  XcuCell,
  XcuRow,
  XcuHeaderCell,
  XcuFooterCell,
  XcuHeaderRow,
  XcuHeaderRowDef,
  XcuFooterRow,
  XcuFooterRowDef,
  DataRowOutlet,
  HeaderRowOutlet,
  FooterRowOutlet,
  XcuTextColumn,
  XcuNoDataRow,
  XcuRecycleRows,
  NoDataRowOutlet,
  XcuSimpleTableComponent,
  XcuSimpleHeadComponent,
  XcuSimpleCellComponent,
];
@NgModule({
  exports: EXPORTED_DECLARATIONS,
  declarations: EXPORTED_DECLARATIONS,
  imports: [],
})
export class XcuTableModule {}
