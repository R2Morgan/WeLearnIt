import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../../data-access/notifications.service';
import { CookieService } from 'src/app/shared/data-access/cookie.service';
import { NavbarService } from 'src/app/shared/data-access/navbar.service';

@Component({
  selector: 'notifications-page',
  templateUrl: './notifications-page.component.html',
  styleUrls: ['./notifications-page.component.scss']
})
export class NotificationsPageComponent implements OnInit {
  $notifications !: any[];

  constructor(private notificationService: NotificationsService, private cookieService: CookieService) { }

  ngOnInit() {
    this.notificationService.getNotificationsForCurrentUser(this.cookieService.getCookie('currentUser')).subscribe((notifications) => {
      this.$notifications = notifications;
    });
  }

}
