import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  HostBinding,
  Input,
  QueryList,
} from '@angular/core';
import { coerceBooleanProperty } from '@multiplicu/ui/core';

@Component({
  selector: 'xcu-mega-menu-item, a[xcu-mega-menu-item]',
  exportAs: 'xcuMegaMenuItem',
  templateUrl: './mega-menu-item.component.html',
  styleUrls: ['./mega-menu-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class XcuMegaMenuItemComponent {
  @Input() public title: string;
  @Input() public description: string;
  @Input() public badge: string;
  @Input() public badgeColor: string = 'gray';

  @HostBinding('style.--icon-bg-color')
  @Input()
  public iconBgHex: string;

  @ContentChildren('icon') public icons: QueryList<any>;

  @HostBinding('class.rounded')
  @Input()
  public get rounded(): any {
    return this._rounded;
  }

  public set rounded(value: any) {
    this._rounded = coerceBooleanProperty(value);
  }
  private _rounded: boolean = false;

  public constructor(public elementRef: ElementRef) {}
}
