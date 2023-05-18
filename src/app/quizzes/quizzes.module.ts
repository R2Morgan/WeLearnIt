import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizzesPageComponent } from './features/quizzes-page/quizzes-page.component';
import { SharedModule } from '../shared/shared.module';
import { QuizComponent } from './ui/quiz/quiz.component';
import { AddQuizPageComponent } from './features/add-quiz-page/add-quiz-page.component';
import { QuestionsModule } from '../questions/questions.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    QuizzesPageComponent,
    QuizComponent,
    AddQuizPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    QuestionsModule,
    FormsModule
  ]
})
export class QuizzesModule { }
