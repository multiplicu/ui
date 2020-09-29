import { Component, HostBinding, Input } from '@angular/core';
import { coerceBooleanProperty } from '@multiplicu/ui/core';

@Component({
  selector: 'xcu-dialog-footer, [xcu-dialog-footer]',
  exportAs: 'xcuDialogFooter',
  host: {
    class: 'xcu-dialog-footer',
  },
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class XcuFooterComponent {
  @HostBinding('class.centered-wide')
  @Input()
  public get centerWide(): any {
    return this._centerWide;
  }

  public set centerWide(value: any) {
    this._centerWide = coerceBooleanProperty(value);
  }

  private _centerWide: boolean = false;

  public constructor() {}
}
