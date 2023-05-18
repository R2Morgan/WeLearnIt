import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  constructor(private db: AngularFireDatabase) { }

  getUserById(id: string): Observable<any> {
    const value = this.db.list('user', ref => ref.orderByChild('id').equalTo(parseInt(id))).valueChanges();
    return value;
  }

  updateUser(userId: string, user: any) {
    return this.db.object(`/user/${userId}`).update(user);
  }
}
