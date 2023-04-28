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
            this.setCookie("loggedIn", "true");
        } catch (error) {
            /*If there is an error in the sign in process, log the error and ensure isLoggedIn is set to false (again, see sign-in-layout.component.ts for more info) */
            console.log(error);
            this.isLoggedIn = false;
            this.setCookie("loggedIn", "false");
        }
    }


    async SignUp(user: HTMLInputElement, pass: HTMLInputElement){
        try{
            const userS: string = user.value;
            const passS: string = pass.value;
            /*Call the createUserWithEmailAndPassword method of the AngularFireAuth class, passing in the user and pass as parameters.*/
            const result = await this.auth.createUserWithEmailAndPassword(userS, passS);
            /*If the result is successful, alert the user, log the reuslt and create the account*/
            console.log(result);
            alert("Sign up successful!");
        } catch (error) {
            /*If there is an error in the sign in process, log the error and ensure isLoggedIn is set to false (again, see sign-in-layout.component.ts for more info) */
            console.log(error);
            alert("Sorry! Your sign up was unsuccessful. Please try again.");
        }
    }

    //Signs the user out
    async signOut(){
        try{
            this.isLoggedIn = false;
            this.setCookie("loggedIn", "false");

        } catch (error) {
            console.log(error);
            alert("Sorry! Your sign out was unsuccessful. Please try again.");
        }
    }

    public isAuth(){
        //return this.isLoggedIn <- Old way
        console.log("cookie: " + this.getCookie("loggedIn"))
        
        if(this.getCookie("loggedIn") == "true"){
            return true;
        }
        
        return false;
    }

    private setCookie(name: string, val: string) {
        const date = new Date();
        const value = val;

        // Set it expire in 7 days
        date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));

        // Set the cookie
        document.cookie = name+"="+value+"; expires="+date.toUTCString()+"; path=/";
    }

    private getCookie(name: string) {
        const value = "; " + document.cookie;
        const parts = value.split("; " + name + "=");
        
        //return the cookie's value
        if (parts.length == 2) {
            return parts.pop()?.split(";").shift();
        }

        //if the cookie is not found
        return null;
    }

}
