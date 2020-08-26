import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { XcuOptgroupComponent } from './optgroup/optgroup.component';
import { XcuOptionComponent } from './option/option.component';
import { XcuSelectComponent } from './select.component';

@NgModule({
  declarations: [XcuSelectComponent, XcuOptionComponent, XcuOptgroupComponent],
  imports: [CommonModule],
  exports: [XcuSelectComponent, XcuOptionComponent, XcuOptgroupComponent],
})
export class XcuSelectModule {}
