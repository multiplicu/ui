import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { XcuAffix } from './../objects/affix';
import { XcuError } from './../objects/error';
import { XcuHint } from './../objects/hint';
import { XcuPrefix } from './../objects/prefix';
import { XcuSuffix } from './../objects/suffix';
import { XcuFormFieldComponent } from './form-field.component';

@NgModule({
  declarations: [
    XcuFormFieldComponent,
    XcuHint,
    XcuError,
    XcuPrefix,
    XcuSuffix,
    XcuAffix,
  ],
  imports: [CommonModule],
  exports: [
    XcuFormFieldComponent,
    XcuHint,
    XcuError,
    XcuPrefix,
    XcuSuffix,
    XcuAffix,
  ],
})
export class XcuFormFieldModule {}
