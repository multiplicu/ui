import { FaqQuestion } from './../_interfaces/faq-question';
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { coerceBooleanProperty } from '@multiplicu/ui/core';

@Component({
  selector: 'xcu-faq-question, div[xcu-faq-question], button[xcu-faq-question]',
  exportAs: 'xcuFaqQuestion',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionComponent {
  @Input() public question: FaqQuestion;

  private isExpanded_: boolean = false;

  public constructor() {}
}
