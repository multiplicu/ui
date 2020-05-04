import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
} from '@angular/core';
import { HoverMenu, NavLink } from '@multiplicu/ui/core';

/**
 * List of classes to add to XcuSwitcher instances based on host attributes to
 * style as different variants.
 */
const SWITCHER_HOST_ATTRIBUTES = ['xcu-switcher'];

@Component({
  selector:
    'xcu-switcher, div[xcu-switcher], ul[xcu-switcher], nav[xcu-switcher]',
  exportAs: 'xcuSwitcher',
  templateUrl: './switcher.component.html',
  styleUrls: ['./switcher.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class XcuSwitcherComponent extends HoverMenu {
  @Input() public openOnHover: boolean;
  @Input() public link: NavLink;
  @Input() public shouldShowArrow: boolean = true;

  public constructor(public elementRef: ElementRef) {
    super(elementRef);

    // For each of the variant selectors that is present in the button's host
    // attributes, add the correct corresponding class.
    for (const attr of SWITCHER_HOST_ATTRIBUTES) {
      if (this.hasHostAttributes_(attr)) {
        (this.getHostElement_() as HTMLElement).classList.add(attr);
      }
    }

    // Add a class that applies to all switchers. This makes it easier to target if somebody
    // wants to target all switchers. We do it here rather than `host` to ensure that
    // the class is applied to derived classes.
    elementRef.nativeElement.classList.add('xcu-switcher');
  }

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
