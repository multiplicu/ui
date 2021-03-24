import { Directive, HostBinding, Input } from '@angular/core';
import { coerceBooleanProperty } from '@multiplicu/ui/core';

@Directive({
  selector: '[xcu-affix]',
})
export class XcuAffix {
  public _dropdown: boolean;
  @HostBinding('class.dropdown')
  @Input()
  public get dropdown(): any {
    return this._dropdown;
  }

  public set dropdown(value: any) {
    this._dropdown = coerceBooleanProperty(value);
  }

  public _inline: boolean;
  @HostBinding('class.inline')
  @Input()
  public get inline(): any {
    return this._inline;
  }

  public set inline(value: any) {
    this._inline = coerceBooleanProperty(value);
  }
}
