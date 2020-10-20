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

  private _isAccordion: boolean;
  private _isSideBySide: boolean;
  private _isTwoColumns: boolean;

  @HostBinding('class.accordion')
  @Input()
  public get accordion(): any {
    return this._isAccordion;
  }

  public set accordion(value: any) {
    this._isAccordion = coerceBooleanProperty(value);
  }

  @HostBinding('class.side-by-side')
  @Input('side-by-side')
  public get sideBySide(): any {
    return this._isSideBySide;
  }

  public set sideBySide(value: any) {
    this._isSideBySide = coerceBooleanProperty(value);
  }

  @HostBinding('class.two-columns')
  @Input('two-columns')
  public get twoColumns(): any {
    return this._isTwoColumns;
  }

  public set twoColumns(value: any) {
    this._isTwoColumns = coerceBooleanProperty(value);
  }

  public constructor() {}

  public ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    if (this._isAccordion) {
      this.questions
        .toArray()
        .forEach((question: QuestionComponent) =>
          setTimeout(() => (question.isAccordion = true), 0)
        );
    }
  }
}
