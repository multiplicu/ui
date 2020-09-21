import { Component, HostBinding, Input } from '@angular/core';
import { coerceBooleanProperty } from '@multiplicu/ui/core';

@Component({
  selector: 'xcu-panel-footer, [xcu-panel-footer]',
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

  public constructor() {}
}
