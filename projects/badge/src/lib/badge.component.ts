import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: `xcu-badge, div[xcu-badge], span[xcu-badge]`,
  exportAs: 'xcuBadge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgeComponent {
  public constructor() {}
}
