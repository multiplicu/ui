import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input,
} from '@angular/core';
import { coerceBooleanProperty } from '@multiplicu/ui/core';

/**
 * List of classes to add to XcuButton instances based on host attributes to
 * style as different variants.
 */
const BADGE_COLORS: string[] = [
  'gray',
  'red',
  'orange',
  'yellow',
  'green',
  'teal',
  'blue',
  'indigo',
  'purple',
  'pink',
  'success',
  'error',
  'warning',
  'info',
  'primary',
  'secondary',
];

@Component({
  selector: `xcu-badge, div[xcu-badge], span[xcu-badge], button[xcu-badge]`,
  exportAs: 'xcuBadge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgeComponent {
  private _color: string;
  private _rounded: boolean = false;
  private _large: boolean = false;

  @Input()
  public get color(): string {
    return this._color;
  }

  public set color(value: string) {
    if (BADGE_COLORS.includes(value)) {
      (this._getHostElement() as HTMLElement).classList.remove(...BADGE_COLORS);
      (this._getHostElement() as HTMLElement).classList.add(value);
    }
  }

  @HostBinding('class.rounded')
  @Input()
  public get rounded(): any {
    return this._rounded;
  }

  public set rounded(value: any) {
    this._rounded = coerceBooleanProperty(value);
  }

  @HostBinding('class.large')
  @Input()
  public get large(): any {
    return this._large;
  }

  public set large(value: any) {
    this._large = coerceBooleanProperty(value);
  }

  public constructor(public elementRef: ElementRef) {}

  /** Gets whether the button has one of the given attributes. */
  private hasHostAttributes_(...attributes: string[]): boolean {
    return attributes.some((attribute) =>
      this._getHostElement().hasAttribute(attribute)
    );
  }

  private _getHostElement(): any {
    return this.elementRef.nativeElement;
  }
}
