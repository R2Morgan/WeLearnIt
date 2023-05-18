import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavbarService } from '../../data-access/navbar.service';
import { CookieService } from '../../data-access/cookie.service';
import { NotificationsService } from 'src/app/notifications/data-access/notifications.service';
import { Router } from '@angular/router';
import { MessagesService } from 'src/app/messages/data-access/messages.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @ViewChild("statusDropdown") statusDropdown: ElementRef | undefined;
  private currentUserId = this.cookieService.getCookie('currentUser');
  currentUser : any;
  notificationsNumber!: number;
  chatsNumber!: number;
  selectedTab !: string;

  constructor(private messageService: MessagesService,
     private navbarService: NavbarService,
      private cookieService: CookieService,
       private notificationsService: NotificationsService,
        private router : Router) {
  }
  
  ngOnInit(): void {
    this.navbarService.getUserById(this.currentUserId).subscribe((userArray: any[]) => {
      this.currentUser = userArray[0];
    });
    this.notificationsService.getNotificationsForCurrentUserWithStatus(this.cookieService.getCookie('currentUser'), true)
    .subscribe((notifications) => {
      this.notificationsNumber = notifications.length;
    });
    this.setSelectedTab();
    this.getChatsNumber();
    console.log(this.chatsNumber);
    
  }

  setSelectedTab(){
      var currentRoute = this.router.url;
      if (currentRoute === '/settings') {
        this.selectedTab = 'settings';
      } else if (currentRoute === '/my-courses') {
        this.selectedTab = 'courses';
      } else if (currentRoute === '/quizzes') {
        this.selectedTab = 'quizzes';
      } else if (currentRoute === '/questions') {
        this.selectedTab = 'questions';
      } else if (currentRoute === '/messages') {
        this.selectedTab = 'messages';
      } else if (currentRoute === '/notifications'){
        this.selectedTab = 'notifications';
      } else{
        this.selectedTab = '/';
      }
  }

  myFunction() {
    if(this.statusDropdown){
      this.statusDropdown.nativeElement.classList.toggle("show");
    }
  }

  updateUserStatus(status: string) {
    if(status === 'available'){
      this.currentUser.status = 0;
    }else if(status === 'away'){
      this.currentUser.status = 1;
    }else{
      this.currentUser.status = 2;
    }
    this.navbarService.updateUser(this.currentUser.id, this.currentUser);
  }

  getChatsNumber(){
    this.chatsNumber = 0;
    var userId = parseInt(this.currentUserId);
    var chatrooms = this.messageService.getAllChatrooms(userId);
    chatrooms.subscribe(chatrooms =>{
      chatrooms.forEach(chatroom => {
        var lastChatroomMessage = this.messageService.getLastMessageByChatroomId(chatroom.id);
        lastChatroomMessage.subscribe((chatroomMessage:any) => {
          if(chatroomMessage[0].readStatus == 1) {
            this.increaseChatsNumber();
          }
        })
      });
    });
  }

  increaseChatsNumber(){
    this.chatsNumber++;
    console.log("WORK DUMBASS" + this.chatsNumber);
  }
}

