import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FaqComponent } from './faq.component';
import { QuestionComponent } from './question/question.component';

@NgModule({
  declarations: [FaqComponent, QuestionComponent],
  imports: [CommonModule],
  exports: [FaqComponent, QuestionComponent],
})
export class XcuFaqModule {}
