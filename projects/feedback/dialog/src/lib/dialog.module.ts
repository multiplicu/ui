import { NgModule } from '@angular/core';
import { XcuDialogActionComponent } from './action/action.component';
import { XcuDialogComponent } from './dialog.component';
import { XcuFooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    XcuDialogComponent,
    XcuFooterComponent,
    XcuDialogActionComponent,
  ],
  imports: [],
  exports: [XcuDialogComponent, XcuFooterComponent, XcuDialogActionComponent],
})
export class XcuDialogModule {}
