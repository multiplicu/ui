import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
@Component({
  selector: 'xcu-simple-table, table[xcu-simple-table], div[xcu-simple-table]',
  exportAs: 'xcuSimpleTable',
  host: {
    class: 'xcu-table',
  },
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.None,
})
export class XcuSimpleTableComponent {
  public constructor() {}
}
