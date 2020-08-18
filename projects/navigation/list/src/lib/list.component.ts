import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import { coerceBooleanProperty } from '@multiplicu/ui/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'xcu-list, div[xcu-list], ul[xcu-list], nav[xcu-list]',
  exportAs: 'xcuList',
  host: {
    class: 'xcu-list',
  },
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class XcuListComponent implements OnChanges, OnDestroy {
  private divided_: boolean = false;

  @HostBinding('class.divided')
  @Input()
  public get divided(): any {
    return this.divided_;
  }

  public set divided(value: any) {
    this.divided_ = coerceBooleanProperty(value);
  }

  private _stateChanges: Subject<void> = new Subject<void>();

  public constructor() {}

  public ngOnChanges(): void {
    this._stateChanges.next();
  }

  public ngOnDestroy(): void {
    this._stateChanges.complete();
  }
}
