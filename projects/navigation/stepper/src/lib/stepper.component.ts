import { Component } from '@angular/core';

@Component({
  selector: 'xcu-stepper, [xcu-stepper]',
  exportAs: 'xcuStepper',
  host: {
    class: 'xcu-stepper',
  },
  templateUrl: 'stepper.component.html',
  styleUrls: ['stepper.component.scss'],
})
export class XcuStepperComponent {
  public constructor() {}
}
