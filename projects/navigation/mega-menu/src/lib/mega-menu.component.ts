import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  HostBinding,
} from '@angular/core';
import { NavLink, HoverMenu, coerceBooleanProperty } from '@multiplicu/ui/core';

@Component({
  selector: `xcu-mega-menu, div[xcu-mega-menu], ul[xcu-mega-menu], nav[xcu-mega-menu]`,
  exportAs: 'xcuMegaMenu',
  templateUrl: './mega-menu.component.html',
  styleUrls: ['./mega-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MegaMenuComponent extends HoverMenu {
  @Input() public link: NavLink;

  private horizontal_: boolean = false;

  @HostBinding('class.horizontal')
  @Input()
  public get horizontal(): any {
    return this.horizontal_;
  }

  public set horizontal(value: any) {
    this.horizontal_ = coerceBooleanProperty(value);
  }

  public constructor(public elementRef: ElementRef) {
    super(elementRef);

    // Add a class that applies to all mega menus. This makes it easier to target if somebody
    // wants to target all mega menus. We do it here rather than `host` to ensure that
    // the class is applied to derived classes.
    elementRef.nativeElement.classList.add('xcu-mega-menu');
  }
}
