import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  @Output()
  public onClose: EventEmitter<void> = new EventEmitter<void>();
  @Output()
  public onOpen: EventEmitter<void> = new EventEmitter<void>();

  public isOpen: boolean;

  public constructor() {}

  public open(): void {
    this.isOpen = true;

    this.onOpen.emit();
  }

  public close(): void {
    this.isOpen = false;

    this.onClose.emit();
  }
}
