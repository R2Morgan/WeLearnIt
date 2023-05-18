import { Component, Input, OnInit } from '@angular/core';
import { QuestionService } from '../../data-access/question.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  @Input() question: any;
  public user!: Observable<any>;
  public course!: Observable<any>;

  constructor(private questionService: QuestionService) {
  }
  
  ngOnInit(): void {
    this.user = this.questionService.getUserById(this.question.userId) as Observable<any>;
    this.course = this.questionService.getCourseById(this.question.courseId) as Observable<any>;
  }

  approveQuestion(){
    console.log("APPROVE");

    this.questionService.approveQuestionById(this.question.id);
  }

  rejectQuestion(){
    console.log("REJECT");
    
    this.questionService.rejectQuestionById(this.question.id);
  }

  getStatusClass(status: number): string[] {
    return status === 1 ? ['approved'] : status === 2 ? ['rejected'] : [];
  }

}
