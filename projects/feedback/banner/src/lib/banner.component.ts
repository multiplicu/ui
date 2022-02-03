import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from '@angular/core';

import { coerceBooleanProperty } from '@multiplicu/ui/core';

@Component({
  selector: 'xcu-banner, [xcu-banner]',
  host: {
    class: 'xcu-banner',
    host: 'status',
    '[class.justify--start]': 'position === "start"',
    '[class.justify--end]': 'position === "end" || !position',
    '[class.inactive]': '!isActive',
  },
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class XcuBannerComponent {
  @Output()
  public afterDismissed: EventEmitter<void> = new EventEmitter<void>();

  @Input()
  public title: string;
  @Input()
  public shortTitle: string;

  /** Whether the banner should use a fit-content width. Defaults to 'false' */
  private _isFitWidth: boolean = false;

  @HostBinding('class.fit-width')
  @Input('fit-width')
  public get fitWidth(): any {
    return this._isFitWidth;
  }

  public set fitWidth(value: any) {
    this._isFitWidth = coerceBooleanProperty(value);
  }

  /** Whether the banner should be dismissible. Defaults to 'true' */
  private _isDismissible: boolean = true;

  @Input()
  public get dismissible(): any {
    return this._isDismissible;
  }

  public set dismissible(value: any) {
    this._isDismissible = coerceBooleanProperty(value);
  }

  /** Whether the banner should float instead of span the whole width. Defaults to 'false' */
  private _isFloating: boolean;

  @HostBinding('class.floating')
  @Input()
  public get floating(): any {
    return this._isFloating;
  }

  public set floating(value: any) {
    this._isFloating = coerceBooleanProperty(value);
  }

  /** Whether the banner should stick to the page on scroll. Defaults to 'false' */
  private _isSticky: boolean;

  @HostBinding('class.sticky')
  @Input()
  public get sticky(): any {
    return this._isSticky;
  }

  public set sticky(value: any) {
    this._isSticky = coerceBooleanProperty(value);
  }

  /** Whether the banner should appear at the start or end of the page. Defaults to 'end' */
  private _position: 'start' | 'end' = 'end';

  /** Whether the banner should appear at the start or end of the page. Defaults to 'end' */
  @Input()
  public get position(): 'start' | 'end' {
    return this._position;
  }
  public set position(v: 'start' | 'end') {
    this._position = v === 'start' ? 'start' : 'end';

    const positionClasses: string[] = ['justify--start', 'justify--end'];

    (this._getHostElement() as HTMLElement).classList.remove(
      ...positionClasses
    );
    (this._getHostElement() as HTMLElement).classList.add(`justify--${v}`);
  }

  public isActive: boolean = true;
  @HostBinding('class.is-banner-dismissed')
  public isDismissed: boolean = false;

  public constructor(public elementRef: ElementRef) {
    this.elementRef.nativeElement.addEventListener(
      'animationend',
      (event: AnimationEvent) => {
        if (event.animationName === 'xcu-banner-out') {
          this.isActive = false;

          this.afterDismissed.emit();
        }
      }
    );
  }

  public dismiss(): void {
    this.isDismissed = true;
  }

  private _getHostElement(): any {
    return this.elementRef.nativeElement;
  }
}
