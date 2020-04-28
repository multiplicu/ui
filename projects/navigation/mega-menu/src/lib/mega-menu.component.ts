import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input,
} from '@angular/core';
import { NavLink } from '@multiplicu/ui/core';

@Component({
  selector: `xcu-mega-menu, div[xcu-mega-menu], ul[xcu-mega-menu], nav[xcu-mega-menu]`,
  exportAs: 'xcuMegaMenu',
  templateUrl: './mega-menu.component.html',
  styleUrls: ['./mega-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MegaMenuComponent {
  @HostBinding('class.xcu-mega-menu--active')
  @Input()
  public isActive: boolean;

  @Input() public link: NavLink;

  public constructor(public elementRef: ElementRef) {
    // Add a class that applies to all mega menus. This makes it easier to target if somebody
    // wants to target all mega menus. We do it here rather than `host` to ensure that
    // the class is applied to derived classes.
    elementRef.nativeElement.classList.add('xcu-mega-menu');
  }
}
