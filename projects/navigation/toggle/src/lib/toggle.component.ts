import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { ESCAPE, hasModifierKey } from '@multiplicu/ui/core';

@Component({
  selector: `xcu-nav-toggle, div[xcu-nav-toggle], button[xcu-nav-toggle], a[xcu-nav-toggle]`,
  exportAs: 'xcuNavToggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class XcuNavToggleComponent implements OnDestroy {
  @Input()
  public isActive: boolean;
  @Input() public title: string;
  @Input() public shouldShowArrow: boolean = true;

  /** Event emitted when the menu is closed. */
  @Output() readonly toggled: EventEmitter<boolean> = new EventEmitter<
    boolean
  >();

  public constructor(public elementRef: ElementRef) {
    this.toggled
      .asObservable()
      .subscribe((active: boolean) => (this.isActive = active));
  }

  public ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    this.toggled.complete();
  }

  @HostListener('document:keydown', ['$event'])
  public handleKeydown(event: KeyboardEvent): void {
    const keycode: number = event.keyCode;

    if (keycode === ESCAPE) {
      if (!hasModifierKey(event)) {
        event.preventDefault();
        this.toggled.emit(false);
      }
    }
  }

  @HostListener('document:click', ['$event'])
  public handleClick(event: Event): void {
    if (!this.isActive) return;

    if ((event.target as any).parentElement !== this.elementRef.nativeElement) {
      this.toggled.emit(false);
    }
  }

  public toggle(event: Event): boolean {
    this.isActive = !this.isActive;

    this.toggled.emit(this.isActive);

    return this.isActive;
  }
}
