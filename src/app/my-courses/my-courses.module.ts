import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyCoursesPageComponent } from './features/courses-page/my-courses-page.component';
import { SharedModule } from '../shared/shared.module';
import { CourseCardComponent } from './ui/course-card/course-card.component';
import { EnrollComponent } from './features/enroll/enroll.component';
import { NewLectureComponent } from './features/new-lecture/new-lecture.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MyCoursesPageComponent,
    CourseCardComponent,
    EnrollComponent,
    NewLectureComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule
  ]
})
export class MyCoursesModule { }
