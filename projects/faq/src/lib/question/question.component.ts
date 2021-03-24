import { Component, HostBinding, Input } from '@angular/core';
import { coerceBooleanProperty } from '@multiplicu/ui/core';

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

  @Input()
  public get isExpanded(): any {
    return this._isExpanded;
  }

  public set isExpanded(value: any) {
    this._isExpanded = coerceBooleanProperty(value);
  }

  private _isExpanded: boolean = false;

  public constructor() {}

  public toggle(): boolean {
    this.isExpanded = !this.isExpanded;

    return this.isExpanded;
  }
}
