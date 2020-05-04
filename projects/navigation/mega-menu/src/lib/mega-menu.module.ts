import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { XcuNavToggleModule } from '@multiplicu/ui/navigation/toggle';
import { MegaMenuItemComponent } from './mega-menu-item/mega-menu-item.component';
import { MegaMenuComponent } from './mega-menu.component';
import { MegaMenuFooterComponent } from './mega-menu-footer/mega-menu-footer.component';

@NgModule({
  declarations: [
    MegaMenuComponent,
    MegaMenuItemComponent,
    MegaMenuFooterComponent,
  ],
  imports: [CommonModule, XcuNavToggleModule],
  exports: [MegaMenuComponent, MegaMenuItemComponent, MegaMenuFooterComponent],
})
export class XcuMegaMenuModule {}
