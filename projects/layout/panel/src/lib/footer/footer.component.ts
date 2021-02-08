import { Component, HostBinding, Input } from '@angular/core';
import { coerceBooleanProperty } from '@multiplicu/ui/core';

@Component({
  selector: 'xcu-panel-footer, [xcu-panel-footer]',
  host: {
    class: 'xcu-panel-footer',
  },
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class XcuFooterComponent {
  private _bordered: boolean = false;

  @HostBinding('class.bordered')
  @Input()
  public get bordered(): any {
    return this._bordered;
  }

  public set bordered(value: any) {
    this._bordered = coerceBooleanProperty(value);
  }

  private _colored: boolean = false;

  @HostBinding('class.colored')
  @Input()
  public get colored(): any {
    return this._colored;
  }

  public set colored(value: any) {
    this._colored = coerceBooleanProperty(value);
  }

  public constructor() {}
}
