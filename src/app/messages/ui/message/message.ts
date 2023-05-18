import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'src/app/shared/data-access/cookie.service';

@Component({
  selector: 'message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  private currentUserId = parseInt(this.cookieService.getCookie('currentUser'));
  @Input() from: string | undefined;
  @Input() text: string | undefined;
  @Input() time: string | undefined;
  @Input() message: any;
  
  @ViewChild("mainDiv") mainDiv: ElementRef | undefined;

  constructor(private cookieService: CookieService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    if(this.mainDiv && this.from == "2"){
      this.mainDiv.nativeElement.classList.add("from-me");
    }
    if(this.message.senderId === this.currentUserId){
      this.from = '1';
    }else this.from = '2';
    
  }

}
