import {
  Component,
  ChangeDetectionStrategy,
  HostBinding,
  Input,
} from '@angular/core';
import { coerceBooleanProperty } from '@multiplicu/ui/core';

@Component({
  selector: `xcu-faq, div[xcu-faq]`,
  exportAs: 'xcuFaq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqComponent {
  private isAccordion_: boolean;
  private isSideBySide_: boolean;
  private isTwoColumns_: boolean;

  @HostBinding('class.accordion')
  @Input()
  public get accordion(): any {
    return this.isAccordion_;
  }

  public set accordion(value: any) {
    this.isAccordion_ = coerceBooleanProperty(value);
  }

  @HostBinding('class.side-by-side')
  @Input('side-by-side')
  public get sideBySide(): any {
    return this.isSideBySide_;
  }

  public set sideBySide(value: any) {
    this.isSideBySide_ = coerceBooleanProperty(value);
  }

  @HostBinding('class.two-columns')
  @Input('two-columns')
  public get twoColumns(): any {
    return this.isTwoColumns_;
  }

  public set twoColumns(value: any) {
    this.isTwoColumns_ = coerceBooleanProperty(value);
  }

  public constructor() {}
}
