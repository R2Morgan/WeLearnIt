import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../../data-access/messages.service';
import { CookieService } from 'src/app/shared/data-access/cookie.service';
import { NavbarService } from 'src/app/shared/data-access/navbar.service';
import { Observable, map, of } from 'rxjs';
import { NotificationsService } from 'src/app/notifications/data-access/notifications.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@Component({
  selector: 'messages-page',
  templateUrl: './messages-page.component.html',
  styleUrls: ['./messages-page.component.scss']
})
export class MessagesPageComponent implements OnInit {
  public currentUserId = parseInt(this.cookieService.getCookie('currentUser'));
  availableChatrooms!: Observable<any[]>;
  chatroomUserNames: { [key: string]: Observable<string> } = {};
  chatroomUserPics: { [key: string]: Observable<string> } = {};
  chatroomUserIds: { [key: number]: Observable<number> } = {};
  chatroomLastMessages: { [key: string]: string } = {};
  chatroomLastMessagesTime: { [key: string]: string } = {};
  chatroomLastMessagesStatus: { [key: number]: number } = {};
  selectedChatroom: any = null;
  selectedChatroomUser!: any;
  selectedChatroomMessages!: Observable<any>;
  newMessage = '';
  statusClass: string = '';

  constructor(private cookieService: CookieService, private messagesService: MessagesService, private navbarService: NavbarService, private notificationsService: NotificationsService) { }

  ngOnInit() {
    this.availableChatrooms = this.messagesService.getAllChatrooms(this.currentUserId);
  
    this.availableChatrooms.subscribe((chatrooms: any[]) => {
      chatrooms.forEach(chatroom => {
        const otherUserId = chatroom.user1 === this.currentUserId ? chatroom.user2 : chatroom.user1;
  
        this.chatroomUserNames[chatroom.id] = this.navbarService.getUserById(otherUserId).pipe(
          map((userArray: any[]) => `${userArray[0].firstName} ${userArray[0].lastName}`)
        );
        this.chatroomUserPics[chatroom.id] = this.navbarService.getUserById(otherUserId).pipe(
          map((userArray: any[]) => userArray[0].profilePicURL)
        );
        this.chatroomUserIds[chatroom.id] = this.navbarService.getUserById(otherUserId).pipe(
          map((userArray: any[]) => userArray[0].id)
        );
        this.messagesService.getLastMessageByChatroomId(chatroom.id).subscribe((messages: any[]) => {
          if (messages.length > 0) {
            this.chatroomLastMessages[chatroom.id] = messages[0].text;
            this.chatroomLastMessagesTime[chatroom.id] = this.timeAgoString(messages[0].time);
            this.chatroomLastMessagesStatus[chatroom.id] = messages[0].readStatus;
          }
        });
      });
    });
  }

  updateStatusClass() {
    if (this.selectedChatroomUser?.status === 0) {
      this.statusClass = 'available';
    } else if (this.selectedChatroomUser?.status === 1) {
      this.statusClass = 'away';
    } else if (this.selectedChatroomUser?.status === 2) {
      this.statusClass = 'busy';
    }
  }

  sendNewMessageNotification(){
    const now = new Date();
    const timestamp = now.getFullYear() + ':' +
    (now.getMonth() + 1).toString().padStart(2, '0') + ':' +
    now.getDate().toString().padStart(2, '0') + ':' +
    now.getHours().toString().padStart(2, '0') + ':' +
    now.getMinutes().toString().padStart(2, '0');
    const newNotification = {
      title: this.selectedChatroomUser?.title + this.selectedChatroomUser?.firstName + this.selectedChatroomUser?.lastName + "has sent you a new message",
      description: this.newMessage,
      id: Math.floor(Math.random() * 1000000),
      status: true,
      from: this.currentUserId,
      time: timestamp,
      to: this.selectedChatroomUser?.id
    };
    this.notificationsService.addNotification(newNotification);
  }

getOtherUserName(chatroom: any): Observable<string> {
    return this.chatroomUserNames[chatroom.id];
}

getOtherUserPic(chatroom: any): Observable<string>{
    return this.chatroomUserPics[chatroom.id];
}

onChatroomClick(chatroom: any) {
  this.selectedChatroom = chatroom;
  this.navbarService.getUserById(this.getOtherUserId(chatroom).toString()).subscribe(users => {
    this.selectedChatroomUser = users[0];
  });
  this.selectedChatroomMessages = this.getMessagesForSelectedChatroom().pipe(
    map(messages => messages.slice().reverse())
  );
  this.updateReadStatus();
}

getMessagesForSelectedChatroom(): Observable<any> {
  if (!this.selectedChatroom) {
    return of([]);
  }
  return this.messagesService.getMessagesByChatroomId(this.selectedChatroom.id);
}

getOtherUserId(chatroom : any): number{
  if(chatroom.user1 === this.currentUserId) return chatroom.user2;
  else return chatroom.user1;
}

timeAgoString(dateString: string): string {
    const [year, month, day, hour, minute] = dateString.split(':').map(Number);
    const date = new Date(year, month - 1, day, hour, minute);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
  
    const minuteMs = 60 * 1000;
    const hourMs = 60 * minuteMs;
    const dayMs = 24 * hourMs;
    const weekMs = 7 * dayMs;
  
    if (diff < minuteMs) {
      return 'just now';
    } else if (diff < hourMs) {
      const minutes = Math.floor(diff / minuteMs);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (diff < dayMs) {
      const hours = Math.floor(diff / hourMs);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (diff < weekMs) {
      const days = Math.floor(diff / dayMs);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else {
      const weeks = Math.floor(diff / weekMs);
      return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    }
}

addNewMessage() {
  const now = new Date();
  const timestamp = now.getFullYear() + ':' +
  (now.getMonth() + 1).toString().padStart(2, '0') + ':' +
  now.getDate().toString().padStart(2, '0') + ':' +
  now.getHours().toString().padStart(2, '0') + ':' +
  now.getMinutes().toString().padStart(2, '0');
  const newMessage = {
    text: this.newMessage,
    chatroomId: this.selectedChatroom.id,
    id: Math.floor(Math.random() * 1000000),
    readStatus: 0,
    senderId: this.currentUserId,
    time: timestamp
  };
  this.messagesService.pushNewMessage(newMessage);
  this.sendNewMessageNotification();
  this.newMessage = '';
}

updateReadStatus() {
  this.selectedChatroomMessages.forEach(x => {
    x.forEach((element: any) => {
      this.messagesService.updateMessageStatus(element);
    });
  })
  }

  async addNewChatroom(){
    const input = (<HTMLInputElement>document.getElementById("form1")).value;
    const result = await this.messagesService.checkEmailExists(input);
    if(result == false){
      alert("The email address does not exist in our system!");
    }else if(typeof result === "string" || typeof result === "number"){
      const email = parseInt(result);
      var alreadyExists = false;
      for (let chatroomId in this.chatroomUserIds) {
        this.chatroomUserIds[chatroomId].subscribe(userId => {
          if(userId == email){
            alreadyExists = true;
          }
        });
      }
      if(alreadyExists){
        alert("You already have a chatroom with this user!");
      }else{
        const email = parseInt(result);
        this.messagesService.createNewChatroom(email);
      }

    }
  }
}
