import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { CourseService } from '../../data-access/course.service';
import { CookieService } from 'src/app/shared/data-access/cookie.service';

@Component({
  selector: 'courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss']
})
export class CoursesPageComponent implements OnInit {
  courses$: Observable<any[]> | undefined;

  constructor(private courseService : CourseService, private db: AngularFireDatabase) { 
  }

  ngOnInit(): void {
    this.courses$ = this.courseService.getAllCourses();
  }

}
