import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CourseService } from 'src/app/courses/data-access/course.service';
import { QuestionService } from 'src/app/questions/data-access/question.service';
import { CookieService } from 'src/app/shared/data-access/cookie.service';
import { ChatService } from '../../data-access/chat.service';

@Component({
  selector: 'new-lecture',
  templateUrl: './new-lecture.component.html',
  styleUrls: ['./new-lecture.component.scss']
})
export class NewLectureComponent implements OnInit {
  public currentUserId!: number;
  name: string;
  url: string;
  course!: Observable<any>;
  aiOutput: string = '';
  aiInput: string = '';

  constructor(private chatService: ChatService, private courseService: CourseService, private questionService: QuestionService, private cookieService: CookieService) {
    this.currentUserId = parseInt(this.cookieService.getCookie('currentUser'));
    this.name = '';
    this.url = '';
   }

  ngOnInit(): void {
    this.course = this.questionService.getCourseById(this.cookieService.getCookie('selectedCourse'));
  }

  addLecture(){
    if (this.name && this.url) {
      const newLecture = {
        courseId: parseInt(this.cookieService.getCookie('selectedCourse')),
        name: this.name,
        url: this.url,
        id: Math.floor(Math.random() * 1000000000)
      };

      this.courseService.addLecture(newLecture);

      this.name = '';
      this.url = '';
    }
  }

  onEnterKeyPressed() {
    this.aiOutput = "Processing...";
    if (this.aiInput) {
      this.chatService.sendMessage(this.aiInput).subscribe(
        (response: any) => {
          const output = response['choices'][0]['message']['content'];
          this.aiOutput = output;
          console.log(this.aiOutput);
        },
        (error: any) => {
          console.log("Error:", error);
        }
      );
    }
  }
   
  
}
