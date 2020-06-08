import {
  CanOpenOnHoverCtor,
  mixinOpenOnHover,
} from './../common-behaviors/openOnHover';
import { HostListener, Input, HostBinding, ElementRef, Directive } from '@angular/core';

class XcuMenuBase {
  public constructor(public elementRef: ElementRef) {}
}

const XcuMenuBase_: CanOpenOnHoverCtor & typeof XcuMenuBase = mixinOpenOnHover(
  XcuMenuBase
);

@Directive()
export class HoverMenu extends XcuMenuBase_ {
  @HostBinding('class.menu--active')
  @Input()
  public isActive: boolean;

  @Input() public shouldShowArrow: boolean = true;
  @Input() public openOnHover: boolean;

  public constructor(public elementRef: ElementRef) {
    super(elementRef);
  }

  /**
   * If we're supposed to toggle on hover, set the active state to False
   * @param event
   */
  public onHoverOut(event: Event): void {
    if (!this.openOnHover) return;

    this.isActive = false;
  }
}
