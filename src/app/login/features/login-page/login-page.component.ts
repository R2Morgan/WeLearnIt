import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'src/app/shared/data-access/cookie.service';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  email!: string;
  password!: string;

  constructor(private db: AngularFireDatabase, private router: Router, private cookieService: CookieService) { }

  ngOnInit(): void {
    
  }

  login() {
    this.db.list('/user', ref => ref.orderByChild('email').equalTo(this.email).limitToFirst(1)).valueChanges().subscribe(user => {
      console.log(user);
      var user1 = user as unknown as any;
      if (user.length > 0 && user1[0].password === this.password) {
        this.router.navigate(['/welcome']);
        this.cookieService.createCookie('currentUser', user1[0].id, 7);
      } else {
        alert('Invalid email or password');
      }
    });
  }

}
