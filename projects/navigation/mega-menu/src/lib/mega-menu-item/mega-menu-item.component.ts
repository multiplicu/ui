import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  HostBinding,
  Input,
  QueryList,
} from '@angular/core';

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

  public constructor() {}
}
