import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { XcuError } from './../objects/error';
import { XcuHint } from './../objects/hint';
import { XcuPrefix } from './../objects/prefix';
import { XcuFormFieldComponent } from './form-field.component';

@NgModule({
  declarations: [XcuFormFieldComponent, XcuHint, XcuError, XcuPrefix],
  imports: [CommonModule],
  exports: [XcuFormFieldComponent, XcuHint, XcuError, XcuPrefix],
})
export class XcuFormFieldModule {}
