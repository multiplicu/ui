import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  HostBinding,
  ViewChild,
} from '@angular/core';
import { NavLink, HoverMenu, coerceBooleanProperty } from '@multiplicu/ui/core';
import { XcuNavToggleComponent } from '@multiplicu/ui/navigation/toggle';

@Component({
  selector: `xcu-mega-menu, div[xcu-mega-menu], ul[xcu-mega-menu], nav[xcu-mega-menu]`,
  exportAs: 'xcuMegaMenu',
  templateUrl: './mega-menu.component.html',
  styleUrls: ['./mega-menu.component.scss'],
})
export class XcuMegaMenuComponent extends HoverMenu {
  @ViewChild(XcuNavToggleComponent) public navToggle: XcuNavToggleComponent;

  @Input() public link: NavLink;

  private horizontal_: boolean = false;
  private singleColumn_: boolean = false;

  @HostBinding('class.horizontal')
  @Input()
  public get horizontal(): any {
    return this.horizontal_;
  }

  public set horizontal(value: any) {
    this.horizontal_ = coerceBooleanProperty(value);
  }

  @HostBinding('class.single-column')
  @Input('single-column')
  public get singleColumn(): any {
    return this.singleColumn_;
  }

  public set singleColumn(value: any) {
    this.singleColumn_ = coerceBooleanProperty(value);
  }

  public constructor(public elementRef: ElementRef) {
    super(elementRef);

    // Add a class that applies to all mega menus. This makes it easier to target if somebody
    // wants to target all mega menus. We do it here rather than `host` to ensure that
    // the class is applied to derived classes.
    elementRef.nativeElement.classList.add('xcu-mega-menu');
  }

  public toggle(state: boolean, emitEvent: boolean = true): boolean {
    this.isActive = state;

    if (emitEvent) {
      this.toggled.emit(state);
    }

    return state;
  }
}
