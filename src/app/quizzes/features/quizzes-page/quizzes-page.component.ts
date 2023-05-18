import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CourseService } from 'src/app/courses/data-access/course.service';
import { CookieService } from 'src/app/shared/data-access/cookie.service';
import { QuizService } from '../../data-access/quiz.service';

@Component({
  selector: 'quizzes-page',
  templateUrl: './quizzes-page.component.html',
  styleUrls: ['./quizzes-page.component.scss']
})
export class QuizzesPageComponent implements OnInit {
  public selectedCourse : any;
  public currentUserId!: number;
  public currentUser!: Observable<any>;
  public quizzes : any;
  public enrolledCourses!: Observable<any[]>;

  constructor(private cookieService : CookieService, private courseService : CourseService, private quizService: QuizService) { }

  ngOnInit(): void {
    this.currentUserId = parseInt(this.cookieService.getCookie('currentUser'));
    this.currentUser = this.courseService.getUserById(this.currentUserId);
    this.currentUser.subscribe((user: any[]) => {
      if (user[0].type === 0) {
        this.enrolledCourses = this.courseService.getEnrolledCoursesForUserId(this.currentUserId);
      } else {
        this.enrolledCourses = this.courseService.getProfessorCourses(this.currentUserId);
      }
    });
    this.quizzes = this.quizService.getQuizzesForUserId(this.currentUserId, this.currentUser);
  }

  onSelectCourse(){
    this.cookieService.createCookie('selectedCourse', this.selectedCourse, 1);
    this.quizzes = this.quizService.getQuizzesForUserId(this.currentUserId, this.currentUser);
  }

  addQuiz(){
    this.cookieService.createCookie('selectedCourse', this.selectedCourse, 1);
  }

}
