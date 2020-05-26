import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: `xcu-snackbar, div[xcu-snackbar]`,
  exportAs: 'xcuSnackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'xcu-snackbar',
  },
})
export class SnackbarComponent {
  @Input() public data: { message: string; action: string };

  public get hasAction(): boolean {
    return !!this.data.action;
  }

  public constructor() {}

  public action(): void {
    // this.
  }
}
