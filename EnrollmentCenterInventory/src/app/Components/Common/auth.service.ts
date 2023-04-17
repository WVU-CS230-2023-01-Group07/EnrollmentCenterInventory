import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";

@Injectable({
    providedIn: 'root',
})

export class UserService {
    /*Boolean checks whether logged in or not, this is used for routing - see sign-in-layout.component.ts*/
    private isLoggedIn = false;
    constructor(public auth: AngularFireAuth) {}
    /*HTMLInputElements are what is inputted from the form in the sign in page, we then convert these to strings by getting their value.*/
    async SignIn(user: HTMLInputElement, pass: HTMLInputElement){
        try{
        const userS: string = user.value;
        const passS: string = pass.value;
        /*Call the signInWithEmailAndPassword method of the AngularFireAuth class, passing in the user and pass as parameters.*/
        const result = await this.auth.signInWithEmailAndPassword(userS, passS);
        /*If the result is successful, set the isLoggedIn variable to true, and redirect the user to the home page.*/
        console.log(result);
        this.isLoggedIn = true;
    } catch (error) {
        /*If there is an error in the sign in process, log the error and ensure isLoggedIn is set to false (again, see sign-in-layout.component.ts for more info) */
        console.log(error);
        this.isLoggedIn = false;
    }
}
public isAuth(){
    return this.isLoggedIn
  }
    }
