import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { XcuDialogActionComponent } from './action/action.component';
import { XcuDialogContentComponent } from './content/content.component';
import { XcuDialogComponent } from './dialog.component';
import { XcuFooterComponent } from './footer/footer.component';
import { XcuDialogHeadlineComponent } from './headline/headline.component';

@NgModule({
  declarations: [
    XcuDialogComponent,
    XcuFooterComponent,
    XcuDialogActionComponent,
    XcuDialogHeadlineComponent,
    XcuDialogContentComponent,
  ],
  imports: [CommonModule],
  exports: [
    XcuDialogComponent,
    XcuFooterComponent,
    XcuDialogActionComponent,
    XcuDialogHeadlineComponent,
    XcuDialogContentComponent,
  ],
})
export class XcuDialogModule {}
