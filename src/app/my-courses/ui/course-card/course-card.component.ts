import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CourseService } from 'src/app/courses/data-access/course.service';
import { CookieService } from 'src/app/shared/data-access/cookie.service';

@Component({
  selector: 'course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent implements OnInit {
  @Input() professor: string | undefined;
  @Input() name: string | undefined;
  @Input() description: string | undefined;
  @Input() lectures: any;
  @Input() quizzes: any;
  @Input() courseId!: string;
  @Input() professorName: string | undefined;
  @Input() isEditable!: number;

  public lectureList: any[] = [];

  constructor(private courseService: CourseService, private router: Router, private cookieService: CookieService) {}
  
  ngOnInit(): void {
    this.getProfessorName(this.professor).subscribe(name => {
      this.professorName = name;
    });
    
    this.getLectureList().subscribe(lectures => {
      this.lectureList = lectures;
    });

    this.courseService.getQuizAmount(parseInt(this.courseId)).subscribe(quizAmount => {
      this.quizzes = quizAmount;
    });
    
    this.courseService.getLectureAmount(parseInt(this.courseId)).subscribe(lectureAmount => {
      this.lectures = lectureAmount;
    });
  }
  
  getProfessorName(userId: any): Observable<string> {
    return this.courseService.getProfessorNameById(userId);
  }
  
  getLectureList(): Observable<any[]> {
    return this.courseService.getLecturesForCurrentCourse(this.courseId);
  }

  addLecture(){
    this.cookieService.createCookie('selectedCourse', this.courseId, 1);
    let url = this.router.createUrlTree(['/new-lecture']);
    window.open(url.toString(), "_blank",
      "resizable=no, width=1000, height=600");
  }
}