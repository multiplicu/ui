import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Directive,
  HostBinding,
  HostListener,
  Input,
} from '@angular/core';

@Directive({
  selector: 'xcu-list-subheader, XcuListSubheader',
  host: {
    class: 'xcu-list-subheader',
  },
})
export class XcuListSubheader {
  @HostBinding('class.collapsed')
  @Input()
  public isCollapsed: boolean = false;

  @HostListener('click', ['$event.target'])
  public toggleCollapse(): boolean {
    this.isCollapsed = !this.isCollapsed;

    return this.isCollapsed;
  }
}

@Component({
  selector: 'xcu-list-group, div[xcu-list-group]',
  exportAs: 'xcuListGroup',
  host: {
    class: 'xcu-list-group',
  },
  templateUrl: './list-group.component.html',
  styleUrls: ['./list-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class XcuListGroupComponent {
  private _dense: boolean = false;

  @HostBinding('class.dense')
  @Input()
  public get dense(): any {
    return this._dense;
  }

  @ContentChild(XcuListSubheader)
  public header!: XcuListSubheader;

  public constructor() {}
}
