import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input,
} from '@angular/core';
import { coerceBooleanProperty, HoverMenu, NavLink } from '@multiplicu/ui/core';

@Component({
  selector:
    'xcu-switcher, div[xcu-switcher], ul[xcu-switcher], nav[xcu-switcher]',
  exportAs: 'xcuSwitcher',
  host: {
    class: 'xcu-switcher',
  },
  templateUrl: './switcher.component.html',
  styleUrls: ['./switcher.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class XcuSwitcherComponent extends HoverMenu {
  /** Wether the menu should open when hovering the mouse over the toggle. */
  @Input()
  public openOnHover: boolean;

  /** The primary link to build the menu off of. */
  @Input()
  public link: NavLink;

  /** Wether the toggle button should show an arrow. */
  @Input()
  public shouldShowArrow: boolean = true;

  /** The y-axis position of the menu. */
  @Input()
  public yPosition: 'above' | 'below' = 'below';

  /** The x-axis position of the menu. */
  @Input()
  public xPosition: 'before' | 'after' = 'after';

  /** If the menu is positioned above the toggle button. */
  @HostBinding('class.above')
  public get isPositionedAbove(): boolean {
    return this.yPosition === 'above';
  }

  /** If the menu is positioned below the toggle button. */
  @HostBinding('class.below')
  public get isPositionedBelow(): boolean {
    return this.yPosition === 'below';
  }

  /** If the menu is positioned before the toggle button. */
  @HostBinding('class.before')
  public get isPositionedBefore(): boolean {
    return this.xPosition === 'before';
  }

  /** If the menu is positioned after the toggle button. */
  @HostBinding('class.after')
  public get isPositionedAfter(): boolean {
    return this.xPosition === 'after';
  }

  private _bordered: boolean = false;

  /** Wether to show a border around the toggle for this switcher */
  @HostBinding('class.bordered')
  @Input()
  public get bordered(): any {
    return this._bordered;
  }

  public set bordered(value: any) {
    this._bordered = coerceBooleanProperty(value);
  }

  public constructor(public elementRef: ElementRef) {
    super(elementRef);
  }
}
