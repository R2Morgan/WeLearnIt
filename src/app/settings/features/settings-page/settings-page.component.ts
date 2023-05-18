import { Component, OnInit } from '@angular/core';
import { CookieService } from 'src/app/shared/data-access/cookie.service';
import { SettingsService } from '../../data-access/settings.service';
import { Router } from '@angular/router';

@Component({
  selector: 'settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent implements OnInit {
  currentUserId = parseInt(this.cookieService.getCookie('currentUser'));
  currentUser !: any;
  profilePicURL: string = '';
  role: string = '';
  gender: string = '';
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';

  constructor(private cookieService  : CookieService, private settingsService : SettingsService, private router : Router) { }

  ngOnInit(): void {
    this.settingsService.getUserById(this.currentUserId).subscribe((users: any[]) => {
      this.currentUser = users[0];
      this.profilePicURL = this.currentUser.profilePicURL;
      this.role = this.currentUser.type;
      this.gender = this.currentUser.title;
      this.firstName = this.currentUser.firstName;
      this.lastName = this.currentUser.lastName;
      this.email = this.currentUser.email;
      this.password = this.currentUser.password;
    });
  }

  onUpdateUserSubmit() {
    alert(this.firstName);
    const updatedUser = {
      ...this.currentUser,
      profilePicURL: this.profilePicURL,
      type: this.role,
      title: this.gender,
      firstName: this.firstName,
      lastName: this.lastName,
      password: this.password,
      email: this.email
    };
  
    this.settingsService.updateUser(updatedUser)
      .then(() => {
        console.log('User updated successfully');
      })
      .catch((error) => {
        console.error('Error updating user:', error);
      });
  }

  logout() {
    document.cookie = "currentUser=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

  }

  }
