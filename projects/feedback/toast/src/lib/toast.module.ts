import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { XcuToastComponent } from './toast.component';
import { XcuToasterComponent } from './toaster/toaster.component';

@NgModule({
  declarations: [XcuToastComponent, XcuToasterComponent],
  imports: [CommonModule],
  exports: [XcuToastComponent, XcuToasterComponent],
})
export class XcuToastModule {}
