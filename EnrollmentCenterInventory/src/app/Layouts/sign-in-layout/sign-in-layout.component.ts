import { Component } from '@angular/core';
import { UserService } from 'src/app/Components/Common/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in-layout',
  templateUrl: './sign-in-layout.component.html',
  styleUrls: ['./sign-in-layout.component.css']
})
export class SignInLayoutComponent {
  /*Basically just passes the signIn method to the sign-in-layout.component.html file, and if the user is logged in, redirects the user to the home page.*/
  constructor(private authentication: UserService, private router: Router ) {}
    async signIn(user: HTMLInputElement, pass: HTMLInputElement) {
      await this.authentication.SignIn(user, pass);
      if(this.authentication.isAuth())this.router.navigate(['home']);
    }
    }