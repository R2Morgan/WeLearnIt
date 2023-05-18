import { Component, OnInit } from '@angular/core';
import { CookieService } from 'src/app/shared/data-access/cookie.service';
import { NavbarService } from 'src/app/shared/data-access/navbar.service';

@Component({
  selector: 'welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {
  private currentUserId = this.cookieService.getCookie('currentUser');
  currentUser : any;

  constructor(private cookieService: CookieService, private navbarService: NavbarService) { }

  ngOnInit(): void {
    this.navbarService.getUserById(this.currentUserId).subscribe((userArray: any[]) => {
      this.currentUser = userArray[0];
      console.log(this.currentUser);
    });
  }

}
