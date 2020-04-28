import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { XcuNavToggleModule } from '@multiplicu/ui/navigation/toggle';
import { MegaMenuItemComponent } from './mega-menu-item/mega-menu-item.component';
import { MegaMenuComponent } from './mega-menu.component';

@NgModule({
  declarations: [MegaMenuComponent, MegaMenuItemComponent],
  imports: [CommonModule, XcuNavToggleModule],
  exports: [MegaMenuComponent, MegaMenuItemComponent],
})
export class XcuMegaMenuModule {}
