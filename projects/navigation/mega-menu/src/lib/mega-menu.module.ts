import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { XcuNavToggleModule } from '@multiplicu/ui/navigation/toggle';
import { XcuMegaMenuItemComponent } from './mega-menu-item/mega-menu-item.component';
import { XcuMegaMenuComponent } from './mega-menu.component';
import { XcuMegaMenuFooterComponent } from './mega-menu-footer/mega-menu-footer.component';
import { XcuBadgeModule } from '@multiplicu/ui/badge';
import { XcuButtonModule } from '@multiplicu/ui/button';

@NgModule({
  declarations: [
    XcuMegaMenuComponent,
    XcuMegaMenuItemComponent,
    XcuMegaMenuFooterComponent,
  ],
  imports: [CommonModule, XcuNavToggleModule, XcuBadgeModule, XcuButtonModule],
  exports: [
    XcuMegaMenuComponent,
    XcuMegaMenuItemComponent,
    XcuMegaMenuFooterComponent,
  ],
})
export class XcuMegaMenuModule {}
