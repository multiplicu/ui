import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnInit,
} from '@angular/core';
import { coerceBooleanProperty } from '@multiplicu/ui/core';

@Component({
  selector: 'xcu-slide-over, div[xcu-slide-over], nav[xcu-slide-over]',
  exportAs: 'xcuSlideOver',
  host: {
    class: 'xcu-slide-over',
  },
  templateUrl: './slide-over.component.html',
  styleUrls: ['./slide-over.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class XcuSlideOverComponent {
  // Open
  private open_: boolean = false;

  @HostBinding('class.open')
  @Input()
  public get open(): any {
    return this.open_;
  }

  public set open(value: any) {
    this.open_ = coerceBooleanProperty(value);
  }

  // Wide
  private wide_: boolean = false;

  @HostBinding('class.wide')
  @Input()
  public get wide(): any {
    return this.wide_;
  }

  public set wide(value: any) {
    this.wide_ = coerceBooleanProperty(value);
  }

  // Overlay
  private overlay_: boolean = false;

  @HostBinding('class.overlay')
  @Input()
  public get overlay(): any {
    return this.overlay_;
  }

  public set overlay(value: any) {
    this.overlay_ = coerceBooleanProperty(value);
  }

  public constructor() {}

  /**
   * Toggles the open state
   *
   * @returns {boolean} Returns the open state after toggling
   * @memberof XcuSlideOverComponent
   */
  public toggle(): boolean {
    return this.setOpen(!this.open);
  }

  /**
   * Sets the open state to then given value
   *
   * @param {boolean} state The state of openness we are setting the slide-over to
   * @returns {boolean} Returns the open state after being set
   * @memberof XcuSlideOverComponent
   */
  public setOpen(state: boolean): boolean {
    this.open = state;

    return state;
  }
}
