import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private db: AngularFireDatabase) { }

  getNotificationsForCurrentUser(userId: string): Observable<any[]> {
    return this.db.list<any>('notification', ref => ref.orderByChild('to').equalTo(parseInt(userId))).valueChanges();
  }

  getUserPicture(userId: any) : any{
    const userRef = this.db.list('user', ref => ref.orderByChild('id').equalTo(userId)).valueChanges();
    return userRef.pipe(
    map((users: any[]) => {
      if (users.length > 0) {
        return users[0].profilePicURL;
      }
      return '';
    })
  );
  }

  addNotification(notification: any): void {
    this.db.list('/notification').push(notification);
  }

  updateNotificationStatus(id: number): void {
    const notificationRef = this.db.list<any>('/notification', ref => ref.orderByChild('id').equalTo(id));
    notificationRef.snapshotChanges().forEach((changes) => {
      changes.forEach((change) => {
        const notification = change.payload.val();
        const notificationRef = this.db.object(`/notification/${change.key}`);
        notificationRef.update({ status: false });
      });
    });
  }

  getNotificationsForCurrentUserWithStatus(userId: string, status: boolean): Observable<any[]> {
    return this.db.list<any>('notification', ref => ref.orderByChild('to').equalTo(parseInt(userId)))
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes
            .filter(c => c.payload.val().status === status)
            .map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );
  }
  
}
