import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
} from '@angular/core';
import { NavLink } from '@multiplicu/ui/core';

/**
 * List of classes to add to XcuPageNav instances based on host attributes to
 * style as different variants.
 */
const NAV_HOST_ATTRIBUTES = ['xcu-page-nav'];

@Component({
  selector: `xcu-page-nav, div[xcu-page-nav], ul[xcu-page-nav], nav[xcu-page-nav]`,
  exportAs: 'xcuPageNav',
  templateUrl: './page-nav.component.html',
  styleUrls: ['./page-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class XcuPageNavComponent {
  @Input() public links: NavLink[];

  public constructor(public elementRef: ElementRef) {
    // For each of the variant selectors that is present in the button's host
    // attributes, add the correct corresponding class.
    for (const attr of NAV_HOST_ATTRIBUTES) {
      if (this.hasHostAttributes_(attr)) {
        (this._getHostElement() as HTMLElement).classList.add(attr);
      }
    }

    // Add a class that applies to all page navs. This makes it easier to target if somebody
    // wants to target all page navs. We do it here rather than `host` to ensure that
    // the class is applied to derived classes.
    elementRef.nativeElement.classList.add('xcu-page-nav');
  }

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
