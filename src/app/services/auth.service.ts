import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { GoogleAuthProvider } from 'firebase/auth';
import { FacebookAuthProvider } from 'firebase/auth';

import firebase from 'firebase/compat';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //declaration of variables
  userId : string =''; // user id

  //injection of services and packages
  constructor(private afAuth : AngularFireAuth,private router : Router) {
   }

// Sign in with Google
GoogleAuth() {
  return this.AuthLogin(new GoogleAuthProvider());
}

 // Sign in with Facebook
 FacebookAuth() {
  return this.AuthLogin(new FacebookAuthProvider());
}

// Auth logic to run auth providers for authentification with google
   AuthLogin(provider: firebase.auth.AuthProvider | GoogleAuthProvider) {
  return this.afAuth
    .signInWithPopup(provider)
    .then((result) => {
      console.log('You have been successfully logged in!');
    })
    .catch((error) => {
      console.log(error);
    });
}

// to create a new user by AngularFireAuth
  signup(email: string, password: string){
   return this.afAuth.createUserWithEmailAndPassword(email, password)
  }

  // to log in by AngularFireAuth
  login(email: string,password: string){
  return this.afAuth.signInWithEmailAndPassword(email, password)
  }

  // to log out by AngularFireAuth
  logout(){
   return this.afAuth.signOut()
  }

   // forgot password by AngularFireAuth. this service send an email for verification
   forgotPassword(email : string) {
    return this.afAuth.sendPasswordResetEmail(email);
}

  //send email varification by AngularFireAuth, and route to verify-email page
  sendEmailForVerification(user : any) {
  user.sendEmailVerification().then((res : any) => {
    this.router.navigate(['/verify-email']);
  }, (err : any) => {
    alert('Something went wrong. Not able to send mail to your email.')
  })
}
}
