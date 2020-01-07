import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Injector,
  Input,
  ViewEncapsulation,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CanDisableCtor, mixinDisabled } from '@multiplicu/core';

/**
 * List of classes to add to XcuButton instances based on host attributes to
 * style as different variants.
 */
const BUTTON_HOST_ATTRIBUTES = [
  'xcu-button',
  'xcu-button--primary',
  'xcu-button--secondary',
  'xcu-button--tertiary',
];

class XcuButtonBase {
  public constructor(public elementRef: ElementRef) {}
}

const XcuButtonMixinBase_: CanDisableCtor &
  typeof XcuButtonBase = mixinDisabled(XcuButtonBase);

@Component({
  selector: `button[xcu-button],
    button[xcu-button--primary],
    button[xcu-button--secondary],
    button[xcu-button--tertiary]`,
  exportAs: 'xcuButton',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  // encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class XcuButtonComponent extends XcuButtonMixinBase_
  implements OnChanges {
  @HostBinding('attr.disabled')
  public get isDisabled(): boolean {
    return this.disabled || null;
  }

  @Input() public disabled: boolean;

  public constructor(
    public elementRef: ElementRef,
    protected injector_: Injector
  ) {
    super(elementRef);

    // For each of the variant selectors that is present in the button's host
    // attributes, add the correct corresponding class.
    for (const attr of BUTTON_HOST_ATTRIBUTES) {
      if (this.hasHostAttributes_(attr)) {
        (this.getHostElement_() as HTMLElement).classList.add(attr);
      }
    }

    // Add a class that applies to all buttons. This makes it easier to target if somebody
    // wants to target all buttons. We do it here rather than `host` to ensure that
    // the class is applied to derived classes.
    elementRef.nativeElement.classList.add('xcu-button');

    // const ButtonElement: any = createCustomElement(XcuButtonComponent, {
    //   injector: this.injector_,
    // });
    // customElements.define('xcu-button', ButtonElement);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    // if (changes.disabled) {
    //   this.disabled = changes.disabled.currentValue;
    //   console.log(this.disabled);
    // }
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

@Component({
  selector: `a[xcu-button],
    a[xcu-button--primary],
    a[xcu-button--secondary],
    a[xcu-button--tertiary]`,
  exportAs: 'xcuButton, xcuAnchor',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  // encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class XcuAnchorComponent extends XcuButtonComponent {
  @Input() public tabIndex: number;

  @HostBinding('attr.disabled')
  public get isDisabled(): boolean {
    return this.disabled || null;
  }

  @HostBinding('attr.aria-disabled')
  public get ariaDisabled(): string {
    return this.disabled.toString();
  }

  @HostBinding('attr.tabindex')
  public get tabindex(): number {
    return this.disabled ? -1 : this.tabIndex || 0;
  }

  public constructor(
    public elementRef: ElementRef,
    protected injector_: Injector
  ) {
    super(elementRef, injector_);
  }

  @HostListener('click')
  private haltDisabledEvents_(event: Event): void {
    // A disabled button shouldn't apply any actions
    if (this.disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }
}
