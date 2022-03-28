import { Component, HostBinding, OnDestroy } from '@angular/core';

import { DialogService } from './dialog.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'xcu-dialog, [xcu-dialog]',
  exportAs: 'xcuDialog',
  host: {
    class: 'xcu-dialog',
  },
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class XcuDialogComponent implements OnDestroy {
  @HostBinding('class.xcu-dialog--open')
  public isOpen: boolean = false;

  private _subs: Subscription[] = [];

  public constructor(public dialogService: DialogService) {
    this._subs.push(
      this.dialogService.onOpen.subscribe(() => (this.isOpen = true)),
      this.dialogService.onClose.subscribe(() => (this.isOpen = false))
    );
  }

  public ngOnDestroy(): void {
    this._subs.forEach((sub: Subscription) => sub.unsubscribe());
  }

  public open(): void {
    this.dialogService.open();
  }

  public close(): void {
    this.dialogService.close();
  }
}
