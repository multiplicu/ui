import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { XcuLoaderModule } from '@multiplicu/ui/loader';
import { XcuButtonGroupComponent } from './button-group/button-group.component';
import { XcuAnchorComponent, XcuButtonComponent } from './button.component';

@NgModule({
  declarations: [
    XcuButtonComponent,
    XcuAnchorComponent,
    XcuButtonGroupComponent,
  ],
  imports: [CommonModule, XcuLoaderModule],
  exports: [XcuButtonComponent, XcuAnchorComponent, XcuButtonGroupComponent],
})
export class XcuButtonModule {}
