import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Components/Common/auth.service';

@Component({
  selector: 'app-sign-up-layout',
  templateUrl: './sign-up-layout.component.html',
  styleUrls: ['./sign-up-layout.component.css']
})
export class SignUpLayoutComponent {
 /*Basically just passes the signIn method to the sign-in-layout.component.html file, and if the user is logged in, redirects the user to the home page.*/
 constructor(private authentication: UserService, private router: Router ) {}
 async signUp(user: HTMLInputElement, pass: HTMLInputElement) {
   await this.authentication.SignUp(user, pass);
  }
 }

