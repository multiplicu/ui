import {
  Component,
  ContentChildren,
  HostBinding,
  Input,
  QueryList,
  ViewEncapsulation,
} from '@angular/core';
import { coerceBooleanProperty } from '@multiplicu/ui/core';
import { XcuStepComponent } from './step/step.component';

@Component({
  selector: 'xcu-stepper, [xcu-stepper]',
  exportAs: 'xcuStepper',
  host: {
    class: 'xcu-stepper',
  },
  templateUrl: 'stepper.component.html',
  styleUrls: ['stepper.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class XcuStepperComponent {
  @ContentChildren(XcuStepComponent, { descendants: false })
  public steps: QueryList<XcuStepComponent>;

  private _nested: boolean;

  @HostBinding('class.xcu-stepper--nested')
  @Input()
  public get nested(): any {
    return this._nested;
  }

  public set nested(value: any) {
    this._nested = coerceBooleanProperty(value);
  }

  private _connected: boolean;

  @HostBinding('class.xcu-stepper--connected')
  @Input()
  public get connected(): any {
    return this._connected;
  }

  public set connected(value: any) {
    this._connected = coerceBooleanProperty(value);
  }

  private _bullets: boolean;

  @HostBinding('class.xcu-stepper--bullets')
  @Input()
  public get bullets(): any {
    return this._bullets;
  }

  public set bullets(value: any) {
    this._bullets = coerceBooleanProperty(value);
  }

  public constructor() {}
}
