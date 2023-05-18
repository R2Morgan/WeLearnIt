import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, map, switchMap } from 'rxjs';
import { CookieService } from 'src/app/shared/data-access/cookie.service';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  quizzes$!: Observable<any[]>;

  constructor(private db: AngularFireDatabase, private cookieService: CookieService) {
    this.quizzes$ = this.db.list('/quiz').valueChanges();
   }

   addQuiz(quiz: any): void {
    console.log("AHA");
    
    this.db.list('/quiz').push(quiz);
  }

  getQuizzesForUserId(userId: any, currentUser: any): Observable<any[]> {
    return currentUser.pipe(
      switchMap((user: any[]) => {
        if (user[0].type === 0) {
          return this.quizzes$.pipe(
            map((quizzes: any[]) => {
              return quizzes.filter(quiz => quiz.courseId === parseInt(this.cookieService.getCookie('selectedCourse')));
            })
            );
          } else {
            return this.quizzes$.pipe(
              map((quizzes: any[]) => {
                return quizzes.filter(quiz => quiz.professorId === userId && quiz.courseId === parseInt(this.cookieService.getCookie('selectedCourse')));
            })
          );
        }
      })
    );
  }

  deleteQuiz(quizId: string) {
    const query = this.db.list('/quiz', ref => ref.orderByChild('id').equalTo(quizId));

    query.snapshotChanges().subscribe((snapshots) => {
      snapshots.forEach((snapshot) => {
        const key = snapshot.key;
        this.db.object(`/quiz/${key}`).remove()
          .then(() => {
            console.log(`Quiz "${quizId}" deleted successfully.`);
          })
          .catch((error: any) => {
            console.error(`Error deleting quiz "${quizId}":`, error);
          });
      });
    });
  }
}
