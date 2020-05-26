import { Component, ChangeDetectionStrategy, ElementRef } from '@angular/core';

@Component({
  selector: `xcu-avatar-stack, div[xcu-avatar-stack]`,
  exportAs: 'xcuAvatarStack',
  templateUrl: './avatar-stack.component.html',
  styleUrls: ['./avatar-stack.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarStackComponent {
  public constructor(public elementRef: ElementRef) {
    // Add a class that applies to all avatar stacks. This makes it easier to target if somebody
    // wants to target all avatar stacks. We do it here rather than `host` to ensure that
    // the class is applied to derived classes.
    elementRef.nativeElement.classList.add('xcu-avatar-stack');
  }
}
