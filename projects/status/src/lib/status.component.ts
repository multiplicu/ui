import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
} from '@angular/core';

const STATUS_COLORS: string[] = [
  'gray',
  'red',
  'orange',
  'yellow',
  'green',
  'teal',
  'blue',
  'indigo',
  'purple',
  'pink',
  'success',
  'error',
  'warning',
  'info',
  'primary',
  'secondary',
];

@Component({
  selector: `xcu-status, div[xcu-status], span[xcu-status]`,
  exportAs: 'xcuStatus',
  host: {
    class: 'xcu-status',
  },
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class XcuStatusComponent {
  private _color: string;

  @Input()
  public get color(): string {
    return this._color;
  }

  public set color(value: string) {
    if (STATUS_COLORS.includes(value)) {
      (this._getHostElement() as HTMLElement).classList.remove(
        ...STATUS_COLORS
      );
      (this._getHostElement() as HTMLElement).classList.add(value);
    }
  }

  public constructor(public elementRef: ElementRef) {}

  private _getHostElement(): any {
    return this.elementRef.nativeElement;
  }
}
