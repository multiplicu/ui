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
export class AvatarComponent {
  @Input() public imageUrl: string;
  @Input() public alt: string = '';

  private _notificationPosition: 'top' | 'bottom' = 'top';
  @Input()
  public get notificationPosition(): 'top' | 'bottom' {
    return this._notificationPosition;
  }
  public set notificationPosition(value: 'top' | 'bottom') {
    this._notificationPosition = value;

    (this.getHostElement_() as HTMLElement).classList.remove(
      ...['dot--top', 'dot--bottom']
    );
    (this.getHostElement_() as HTMLElement).classList.add(`dot--${value}`);
  }

  private size_: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
  private rounded_: boolean = false;
  private hasNotification_: boolean = false;

  @Input()
  public get size(): 'xs' | 'sm' | 'md' | 'lg' | 'xl' {
    return this.size_;
  }

  public set size(value: 'xs' | 'sm' | 'md' | 'lg' | 'xl') {
    this.size_ = value;

    const sizeClasses: string[] = [
      'size--xs',
      'size--sm',
      'size--md',
      'size--lg',
      'size--xl',
    ];

    (this.getHostElement_() as HTMLElement).classList.remove(...sizeClasses);
    (this.getHostElement_() as HTMLElement).classList.add(`size--${value}`);
  }

  @HostBinding('class.rounded')
  @Input()
  public get rounded(): any {
    return this.rounded_;
  }

  public set rounded(value: any) {
    this.rounded_ = coerceBooleanProperty(value);
  }

  @Input()
  public get hasNotification(): any {
    return this.hasNotification_;
  }

  public set hasNotification(value: any) {
    this.hasNotification_ = coerceBooleanProperty(value);
  }

  public constructor(public elementRef: ElementRef) {}

  private getHostElement_(): any {
    return this.elementRef.nativeElement;
  }
}
