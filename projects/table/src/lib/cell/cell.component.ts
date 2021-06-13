import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'xcu-simple-cell, td, td[xcu-simple-cell], div[xcu-simple-cell]',
  exportAs: 'xcuTableCell',
  host: {
    class: 'table-cell typography',
  },
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.None,
})
export class XcuSimpleCellComponent {
  @HostBinding('style.text-align')
  @Input()
  public justify: 'start' | 'end' = 'start';

  public constructor() {}
}
