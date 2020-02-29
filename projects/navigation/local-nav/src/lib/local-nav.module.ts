import { XcuSwitcherModule } from '@multiplicu/ui/navigation/switcher';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XcuLocalNavComponent } from './local-nav.component';

@NgModule({
  declarations: [XcuLocalNavComponent],
  imports: [CommonModule, RouterModule, XcuSwitcherModule],
  exports: [XcuLocalNavComponent],
})
export class XcuLocalNavModule {}
