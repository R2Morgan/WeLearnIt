import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NotificationsService } from '../../data-access/notifications.service';

@Component({
  selector: 'notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  @Input() newNotification: boolean | undefined;
  @Input() notificationId!: number;
  @Input() notificationUserPic: string | undefined;
  @Input() notificationTitle: string | undefined;
  @Input() notificationDescription: string | undefined;
  @Input() notificationTime!: string;

  userPic!: any;

  @ViewChild("statusDiv") statusDiv: ElementRef | undefined;

  constructor(private notificationsService: NotificationsService) {

  }

  ngOnInit(): void {
    this.userPic = this.notificationsService.getUserPicture(this.notificationUserPic).subscribe((pic : any) => this.userPic = pic);
    this.notificationTime = this.timeAgoString(this.notificationTime);
  }
  
  ngAfterViewInit(){
    if(this.newNotification == true && this.statusDiv){
      this.statusDiv.nativeElement.classList.toggle("show");
    }
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

  setStatusSeen = () => {
    this.notificationsService.updateNotificationStatus(this.notificationId);
  };

}
