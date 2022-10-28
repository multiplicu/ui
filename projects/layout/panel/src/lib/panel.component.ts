import { Component, ElementRef, HostBinding, Input } from '@angular/core';
import { coerceBooleanProperty } from '@multiplicu/ui/core';

@Component({
  selector: 'xcu-panel, [xcu-panel]',
  exportAs: 'xcuPanel',
  host: {
    class: 'xcu-panel',
  },
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
})
export class XcuPanelComponent {
  private _depth: 'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl' = 'md';
  private _bordered: boolean = false;
  private _well: boolean = false;
  private _wellOnGray: boolean = false;

  @Input()
  public get depth(): 'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl' {
    return this._depth;
  }

  public set depth(value: 'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl') {
    this._depth = value;

    const depthClasses: string[] = [
      'depth--xs',
      'depth--sm',
      'depth--base',
      'depth--md',
      'depth--lg',
      'depth--xl',
      'depth--2xl',
    ];

    (this._getHostElement() as HTMLElement).classList.remove(...depthClasses);
    (this._getHostElement() as HTMLElement).classList.add(`depth--${value}`);
  }

  @HostBinding('class.bordered')
  @Input()
  public get bordered(): any {
    return this._bordered;
  }

  public set bordered(value: any) {
    this._bordered = coerceBooleanProperty(value);
  }

  @HostBinding('class.well')
  @Input()
  public get well(): any {
    return this._well;
  }

  public set well(value: any) {
    this._well = coerceBooleanProperty(value);
  }

  @HostBinding('class.well-on-gray')
  @Input()
  public get wellOnGray(): any {
    return this._wellOnGray;
  }

  public set wellOnGray(value: any) {
    this._wellOnGray = coerceBooleanProperty(value);
  }

  public constructor(public elementRef: ElementRef) {}

  private _getHostElement(): any {
    return this.elementRef.nativeElement;
  }
}
