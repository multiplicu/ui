import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  HostBinding,
  ElementRef,
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
  private color_: string;
  private rounded_: boolean = false;
  private large_: boolean = false;

  @Input()
  public get color(): string {
    return this.color_;
  }

  public set color(value: string) {
    if (BADGE_COLORS.includes(value)) {
      (this.getHostElement_() as HTMLElement).classList.remove(...BADGE_COLORS);
      (this.getHostElement_() as HTMLElement).classList.add(value);
    }
  }

  @HostBinding('class.rounded')
  @Input()
  public get rounded(): any {
    return this.rounded_;
  }

  public set rounded(value: any) {
    this.rounded_ = coerceBooleanProperty(value);
  }

  @HostBinding('class.large')
  @Input()
  public get large(): any {
    return this.large_;
  }

  public set large(value: any) {
    this.large_ = coerceBooleanProperty(value);
  }

  public constructor(public elementRef: ElementRef) {}

  /** Gets whether the button has one of the given attributes. */
  private hasHostAttributes_(...attributes: string[]): boolean {
    return attributes.some((attribute) =>
      this.getHostElement_().hasAttribute(attribute)
    );
  }

  private getHostElement_(): any {
    return this.elementRef.nativeElement;
  }
}
