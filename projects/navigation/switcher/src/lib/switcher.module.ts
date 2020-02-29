import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XcuSwitcherComponent } from './switcher.component';

@NgModule({
  declarations: [XcuSwitcherComponent],
  imports: [CommonModule, RouterModule],
  exports: [XcuSwitcherComponent],
})
export class XcuSwitcherModule {}
