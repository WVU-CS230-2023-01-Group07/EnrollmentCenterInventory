import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Components/Common/auth.service';

@Component({
  selector: 'app-sign-out-layout',
  templateUrl: './sign-out-layout.component.html',
  styleUrls: ['./sign-out-layout.component.css']
})
export class SignOutLayoutComponent {

  constructor(private authentication: UserService, private router: Router ) {}
  
  public signOut(){
    this.authentication.signOut();
    this.router.navigate(['home']);
  }
}
