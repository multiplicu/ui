import {
  Component,
  HostBinding,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { coerceBooleanProperty } from '@multiplicu/ui/core';

@Component({
  selector: 'xcu-dialog-action, [xcu-dialog-action]',
  exportAs: 'xcuDialogAction',
  host: {
    class: 'xcu-dialog-action',
  },
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class XcuDialogActionComponent {
  @HostBinding('class.warning')
  @Input()
  public get warning(): any {
    return this._warning;
  }

  public set warning(value: any) {
    this._warning = coerceBooleanProperty(value);
  }

  private _warning: boolean = false;

  public constructor() {}
}
