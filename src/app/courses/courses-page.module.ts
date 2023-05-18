import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesPageComponent } from './features/courses-page/courses-page.component';
import { CourseCardComponent } from './ui/course-card/course-card.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    CoursesPageComponent,
    CourseCardComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [ 
    CoursesPageComponent,
    CourseCardComponent
  ]
})
export class CoursesPageModule { }
