import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../data-access/question.service';
import { CookieService } from 'src/app/shared/data-access/cookie.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'add-question-page',
  templateUrl: './add-question-page.component.html',
  styleUrls: ['./add-question-page.component.scss']
})
export class AddQuestionPageComponent implements OnInit {
  public currentUserId!: number;
  questionText: string;
  imageUrl: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  relatedConcepts: string;
  course!: Observable<any>;

  constructor(private questionService: QuestionService, private cookieService: CookieService) {
    this.currentUserId = parseInt(this.cookieService.getCookie('currentUser'));
    this.questionText = '';
    this.imageUrl = '';
    this.optionA = '';
    this.optionB = '';
    this.optionC = '';
    this.optionD = '';
    this.relatedConcepts = '';
  }

  ngOnInit(): void {
    this.course = this.questionService.getCourseById(this.cookieService.getCookie('selectedCourse'));
  }

  addQuestion(): void {
    if (this.questionText && this.optionA && this.optionB && this.optionC && this.optionD && this.relatedConcepts) {
      const newQuestion = {
        courseId: parseInt(this.cookieService.getCookie('selectedCourse')),
        userId: parseInt(this.cookieService.getCookie('currentUser')),
        text: this.questionText,
        imageURL: this.imageUrl,
        optionA: this.optionA, 
        optionB: this.optionB, 
        optionC: this.optionC,
        optionD: this.optionD,
        tags: this.relatedConcepts,
        status: 0,
        id: Math.floor(Math.random() * 1000000000)
      };

      this.questionService.addQuestion(newQuestion);

      this.questionText = '';
      this.imageUrl = '';
      this.optionA = '';
      this.optionB = '';
      this.optionC = '';
      this.optionD = '';
      this.relatedConcepts = '';
    }
  }
}
