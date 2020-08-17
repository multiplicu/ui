import { Component, ChangeDetectionStrategy, Directive } from '@angular/core';

@Component({
  selector:
    'xcu-list-item, a[xcu-list-item], div[xcu-list-item], span[xcu-list-item]',
  exportAs: 'xcuListItem',
  host: {
    class: 'xcu-list-item',
  },
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class XcuListItemComponent {
  public constructor() {}
}
