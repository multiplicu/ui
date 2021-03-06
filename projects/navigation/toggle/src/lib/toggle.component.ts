import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import {
  coerceBooleanProperty,
  DOWN_ARROW,
  ENTER,
  ESCAPE,
  hasModifierKey,
  SPACE,
  UP_ARROW,
} from '@multiplicu/ui/core';

let nextUniqueId: number = 0;

@Component({
  selector: `xcu-nav-toggle, div[xcu-nav-toggle], button[xcu-nav-toggle], a[xcu-nav-toggle]`,
  exportAs: 'xcuNavToggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class XcuNavToggleComponent implements OnDestroy {
  protected _uid: string = `xcu-toggle-${nextUniqueId++}`;

  @Input() public isActive: boolean;
  @Input() public title: string;
  @Input() public href: string;
  @Input() public shouldShowArrow: boolean = true;
  @Input() public openOnHover: boolean = false;
  @Input() public parentEl: ElementRef;

  @Input()
  public get id(): string {
    return this._id;
  }
  public set id(value: string) {
    this._id = value || this._uid;
  }
  protected _id: string;

  @HostBinding('class.bordered')
  @Input()
  public get bordered(): any {
    return this._bordered;
  }

  public set bordered(value: any) {
    this._bordered = coerceBooleanProperty(value);
  }

  private _bordered: boolean = false;

  /** Event emitted when the menu is closed. */
  @Output()
  readonly toggled: EventEmitter<boolean> = new EventEmitter<boolean>();

  public constructor(public elementRef: ElementRef) {
    this.toggled
      .asObservable()
      .subscribe((active: boolean) => (this.isActive = active));

    this.id = this._uid;
  }

  public ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    this.toggled.complete();
  }

  @HostListener('document:keydown', ['$event'])
  public handleKeydown(event: KeyboardEvent): void {
    const keycode: number = event.keyCode;

    if (keycode === ESCAPE) {
      if (!hasModifierKey(event)) {
        event.preventDefault();
        this.toggled.emit(false);
      }
    }
  }

  @HostListener('document:click', ['$event'])
  public handleClick(event: Event): void {
    if (!this.isActive) return;

    if (
      !this.elementRef.nativeElement.contains(event.target as any) &&
      (!this.parentEl ||
        (this.parentEl &&
          !this.parentEl.nativeElement.contains(event.target as any)))
    ) {
      this.toggled.emit(false);
    }
  }

  @HostListener('touchend', ['$event'])
  public handleTouch(event: TouchEvent): void {
    // Only handle for the current toggle and prevent a touch click
    // when intending to open the menu.
    if (
      !this.isActive &&
      (this.elementRef.nativeElement.contains(event.target as any) ||
        this.elementRef.nativeElement.contains(event.target as any)
          .parentElement)
    ) {
      this.setActiveState(true);
      event.preventDefault();

      return;
    }
  }

  /**
   * If we're supposed to toggle on hover, set the active state to True
   * @param event
   */
  @HostListener('mouseenter', ['$event'])
  // @HostListener('touchstart', ['$event'])
  public onHover(event: Event): boolean {
    if (!this.openOnHover) return;

    return this.setActiveState(true);
  }

  public toggle(event: KeyboardEvent | MouseEvent): boolean {
    if (event instanceof KeyboardEvent) {
      switch (event.keyCode) {
        case DOWN_ARROW:
          return this.setActiveState(true);

        case UP_ARROW:
          return this.setActiveState(false);

        case SPACE:
        case ENTER:
          return this.setActiveState(!this.isActive);

        default:
          return;
      }
    }

    return this.setActiveState(!this.isActive);
  }

  private setActiveState(active: boolean): boolean {
    this.isActive = active;

    this.toggled.emit(this.isActive);

    return this.isActive;
  }
}
