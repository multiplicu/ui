import { XcuHint } from './../objects/hint';
import { NgModule } from '@angular/core';
import { XcuFormFieldComponent } from './form-field.component';

@NgModule({
  declarations: [XcuFormFieldComponent, XcuHint],
  imports: [],
  exports: [XcuFormFieldComponent],
})
export class XcuFormFieldModule {}
