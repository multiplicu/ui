import { NgModule } from '@angular/core';
import { XcuPanelComponent } from './panel.component';
import { XcuContentComponent } from './content/content.component';
import { XcuHeaderComponent } from './header/header.component';
import { XcuFooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    XcuPanelComponent,
    XcuContentComponent,
    XcuHeaderComponent,
    XcuFooterComponent,
  ],
  imports: [],
  exports: [
    XcuPanelComponent,
    XcuContentComponent,
    XcuHeaderComponent,
    XcuFooterComponent,
  ],
})
export class XcuPanelModule {}
