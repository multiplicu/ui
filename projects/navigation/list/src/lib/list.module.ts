import { NgModule } from '@angular/core';
import {
  XcuListGroupComponent,
  XcuListSubheader,
} from './list-group/list-group.component';
import { XcuListItemContentComponent } from './list-item-content/list-item-content.component';
import { XcuListItemComponent } from './list-item/list-item.component';
import { XcuListComponent } from './list.component';

@NgModule({
  declarations: [
    XcuListComponent,
    XcuListItemComponent,
    XcuListGroupComponent,
    XcuListItemContentComponent,
    XcuListSubheader,
  ],
  imports: [],
  exports: [
    XcuListComponent,
    XcuListItemComponent,
    XcuListGroupComponent,
    XcuListItemContentComponent,
    XcuListSubheader,
  ],
})
export class XcuListModule {}
