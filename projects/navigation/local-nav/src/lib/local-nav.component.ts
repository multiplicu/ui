import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
} from '@angular/core';

import { NavLink } from '@multiplicu/ui/core';

/**
 * List of classes to add to XcuLocalNav instances based on host attributes to
 * style as different variants.
 */
const NAV_HOST_ATTRIBUTES = ['xcu-local-nav'];

@Component({
  selector: `xcu-local-nav, div[xcu-local-nav], ul[xcu-local-nav], nav[xcu-local-nav]`,
  exportAs: 'xcuLocalNav',
  templateUrl: './local-nav.component.html',
  styleUrls: ['./local-nav.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class XcuLocalNavComponent {
  @Input() public mobileNavTitle: string = 'Navigation';
  @Input() public links: NavLink[];
  @Input() public isActive: boolean;

  public constructor(public elementRef: ElementRef) {
    // For each of the variant selectors that is present in the button's host
    // attributes, add the correct corresponding class.
    for (const attr of NAV_HOST_ATTRIBUTES) {
      if (this.hasHostAttributes_(attr)) {
        (this._getHostElement() as HTMLElement).classList.add(attr);
      }
    }

    // Add a class that applies to all local navs. This makes it easier to target if somebody
    // wants to target all local navs. We do it here rather than `host` to ensure that
    // the class is applied to derived classes.
    elementRef.nativeElement.classList.add('xcu-local-nav');
  }

  public toggle(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    this.isActive = !this.isActive;
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
