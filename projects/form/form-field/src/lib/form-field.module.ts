import { XcuInputModule } from '@multiplicu/ui/form/input';
import { NgModule } from '@angular/core';
import { XcuFormFieldComponent } from './form-field.component';

@NgModule({
  declarations: [XcuFormFieldComponent],
  imports: [XcuInputModule],
  exports: [XcuFormFieldComponent],
})
export class XcuFormFieldModule {}
