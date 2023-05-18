import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/courses/data-access/course.service';
import { CookieService } from 'src/app/shared/data-access/cookie.service';

@Component({
  selector: 'enroll',
  templateUrl: './enroll.component.html',
  styleUrls: ['./enroll.component.scss']
})
export class EnrollComponent implements OnInit {
  public currentUserId = parseInt(this.cookieService.getCookie('currentUser'));
  private currentUser: any;
  public displayedCourses: any;
  public quizzes: number[] = [];
  public lectures: number[] = [];

  constructor(private cookieService: CookieService, private courseService: CourseService) { }

  ngOnInit(): void {
    this.currentUser = this.courseService.getUserById(this.currentUserId);
    this.displayedCourses = this.courseService.getOtherCoursesForUserId(this.currentUserId);
    this.displayedCourses.subscribe((courses: any[]) => {
      for (const course of courses) {
        this.courseService.getQuizAmount(course.id).subscribe(quizAmount => {
          this.quizzes.push(quizAmount);
        });

        this.courseService.getLectureAmount(course.id).subscribe(lectureAmount => {
          this.lectures.push(lectureAmount);
        });
      }
    });
    
  }

  enrollInCourse(courseId : any){
    this.courseService.enrollInCourse(courseId, this.currentUserId);
    window.close();
  }
}
