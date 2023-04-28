import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { FirebaseError } from "firebase/app";

@Injectable({
    providedIn: 'root',
})

export class UserService {
    constructor(public auth: AngularFireAuth) { }
    /*HTMLInputElements are what is inputted from the form in the sign in page, we then convert these to strings by getting their value.*/
    async SignIn(user: HTMLInputElement, pass: HTMLInputElement) {
        try {
            const userS: string = user.value;
            const passS: string = pass.value;
            /*Call the signInWithEmailAndPassword method of the AngularFireAuth class, passing in the user and pass as parameters.*/
            const result = await this.auth.signInWithEmailAndPassword(userS, passS);
            /*If the result is successful, set the loggedIn cookie to true, and redirect the user to the home page.*/
            this.setCookie("loggedIn", "true");
        } catch (error) {
            /*If there is an error in the sign in process, log the error and ensure the loggedIn cookie is set to false. (again, see sign-in-layout.component.ts for more info) */
            this.setCookie("loggedIn", "false");
            /*Error handling for all of the firebase log-in errors*/
            if (error instanceof FirebaseError) {
                if (error.code == "auth/invalid-email")
                    alert("Ensure you're using a valid email address. Please try again.");
                if (error.code == "auth/user-not-found")
                    alert("Sorry! The user you're trying to log in as could not be found. Please double check your email address and password, and try again.");
                if (error.code == "auth/wrong-password")
                    alert("Sorry! Your password is incorrect. Please try again.");
            }
        }
    }


    async SignUp(user: HTMLInputElement, pass: HTMLInputElement) {
        try {
            const userS: string = user.value;
            const passS: string = pass.value;
            /*Call the createUserWithEmailAndPassword method of the AngularFireAuth class, passing in the user and pass as parameters.*/
            const result = await this.auth.createUserWithEmailAndPassword(userS, passS);
            /*If the result is successful, alert the user, log the reuslt and create the account*/
            console.log(result);
            alert("Sign up successful!");
        } catch (error) {
            /*If there is an error in the sign in process, log the error and alert the user.*/
            console.log(error);
        }
    }

    //Signs the user out
    async signOut() {
        try {
            this.setCookie("loggedIn", "false");

        } catch (error) {
            console.log(error);
            alert("Sorry! Your sign out was unsuccessful. Please try again.");
        }
    }

    public isAuth() {
        console.log("cookie: " + this.getCookie("loggedIn"))

        if (this.getCookie("loggedIn") == "true") {
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
        document.cookie = name + "=" + value + "; expires=" + date.toUTCString() + "; path=/";
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
