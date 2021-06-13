import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { XcuSort } from './sort';
import { XcuSortHeader } from './sort-header/sort-header';

@NgModule({
  declarations: [XcuSort, XcuSortHeader],
  imports: [CommonModule],
  exports: [XcuSort, XcuSortHeader],
})
export class XcuSortModule {}
