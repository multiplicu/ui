import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'xcu-faq-question, div[xcu-faq-question], button[xcu-faq-question]',
  exportAs: 'xcuFaqQuestion',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent {
  @HostBinding('class.faq-question--accordion')
  @Input()
  public isAccordion: boolean = false;

  public isExpanded: boolean = false;

  public constructor() {}

  public toggle(): boolean {
    this.isExpanded = !this.isExpanded;

    return this.isExpanded;
  }
}
