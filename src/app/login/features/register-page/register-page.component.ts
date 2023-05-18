import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../data-access/login.service';
import { NgForm } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';

@Component({
  selector: 'register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
  firstName: string | undefined;
  lastName: string | undefined;
  email!: string;
  password: string | undefined;

  constructor(private db: AngularFireDatabase, private router: Router, private loginService : LoginService) {}
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const user = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
        id: Math.floor(Math.random() * 1000000000),
        title: "Mr",
        type: 0,
        status: 0,
        profilePicURL: "../../../../assets/ProfilePic.png"
      };
      var exit = 0;
      this.loginService.checkIfEmailExists(this.email).subscribe((exists) => {
        if (!exists) {
          this.loginService.addUser(user);
          this.router.navigate(['/login']);
          exit = 1;
        } else {
          if(exit != 1){
            alert("Email Address already exists!");
          }      
        }
      });
  }
  }
}
