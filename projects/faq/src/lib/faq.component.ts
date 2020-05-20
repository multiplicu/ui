import {
  Component,
  ChangeDetectionStrategy,
  HostBinding,
  Input,
  ContentChildren,
  QueryList,
  AfterViewInit,
} from '@angular/core';
import { coerceBooleanProperty } from '@multiplicu/ui/core';
import { QuestionComponent } from './question/question.component';

@Component({
  selector: `xcu-faq, div[xcu-faq]`,
  exportAs: 'xcuFaq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqComponent implements AfterViewInit {
  @ContentChildren(QuestionComponent) questions: QueryList<QuestionComponent>;

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

  public ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    if (this.isAccordion_) {
      this.questions
        .toArray()
        .forEach((question: QuestionComponent) =>
          setTimeout(() => (question.isAccordion = true), 0)
        );
    }
  }
}
