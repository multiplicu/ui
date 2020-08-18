import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector:
    'xcu-list-item-content, xcuListItemContent, [xcu-list-item-content], [xcuListItemContent]',
  host: {
    class: 'xcu-list-item-content',
  },
  templateUrl: './list-item-content.component.html',
  styleUrls: ['./list-item-content.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class XcuListItemContentComponent {
  public constructor() {}
}
