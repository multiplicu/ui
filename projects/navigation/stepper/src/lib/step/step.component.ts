import { Component, HostBinding, Input } from '@angular/core';
import { coerceBooleanProperty } from '@multiplicu/ui/core';

@Component({
  selector: 'xcu-step, [xcu-step]',
  exportAs: 'xcuStep',
  host: {
    class: 'xcu-step',
  },
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss'],
})
export class XcuStepComponent {
  @Input()
  public step: number;
  @Input()
  public label: string;

  private _completed: boolean;

  @HostBinding('class.completed')
  @Input()
  public get completed(): any {
    return this._completed;
  }

  public set completed(value: any) {
    this._completed = coerceBooleanProperty(value);
  }

  private _active: boolean;

  @HostBinding('class.active')
  @Input()
  public get active(): any {
    return this._active;
  }

  public set active(value: any) {
    this._active = coerceBooleanProperty(value);
  }

  public constructor() {}
}
