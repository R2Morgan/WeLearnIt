import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, combineLatest, forkJoin, isEmpty, map, of, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  courses$!: Observable<any[]>;

  constructor(private db: AngularFireDatabase) {
    this.courses$ = this.db.list('/course').valueChanges();
   }

  getAllCourses(): Observable<any[]> {
    return this.courses$;
  }
  
  getCorrespondingProfessorName(userId: string): Observable<any> {
    return this.db.list('/user').valueChanges().pipe(
      map((users: any[]) => {
        return users.find(user => user.id === parseInt(userId)).firstName + " " + users.find(user => user.id === parseInt(userId)).lastName;
      })
    );
  }

  getQuizAmount(courseId: number): Observable<number> {
    const result = this.db.list('/quiz').valueChanges().pipe(
      map((quiz: any[]) => {
        const filteredQuiz = quiz.filter(q => q.courseId === courseId);
        return filteredQuiz.length;
      })
    );
    return result;
  }

  getLectureAmount(courseId: number): Observable<number> {
    const result = this.db.list('/lecture').valueChanges().pipe(
      map((lecture: any[]) => {
        const filteredLecture = lecture.filter(q => q.courseId === courseId);
        return filteredLecture.length;
      })
    );
    return result;
  }

  getEnrolledCoursesForUserId(userId: any): Observable<any[]> {
    return this.db.list('/enrolled').valueChanges().pipe(
      switchMap((enrollments: any[]) => {
        const courseIds = enrollments
          .filter(enrollment => enrollment.studentId === userId)
          .map(enrollment => enrollment.courseId);
    
        const courseObservables = courseIds.map(courseId => this.getCourseById(courseId));
        if(courseObservables.length === 0){
          return of([]);
        }
    
        return combineLatest(courseObservables).pipe(
          map(courses => courses.flat())
        );
      })
    );
  }
  
  getOtherCoursesForUserId(userId: any): Observable<any[]> {
    return combineLatest([
      this.getAllCourses(),
      this.getEnrolledCoursesForUserId(userId)
    ]).pipe(
      map(([allCourses, enrolledCourses]) => {
        const enrolledCourseIds = enrolledCourses.map(course => course.id);
        return allCourses.filter(course => !enrolledCourseIds.includes(course.id));
      })
    );
  }
  
  

  getProfessorCourses(userId: any): Observable<any[]> {
    return this.getAllCourses().pipe(
      map((courses: any[]) => {
        return courses.filter(course => course.professorId === userId);
      })
    );
  }
  

  getUserById(id: number): Observable<any> {
    const value = this.db.list('user', ref => ref.orderByChild('id').equalTo(id)).valueChanges();
    return value;
  }

  getCourseById(id: number): Observable<any> {
    const value = this.db.list('course', ref => ref.orderByChild('id').equalTo(id)).valueChanges();
    return value;
  }

  getProfessorNameById(id: any): Observable<string> {
    return new Observable<string>(observer => {
      const value = this.db.list('user', ref => ref.orderByChild('id').equalTo(id)).valueChanges();
      value.subscribe((user: any) => {
        const professorName = user[0].title + ' ' + user[0].firstName + ' ' + user[0].lastName;
        console.log(professorName);
        observer.next(professorName);
        observer.complete();
      });
    });
  }

  getLecturesForCurrentCourse(courseId: any): Observable<any[]> {
    return this.db.list('lecture', ref => ref.orderByChild('courseId').equalTo(courseId)).valueChanges();
  }

  enrollInCourse(courseId: any, userId: any) {
    const enrollment = {
      courseId: courseId,
      studentId: userId
    };
  
    this.db.list('/enrolled').push(enrollment)
      .then(() => {
        console.log('Enrollment successful');
      })
      .catch((error) => {
        console.error('Enrollment failed:', error);
      });
  }
  
  addLecture(lecture : any){
    this.db.list('/lecture').push(lecture);
  }
  
}
