import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, map, of, switchMap } from 'rxjs';
import { CookieService } from 'src/app/shared/data-access/cookie.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  questions$!: Observable<any[]>;

  constructor(private db: AngularFireDatabase, private cookieService: CookieService) {
    this.questions$ = this.db.list('/question').valueChanges();
   }

   addQuestion(question: any): void {
    this.db.list('/question').push(question);
  }

  getQuestionsForUserId(userId: any, currentUser: any): Observable<any[]> {
    return currentUser.pipe(
      switchMap((user: any[]) => {
        if (user[0].type === 0) {
          return this.questions$.pipe(
            map((questions: any[]) => {
              return questions.filter(question => question.userId === userId && question.courseId === parseInt(this.cookieService.getCookie('selectedCourse')));
            })
            );
          } else {
            return this.questions$.pipe(
              map((questions: any[]) => {
              return questions.filter(question => question.courseId === parseInt(this.cookieService.getCookie('selectedCourse')));
            })
          );
        }
      })
    );
  }

  getUserById(id: string): Observable<any> {
    console.log(id);
    
    const value = this.db.list('user', ref => ref.orderByChild('id').equalTo(parseInt(id))).valueChanges();
    return value;
  }

  getCourseById(id: string): Observable<any> {
    const value = this.db.list('course', ref => ref.orderByChild('id').equalTo(parseInt(id))).valueChanges();
    return value;
  }

  approveQuestionById(questionId: string){
    const questionRef = this.db.list<any>('/question', ref => ref.orderByChild('id').equalTo(questionId));
    questionRef.snapshotChanges().forEach((changes) => {
      changes.forEach((change) => {
        const question = change.payload.val();
        const questionRef = this.db.object(`/question/${change.key}`);
        questionRef.update({ status: 1 });
      });
    });
  }

  rejectQuestionById(questionId: string){
    const questionRef = this.db.list<any>('/question', ref => ref.orderByChild('id').equalTo(questionId));
    questionRef.snapshotChanges().forEach((changes) => {
      changes.forEach((change) => {
        const question = change.payload.val();
        const questionRef = this.db.object(`/question/${change.key}`);
        questionRef.update({ status: 2 });
      });
    });
  }
}
