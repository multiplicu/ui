import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { XcuStepComponent } from './step/step.component';
import { XcuStepperComponent } from './stepper.component';

@NgModule({
  declarations: [XcuStepperComponent, XcuStepComponent],
  imports: [CommonModule],
  exports: [XcuStepperComponent, XcuStepComponent],
})
export class XcuStepperModule {}
