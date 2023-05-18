import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { CookieService } from 'src/app/shared/data-access/cookie.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private db: AngularFireDatabase) { }

  getUserById(id: number): Observable<any> {
    const value = this.db.list('user', ref => ref.orderByChild('id').equalTo(id)).valueChanges();
    return value;
  }

  updateUser(user: any) {
    const userRef = this.db.list<any>('/user');
    return userRef.update(user.id.toString(), user);
  }
}
