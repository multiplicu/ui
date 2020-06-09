import { NgModule } from '@angular/core';
import { XcuPageNavComponent } from './page-nav.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [XcuPageNavComponent],
  imports: [CommonModule, RouterModule],
  exports: [XcuPageNavComponent],
})
export class XcuPageNavModule {}
