import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'xcu-simple-head, th[xcu-simple-head], div[xcu-simple-head]',
  exportAs: 'xcuTableHead',
  host: {
    class: 'table-head typography',
    role: 'columnheader',
  },
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.None,
})
export class XcuSimpleHeadComponent {
  @HostBinding('style.text-align')
  @Input()
  public justify: 'start' | 'end' = 'start';

  public constructor() {}
}
