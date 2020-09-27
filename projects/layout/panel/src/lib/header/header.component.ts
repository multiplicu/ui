import { Component, HostBinding, Input } from '@angular/core';
import { coerceBooleanProperty } from '@multiplicu/ui/core';

@Component({
  selector: 'xcu-panel-header, [xcu-panel-header]',
  host: {
    class: 'xcu-panel-header',
  },
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class XcuHeaderComponent {
  private _bordered: boolean = false;

  @HostBinding('class.bordered')
  @Input()
  public get bordered(): any {
    return this._bordered;
  }

  public set bordered(value: any) {
    this._bordered = coerceBooleanProperty(value);
  }

  public constructor() {}
}
