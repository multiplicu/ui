import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { XcuHint } from './../objects/hint';
import { XcuFormFieldComponent } from './form-field.component';

@NgModule({
  declarations: [XcuFormFieldComponent, XcuHint],
  imports: [CommonModule],
  exports: [XcuFormFieldComponent, XcuHint],
})
export class XcuFormFieldModule {}
