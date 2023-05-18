import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CourseService } from 'src/app/courses/data-access/course.service';
import { CookieService } from 'src/app/shared/data-access/cookie.service';
import { QuestionService } from '../../data-access/question.service';

@Component({
  selector: 'questions-page',
  templateUrl: './questions-page.component.html',
  styleUrls: ['./questions-page.component.scss']
})
export class QuestionsPageComponent implements OnInit {
  public currentUserId: number;
  public enrolledCourses!: Observable<any[]>;
  public currentUser!: Observable<any>;
  public selectedCourse : any;
  public questions : any;

  constructor(private cookieService : CookieService, private courseService : CourseService, private questionService: QuestionService) {
    this.currentUserId = parseInt(this.cookieService.getCookie('currentUser'));
    this.currentUser = this.courseService.getUserById(this.currentUserId);
    this.currentUser.subscribe((user: any[]) => {
      if (user[0].type === 0) {
        this.enrolledCourses = this.courseService.getEnrolledCoursesForUserId(this.currentUserId);
      } else {
        this.enrolledCourses = this.courseService.getProfessorCourses(this.currentUserId);
      }
    });
    this.questions = this.questionService.getQuestionsForUserId(this.currentUserId, this.currentUser);
   }

  ngOnInit(): void {
    
  }

  addQuestion(){
    this.cookieService.createCookie('selectedCourse', this.selectedCourse, 1);
  }

  onSelectCourse(){
    this.cookieService.createCookie('selectedCourse', this.selectedCourse, 1);
    this.questions = this.questionService.getQuestionsForUserId(this.currentUserId, this.currentUser);
  }

}
