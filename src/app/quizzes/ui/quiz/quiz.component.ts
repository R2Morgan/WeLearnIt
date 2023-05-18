import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { QuestionService } from 'src/app/questions/data-access/question.service';
import { QuizService } from '../../data-access/quiz.service';

@Component({
  selector: 'quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  @Input() quiz: any;
  public user!: Observable<any>;
  public course!: Observable<any>;

  constructor(private questionService: QuestionService, private quizService: QuizService) { }

  ngOnInit(): void {
    this.user = this.questionService.getUserById(this.quiz.professorId) as Observable<any>;
    this.course = this.questionService.getCourseById(this.quiz.courseId) as Observable<any>;
  }

  deleteQuiz() {
    this.quizService.deleteQuiz(this.quiz.id);
  }
}
