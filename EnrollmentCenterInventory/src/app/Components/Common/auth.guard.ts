import { Injectable } from '@angular/core';
import { RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from "./auth.service";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard {
  
  constructor(
    public UserService: UserService,
    public router: Router
  ){ }

  //used to find if the user is signed in
  canActivate(

    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    // Send the user to the sign in page if they're not signed in 
    if(this.UserService.isAuth() !== true) {
      this.router.navigate([''])
    }
    return true;
  }
  
}