import {
  Component,
  ElementRef,
  HostBinding,
  Input,
  ViewChild,
} from '@angular/core';
import { coerceBooleanProperty, HoverMenu, NavLink } from '@multiplicu/ui/core';
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

  private _horizontal: boolean = false;
  private _singleColumn: boolean = false;

  @HostBinding('class.horizontal')
  @Input()
  public get horizontal(): any {
    return this._horizontal;
  }

  public set horizontal(value: any) {
    this._horizontal = coerceBooleanProperty(value);
  }

  @HostBinding('class.single-column')
  @Input('single-column')
  public get singleColumn(): any {
    return this._singleColumn;
  }

  public set singleColumn(value: any) {
    this._singleColumn = coerceBooleanProperty(value);
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
