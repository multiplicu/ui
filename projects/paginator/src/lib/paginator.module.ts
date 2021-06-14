import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { XcuButtonModule } from '@multiplicu/ui/button';
import { XcuFormFieldModule } from '@multiplicu/ui/form/form-field';
import { XcuInputModule } from '@multiplicu/ui/form/input';
import { XCU_PAGINATOR_INTL_PROVIDER } from './paginator-intl';
import { XcuPaginator } from './paginator.component';

@NgModule({
  declarations: [XcuPaginator],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    XcuFormFieldModule,
    XcuButtonModule,
    XcuInputModule,
  ],
  exports: [XcuPaginator],
  providers: [XCU_PAGINATOR_INTL_PROVIDER],
})
export class XcuPaginatorModule {}
