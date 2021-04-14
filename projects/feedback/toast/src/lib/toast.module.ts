import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ToastComponent } from './toast.component';
import { ToasterComponent } from './toaster/toaster.component';

@NgModule({
  declarations: [ToastComponent, ToasterComponent],
  imports: [CommonModule],
  exports: [ToastComponent, ToasterComponent],
})
export class XcuToastModule {}
