import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsPageComponent } from './features/notifications-page/notifications-page.component';
import { SharedModule } from '../shared/shared.module';
import { NotificationComponent } from './ui/notification/notification.component';

@NgModule({
  declarations: [
    NotificationsPageComponent,
    NotificationComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class NotificationsModule { }
