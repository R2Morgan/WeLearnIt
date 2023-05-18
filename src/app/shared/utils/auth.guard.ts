import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const currentUserCookie = document.cookie.split(';').find(cookie => cookie.includes('currentUser='));
    if (currentUserCookie !== null) {
        const currentUser = currentUserCookie ? JSON.parse(currentUserCookie.split('=')[1]) : null;
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}
