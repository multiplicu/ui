import { Component, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'xcu-toast, aside[xcu-toast]',
  host: {
    class: 'xcu-toast',
    role: 'status',
  },
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent {
  @Input()
  public title: string;

  @Input()
  public body: string;

  @Input()
  public get type(): 'info' | 'success' | 'caution' | 'danger' {
    return this._type;
  }

  public set type(value: 'info' | 'success' | 'caution' | 'danger') {
    this._type = value;

    const typeClasses: string[] = [
      'type--info',
      'type--success',
      'type--caution',
      'type--danger',
    ];

    (this._getHostElement() as HTMLElement).classList.remove(...typeClasses);
    (this._getHostElement() as HTMLElement).classList.add(
      `xcu-toast--${value}`
    );
  }

  public isActive: boolean = true;
  public isDismissed: boolean = false;

  private _type: 'info' | 'success' | 'caution' | 'danger' = 'info';

  public constructor(public elementRef: ElementRef) {}

  public dismiss(): void {
    this.isDismissed = true;

    this.elementRef = null;
  }

  private _getHostElement(): any {
    return this.elementRef.nativeElement;
  }
}
