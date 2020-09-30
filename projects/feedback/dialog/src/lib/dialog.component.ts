import { Component, HostBinding } from '@angular/core';
import { DialogService } from './dialog.service';

@Component({
  selector: 'xcu-dialog, [xcu-dialog]',
  exportAs: 'xcuDialog',
  host: {
    class: 'xcu-dialog',
  },
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class XcuDialogComponent {
  @HostBinding('class.xcu-dialog--open')
  public isOpen: boolean = false;

  public constructor(public dialogService: DialogService) {}

  public open(): void {
    this.isOpen = true;
  }

  public close(): void {
    this.isOpen = false;
  }
}
