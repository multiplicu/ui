import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'input[xcu-input], textarea[xcu-input]',
  exportAs: 'xcuInput',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class XcuInputComponent {
  public constructor() {}
}
