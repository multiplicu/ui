import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  HostBinding,
  Output,
  EventEmitter,
  OnDestroy,
  HostListener,
} from '@angular/core';
import { NavLink, ESCAPE, hasModifierKey } from '@multiplicu/ui/core';

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
export class XcuSwitcherComponent implements OnDestroy {
  @HostBinding('class.xcu-switcher--active')
  @Input()
  public isActive: boolean;
  @Input() public link: NavLink;
  @Input() public shouldShowArrow: boolean = true;

  /** Event emitted when the menu is closed. */
  @Output() readonly closed: EventEmitter<
    void | 'click' | 'keydown' | 'tab'
  > = new EventEmitter<void | 'click' | 'keydown' | 'tab'>();

  public constructor(public elementRef: ElementRef) {
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

  public ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    this.closed.complete();
  }

  @HostListener('document:keydown', ['$event'])
  public handleKeydown(event: KeyboardEvent): void {
    const keycode: number = event.keyCode;

    if (keycode === ESCAPE) {
      if (!hasModifierKey(event)) {
        event.preventDefault();
        this.closed.emit('keydown');
      }
    }
  }

  @HostListener('document:click', ['$event'])
  public handleClick(event: Event): void {
    if (event.target !== this.elementRef.nativeElement) {
      this.closed.emit('click');
    }
  }

  public toggle(event: Event): boolean {
    event.preventDefault();
    event.stopPropagation();

    this.isActive = !this.isActive;

    if (this.isActive) {
      this.closed.asObservable().subscribe(() => (this.isActive = false));
    }

    return this.isActive;
  }

  /** Gets whether the button has one of the given attributes. */
  private hasHostAttributes_(...attributes: string[]): boolean {
    return attributes.some(attribute =>
      this.getHostElement_().hasAttribute(attribute)
    );
  }

  private getHostElement_(): any {
    return this.elementRef.nativeElement;
  }
}