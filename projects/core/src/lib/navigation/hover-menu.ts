import {
  CanOpenOnHoverCtor,
  mixinOpenOnHover,
} from './../common-behaviors/openOnHover';
import {
  Input,
  HostBinding,
  ElementRef,
  Directive,
  Output,
  EventEmitter,
} from '@angular/core';

class XcuMenuBase {
  public constructor(public elementRef: ElementRef) {}
}

const _XcuMenuBase: CanOpenOnHoverCtor & typeof XcuMenuBase = mixinOpenOnHover(
  XcuMenuBase
);

@Directive()
export class HoverMenu extends _XcuMenuBase {
  @HostBinding('class.menu--active')
  @Input()
  public isActive: boolean;

  @Input() public shouldShowArrow: boolean = true;
  @Input() public openOnHover: boolean;

  @Output() public toggled: EventEmitter<boolean> = new EventEmitter<boolean>();

  public constructor(public elementRef: ElementRef) {
    super(elementRef);
  }

  /**
   * If we're supposed to toggle on hover, set the active state to False
   * @param event
   */
  public onHoverOut(event: Event): void {
    if (!this.openOnHover) return;

    this.close();
  }

  /**
   * Closes the menu and emits the toggled event to False
   *
   * @memberof HoverMenu
   */
  public close(): void {
    this.isActive = false;

    this.toggled.emit(false);
  }

  /**
   * Opens the menu and emits the toggled event to True
   *
   * @memberof HoverMenu
   */
  public open(): void {
    this.isActive = true;

    this.toggled.emit(true);
  }
}
