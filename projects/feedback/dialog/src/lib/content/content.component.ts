import { Component, ContentChildren, QueryList } from '@angular/core';

@Component({
  selector: 'xcu-dialog-content, [xcu-dialog-content]',
  exportAs: 'xcuDialogContent',
  host: {
    class: 'xcu-dialog-content',
  },
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class XcuDialogContentComponent {
  @ContentChildren('icon')
  public icons: QueryList<any>;

  public constructor() {}
}
