import { NgModule } from '@angular/core';
import { XcuButtonGroupComponent } from './button-group/button-group.component';
import { XcuAnchorComponent, XcuButtonComponent } from './button.component';

@NgModule({
  declarations: [
    XcuButtonComponent,
    XcuAnchorComponent,
    XcuButtonGroupComponent,
  ],
  imports: [],
  exports: [XcuButtonComponent, XcuAnchorComponent, XcuButtonGroupComponent],
})
export class XcuButtonModule {}
