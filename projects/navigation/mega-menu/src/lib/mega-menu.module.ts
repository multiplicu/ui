import { NgModule } from '@angular/core';
import { MegaMenuComponent } from './mega-menu.component';
import { XcuNavToggleModule } from '@multiplicu/ui/navigation/toggle';

@NgModule({
  declarations: [MegaMenuComponent],
  imports: [XcuNavToggleModule],
  exports: [MegaMenuComponent],
})
export class XcuMegaMenuModule {}
