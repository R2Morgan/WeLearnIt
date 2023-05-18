import { Component, OnInit } from '@angular/core';
import { CookieService } from 'src/app/shared/data-access/cookie.service';
import { QuizService } from '../../data-access/quiz.service';
import { Observable } from 'rxjs';
import { QuestionService } from 'src/app/questions/data-access/question.service';

@Component({
  selector: 'app-add-quiz-page',
  templateUrl: './add-quiz-page.component.html',
  styleUrls: ['./add-quiz-page.component.scss']
})
export class AddQuizPageComponent implements OnInit {
  public currentUserId!: number;
  name!: string;
  tags!: string;
  url!: string;
  course!: Observable<any>;

  constructor(private quizService: QuizService, private cookieService: CookieService, private questionService: QuestionService) { }

  ngOnInit(): void {
    this.currentUserId = parseInt(this.cookieService.getCookie('currentUser'));
    this.name = '';
    this.tags = '';
    this.url = '';
    this.course = this.questionService.getCourseById(this.cookieService.getCookie('selectedCourse'));
  }

  addQuiz(): void {
    console.log("AAAA");
    
    if (this.name && this.tags && this.url) {
      const newQuiz = {
        courseId: parseInt(this.cookieService.getCookie('selectedCourse')),
        professorId: parseInt(this.cookieService.getCookie('currentUser')),
        name: this.name,
        tags: this.tags,
        url: this.url,
        id: Math.floor(Math.random() * 1000000000)
      };

      this.quizService.addQuiz(newQuiz);

      // Reset form fields
      this.name = '';
      this.tags = '';
      this.url = '';
    }
  }

}
