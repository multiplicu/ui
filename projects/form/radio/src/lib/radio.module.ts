import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { XcuRadioButton, XcuRadioGroup } from './radio.component';

@NgModule({
  declarations: [XcuRadioButton, XcuRadioGroup],
  imports: [CommonModule],
  exports: [XcuRadioButton, XcuRadioGroup],
})
export class XcuRadioModule {}
