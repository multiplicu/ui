import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  HostBinding,
  Input,
  QueryList,
  ViewEncapsulation,
} from '@angular/core';
import { startWith } from 'rxjs/operators';
import { XcuHint } from './../objects/hint';

@Component({
  selector: 'xcu-form-field, div[xcu-form-field]',
  exportAs: 'xcuFormField',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class XcuFormFieldComponent implements AfterContentInit {
  @HostBinding('class')
  public class: string = 'xcu-form-field';

  public required_: boolean;
  @HostBinding('class.required')
  @Input('required')
  public get required(): boolean {
    return this.required_;
  }
  public set required(v: boolean) {
    this.required_ = v || v !== undefined;
  }

  public optional_: boolean;
  @HostBinding('class.optional')
  @Input('optional')
  public get optional(): boolean {
    return this.optional_;
  }
  public set optional(v: boolean) {
    this.optional_ = v || v !== undefined;
  }

  @ContentChildren(XcuHint, { descendants: true }) _hintChildren: QueryList<
    XcuHint
  >;

  // public get displayedMessages(): 'error' | 'hint' {}

  public constructor(public elementRef: ElementRef) {}

  public ngAfterContentInit(): void {
    this._hintChildren.changes.pipe(startWith(null)).subscribe(() => {
      // console.log(this._hintChildren);
    });
  }
}
