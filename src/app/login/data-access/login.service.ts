import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private db: AngularFireDatabase) { }

  checkIfEmailExists(email: string): Observable<boolean> {
    return this.db.list('/user').valueChanges().pipe(
      map((users: any[]) => {
        const user = users.find(user => user.email === email);
        if (user) {
          return true;
        } else {
          return false;
        }
      }),
      catchError((error: any) => {
        return of(false);
      })
    );
  }


  addUser(user: any): void {
    this.db.list('/user').push(user);
  }
}
