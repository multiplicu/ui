import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  Input,
  QueryList,
} from '@angular/core';
import { coerceNumberProperty } from '@multiplicu/ui/core';
import { XcuAvatarComponent } from './../avatar.component';

@Component({
  selector: `xcu-avatar-stack, div[xcu-avatar-stack]`,
  exportAs: 'xcuAvatarStack',
  templateUrl: './avatar-stack.component.html',
  styleUrls: ['./avatar-stack.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class XcuAvatarStackComponent implements AfterContentInit {
  /** The difference in the length of the list of avatars and the max number of avatars to show */
  public maxLengthDifference: number;

  /** Number of avatars to show before showing a "+ Count" */
  @Input()
  public get max(): number {
    return this._max;
  }
  public set max(value: number) {
    this._max = coerceNumberProperty(value);
  }
  private _max: number;

  @ContentChildren(XcuAvatarComponent)
  public avatars: QueryList<XcuAvatarComponent>;

  public constructor(
    public elementRef: ElementRef,
    private _changeDetector: ChangeDetectorRef
  ) {
    // Add a class that applies to all avatar stacks. This makes it easier to target if somebody
    // wants to target all avatar stacks. We do it here rather than `host` to ensure that
    // the class is applied to derived classes.
    elementRef.nativeElement.classList.add('xcu-avatar-stack');
  }

  public ngAfterContentInit(): void {
    if (this.max) {
      // Hide the avatars after the max length
      this.avatars.forEach((avatar: XcuAvatarComponent, index: number) => {
        if (index >= this.max) {
          avatar.hidden = true;
        }
      });

      // Show a counter with the length of the hidden avatars
      this.maxLengthDifference = this.avatars.length - this.max;

      this._changeDetector.detectChanges();
    }
  }
}
