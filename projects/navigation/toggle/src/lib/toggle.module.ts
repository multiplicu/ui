import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XcuNavToggleComponent } from './toggle.component';

@NgModule({
  declarations: [XcuNavToggleComponent],
  imports: [CommonModule, RouterModule],
  exports: [XcuNavToggleComponent],
})
export class XcuNavToggleModule {}
