import { Component } from '@angular/core';

@Component({
  selector: 'xcu-dialog-headline, [xcu-dialog-headline]',
  exportAs: 'xcuDialogHeadline',
  host: {
    id: 'dialog-headline',
  },
  templateUrl: './headline.component.html',
  styleUrls: ['./headline.component.scss'],
})
export class XcuDialogHeadlineComponent {
  public constructor() {}
}
