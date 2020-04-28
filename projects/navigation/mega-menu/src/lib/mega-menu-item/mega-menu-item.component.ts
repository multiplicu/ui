import {
  Component,
  OnInit,
  Input,
  HostBinding,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'xcu-mega-menu-item, a[xcu-mega-menu-item]',
  exportAs: 'xcuMegaMenuItem',
  templateUrl: './mega-menu-item.component.html',
  styleUrls: ['./mega-menu-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MegaMenuItemComponent implements OnInit {
  @Input() public title: string;
  @Input() public description: string;

  @HostBinding('style.--icon-bg-color')
  @Input()
  public iconBgHex: string;

  @Input() public badge: string;

  public constructor() {}

  ngOnInit(): void {}
}
