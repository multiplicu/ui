import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Injector,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  CanDisableCtor,
  coerceBooleanProperty,
  mixinDisabled,
} from '@multiplicu/ui/core';

/**
 * List of classes to add to XcuButton instances based on host attributes to
 * style as different variants.
 */
const BUTTON_HOST_ATTRIBUTES = [
  'xcu-button',
  'xcu-button--primary',
  'xcu-button--secondary',
  'xcu-button--outline',
  'xcu-button--tertiary',
  'xcu-button--warning',
  'xcu-button--raised',
  'xcu-button--anchor',
];

class XcuButtonBase {
  public constructor(public elementRef: ElementRef) {}
}

const _XcuButtonMixinBase: CanDisableCtor & typeof XcuButtonBase =
  mixinDisabled(XcuButtonBase);

@Component({
  selector: `button[xcu-button],
    button[xcu-button--primary],
    button[xcu-button--secondary],
    button[xcu-button--outline],
    button[xcu-button--tertiary],
    button[xcu-button--warning],
    button[xcu-button--raised],
    button[xcu-button--anchor]`,
  host: {
    type: 'button',
    class: 'xcu-button',
  },
  exportAs: 'xcuButton',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  // encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class XcuButtonComponent
  extends _XcuButtonMixinBase
  implements OnChanges
{
  @HostBinding('attr.disabled')
  public get isDisabled(): boolean {
    return this.disabled || null;
  }

  @Input() public disabled: boolean;

  @Input('loading')
  public get loading(): any {
    return this._loading;
  }

  public set loading(value: any) {
    this._loading = coerceBooleanProperty(value);
  }

  private _loading: boolean = false;

  public constructor(
    public elementRef: ElementRef,
    protected _injector: Injector
  ) {
    super(elementRef);

    // For each of the variant selectors that is present in the button's host
    // attributes, add the correct corresponding class.
    for (const attr of BUTTON_HOST_ATTRIBUTES) {
      if (this._hasHostAttributes(attr)) {
        (this._getHostElement() as HTMLElement).classList.add(attr);
      }
    }

    // Add a class that applies to all buttons. This makes it easier to target if somebody
    // wants to target all buttons. We do it here rather than `host` to ensure that
    // the class is applied to derived classes.
    elementRef.nativeElement.classList.add('xcu-button');

    // const ButtonElement: any = createCustomElement(XcuButtonComponent, {
    //   injector: this._injector,
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
  private _hasHostAttributes(...attributes: string[]): boolean {
    return attributes.some((attribute) =>
      this._getHostElement().hasAttribute(attribute)
    );
  }

  private _getHostElement(): any {
    return this.elementRef.nativeElement;
  }
}

@Component({
  selector: `a[xcu-button],
    a[xcu-button--primary],
    a[xcu-button--secondary],
    a[xcu-button--outline],
    a[xcu-button--tertiary],
    a[xcu-button--warning],
    a[xcu-button--raised],
    a[xcu-button--anchor]`,
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
    protected _injector: Injector
  ) {
    super(elementRef, _injector);
  }

  @HostListener('click', ['$event'])
  public haltDisabledEvents(event: Event): void {
    // A disabled button shouldn't apply any actions
    if (this.disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }
}
