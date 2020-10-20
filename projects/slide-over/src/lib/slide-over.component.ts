import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
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
  // Close button position
  @Input()
  public closePosition: 'OUTSIDE' | 'INSIDE' = 'INSIDE';

  // Open
  private _open: boolean = false;

  @HostBinding('class.open')
  @Input()
  public get open(): any {
    return this._open;
  }

  public set open(value: any) {
    this._open = coerceBooleanProperty(value);
  }

  // Wide
  private _wide: boolean = false;

  @HostBinding('class.wide')
  @Input()
  public get wide(): any {
    return this._wide;
  }

  public set wide(value: any) {
    this._wide = coerceBooleanProperty(value);
  }

  // Overlay
  private _overlay: boolean = false;

  @HostBinding('class.overlay')
  @Input()
  public get overlay(): any {
    return this._overlay;
  }

  public set overlay(value: any) {
    this._overlay = coerceBooleanProperty(value);
  }

  // Outputs
  @Output()
  public onClose: EventEmitter<void> = new EventEmitter<void>();
  @Output()
  public onOpen: EventEmitter<void> = new EventEmitter<void>();

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

    // Emit output events based on the new state
    this.open ? this._onOpen() : this._onClose();

    return state;
  }

  private _onClose(): void {
    this.onClose.emit();
  }

  private _onOpen(): void {
    this.onOpen.emit();
  }
}
