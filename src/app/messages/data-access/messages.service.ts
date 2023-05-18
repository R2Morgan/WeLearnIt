import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, map, mergeMap } from 'rxjs';
import { CookieService } from 'src/app/shared/data-access/cookie.service';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  public currentUserId = parseInt(this.cookieService.getCookie('currentUser'));

  constructor(private db: AngularFireDatabase, private cookieService: CookieService) { }

  getAllChatrooms(userId: number): Observable<any[]> {
    return this.db.list('/chatroom').valueChanges()
      .pipe(
        map((chatrooms: any[]) => chatrooms.filter(chatroom => chatroom.user1 === userId || chatroom.user2 === userId))
      );
  }

  getLastMessageByChatroomId(chatroomId: number) {
    return this.db.list('message', ref => ref.orderByChild('chatroomId').equalTo(chatroomId).limitToFirst(1)).valueChanges();
  }

  getMessagesByChatroomId(chatroomId: number) {
    return this.db.list('message', ref => ref.orderByChild('chatroomId').equalTo(chatroomId)).valueChanges();
  }

  pushNewMessage(message: any){
    this.db.list('message').push(message);
  }

  updateMessageStatus(theMessage: any) {
    this.db.object(`/message`).query.once("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        if (childSnapshot.val().id === theMessage.id) {
          childSnapshot.ref.update({ readStatus: 0 });
        }
      });
    });
  }

  async checkEmailExists(email: string): Promise<string | false> {
    const snapshot = await this.db.list<any>('/user', ref =>
      ref.orderByChild('email').equalTo(email).limitToFirst(1)
    ).query.once('value');
    const user = snapshot.val();
    return user ? user[Object.keys(user)[0]].id : false;
  }

  createNewChatroom(email: number){
    const newChatroom = {
      id: Math.floor(Math.random() * 1000000),
      user1: this.currentUserId,
      user2: email
    };
    this.db.list('chatroom').push(newChatroom);
  }
}
