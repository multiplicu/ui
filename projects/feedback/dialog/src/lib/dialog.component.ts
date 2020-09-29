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
  public get isOpen(): boolean {
    return this.dialogService.isOpen;
  }

  public constructor(public dialogService: DialogService) {}

  public open(): void {
    this.dialogService.open();
  }

  public close(): void {
    this.dialogService.close();
  }
}
