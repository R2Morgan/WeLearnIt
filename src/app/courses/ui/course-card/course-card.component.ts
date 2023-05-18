import { Component, Input, OnInit } from '@angular/core';
import { CourseService } from '../../data-access/course.service';

@Component({
  selector: 'course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent implements OnInit {
  @Input() professorId!: string;
  @Input() courseName: string | undefined;
  @Input() lectureNumber!: number;
  @Input() quizNumber!: number;
  @Input() courseImage: string | undefined;
  @Input() courseId!: string;

  professorName: any | undefined;

  constructor(private courseService : CourseService) { }

  ngOnInit(): void {
    this.courseService.getCorrespondingProfessorName(this.professorId).subscribe(user => {
      this.professorName = user;
    });

    this.courseService.getQuizAmount(parseInt(this.courseId)).subscribe(quizAmount => {
      this.quizNumber = quizAmount;
    });
    
    this.courseService.getLectureAmount(parseInt(this.courseId)).subscribe(lectureAmount => {
      this.lectureNumber = lectureAmount;
    });
  }

}
