import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { XcuError } from './../objects/error';
import { XcuHint } from './../objects/hint';
import { XcuFormFieldComponent } from './form-field.component';

@NgModule({
  declarations: [XcuFormFieldComponent, XcuHint, XcuError],
  imports: [CommonModule],
  exports: [XcuFormFieldComponent, XcuHint, XcuError],
})
export class XcuFormFieldModule {}
