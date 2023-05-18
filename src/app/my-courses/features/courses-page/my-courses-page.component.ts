import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CourseService } from 'src/app/courses/data-access/course.service';
import { CookieService } from 'src/app/shared/data-access/cookie.service';

@Component({
  selector: 'courses-page',
  templateUrl: './my-courses-page.component.html',
  styleUrls: ['./my-courses-page.component.scss']
})
export class MyCoursesPageComponent implements OnInit {
  public currentUserId: number;
  public currentUser!: Observable<any>;
  public displayedCourses!: Observable<any[]>;

  constructor(
    private cookieService: CookieService,
    private router: Router,
    private courseService: CourseService
  ) {
    this.currentUserId = parseInt(this.cookieService.getCookie('currentUser'));
  }

  ngOnInit(): void {
    this.currentUser = this.courseService.getUserById(this.currentUserId);
    this.currentUser.subscribe((user: any[]) => {
      if (user[0].type === 0) {
        this.displayedCourses = this.courseService.getEnrolledCoursesForUserId(this.currentUserId);
      } else {
        this.displayedCourses = this.courseService.getProfessorCourses(this.currentUserId);
      }
    });
  }
  

  newPopup() {
    let url = this.router.createUrlTree(['/enroll']);
    window.open(url.toString(), "_blank",
      "resizable=no, width=1000, height=600");
  }
}
