import { NgModule } from '@angular/core';
import { XcuTableComponent } from './table.component';
import { XcuHeadComponent } from './head/head.component';
import { XcuCellComponent } from './cell/cell.component';

@NgModule({
  declarations: [XcuTableComponent, XcuHeadComponent, XcuCellComponent],
  imports: [],
  exports: [XcuTableComponent, XcuHeadComponent, XcuCellComponent],
})
export class XcuTableModule {}
