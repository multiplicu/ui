import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: `xcu-avatar-stack, div[xcu-avatar-stack]`,
  exportAs: 'xcuAvatarStack',
  templateUrl: './avatar-stack.component.html',
  styleUrls: ['./avatar-stack.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarStackComponent {
  public constructor() {}
}
