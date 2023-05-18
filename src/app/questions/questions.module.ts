import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionsPageComponent } from './features/questions-page/questions-page.component';
import { SharedModule } from '../shared/shared.module';
import { QuestionComponent } from './ui/question/question.component';
import { AddQuestionPageComponent } from './features/add-question-page/add-question-page.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    QuestionsPageComponent,
    QuestionComponent,
    AddQuestionPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule
  ],
  exports: [
    QuestionComponent
  ]
})
export class QuestionsModule { }
