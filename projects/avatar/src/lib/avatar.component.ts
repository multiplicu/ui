import {
  Component,
  ChangeDetectionStrategy,
  HostBinding,
  ElementRef,
  Input,
} from '@angular/core';
import { coerceBooleanProperty } from '@multiplicu/ui/core';

@Component({
  selector: `xcu-avatar, div[xcu-avatar], span[xcu-avatar], img[xcu-avatar]`,
  exportAs: 'xcuAvatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class XcuAvatarComponent {
  @Input() public imageUrl: string;
  @Input() public alt: string = '';

  private _notificationPosition: 'top' | 'bottom' = 'top';
  @Input()
  public get notificationPosition(): 'top' | 'bottom' {
    return this._notificationPosition;
  }
  public set notificationPosition(value: 'top' | 'bottom') {
    this._notificationPosition = value;

    (this._getHostElement() as HTMLElement).classList.remove(
      ...['dot--top', 'dot--bottom']
    );
    (this._getHostElement() as HTMLElement).classList.add(`dot--${value}`);
  }

  private _size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
  private _hidden: boolean = false;
  private _highlight: boolean = false;
  private _rounded: boolean = false;
  private _hasNotification: boolean = false;

  @Input()
  public get size(): 'xs' | 'sm' | 'md' | 'lg' | 'xl' {
    return this._size;
  }

  public set size(value: 'xs' | 'sm' | 'md' | 'lg' | 'xl') {
    this._size = value;

    const sizeClasses: string[] = [
      'size--xs',
      'size--sm',
      'size--md',
      'size--lg',
      'size--xl',
    ];

    (this._getHostElement() as HTMLElement).classList.remove(...sizeClasses);
    (this._getHostElement() as HTMLElement).classList.add(`size--${value}`);
  }

  @HostBinding('class.highlight')
  @Input()
  public get highlight(): any {
    return this._highlight;
  }

  public set highlight(value: any) {
    this._highlight = coerceBooleanProperty(value);
  }

  @HostBinding('class.rounded')
  @Input()
  public get rounded(): any {
    return this._rounded;
  }

  public set rounded(value: any) {
    this._rounded = coerceBooleanProperty(value);
  }

  @Input()
  public get hasNotification(): any {
    return this._hasNotification;
  }

  public set hasNotification(value: any) {
    this._hasNotification = coerceBooleanProperty(value);
  }

  @HostBinding('class.hidden')
  @Input()
  public get hidden(): any {
    return this._hidden;
  }

  public set hidden(value: any) {
    this._hidden = coerceBooleanProperty(value);
  }

  public get sizeInPixels(): string {
    switch (this.size) {
      case 'xs':
        return '24';
      case 'sm':
        return '32';
      case 'md':
        return '40';
      case 'lg':
        return '48';
      case 'xl':
        return '56';

      default:
        break;
    }
  }

  public constructor(public elementRef: ElementRef) {}

  private _getHostElement(): any {
    return this.elementRef.nativeElement;
  }
}
