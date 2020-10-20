import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  HostBinding,
  Input,
} from '@angular/core';
import { coerceBooleanProperty } from '@multiplicu/ui/core';

@Directive({
  selector: '[profile-name]',
})
export class XcuProfileName {}

@Directive({
  selector: '[profile-subtitle]',
})
export class XcuProfileSubtitle {}

@Directive({
  selector: '[profile-image]',
})
export class XcuProfileImage {}

@Component({
  selector: 'xcu-profile, div[xcu-profile], span[xcu-profile], a[xcu-profile]',
  exportAs: 'xcuProfile',
  host: {
    class: 'xcu-profile',
  },
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class XcuProfileComponent {
  @HostBinding('class.inline')
  @Input()
  public get inline(): any {
    return this._inline;
  }

  public set inline(value: any) {
    this._inline = coerceBooleanProperty(value);
  }

  private _inline: boolean = false;

  public constructor() {}
}
