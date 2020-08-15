import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'xcu-list, div[xcu-list], ul[xcu-list], nav[xcu-list]',
  exportAs: 'xcuList',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class XcuListComponent {
  public constructor() {}
}
