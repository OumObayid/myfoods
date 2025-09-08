=================MyFood====================
 
Myfood is a project made in Angular 13.
it has two parts: user part and admin part. 
- this is a fruit shop. user can buy fruits by specifying quantity.
- the customer can see, manage his cat....
- As for the administrator, he can add, delete, modify or display one or all of the fruits.
- The data is managed by firebase. 
- The site also includes a firebase authentication system. 
- Login via google or facebook is possible.
- It is possible to recover the lost password by verifying the email entered

the application has 15 components, 5 services and 1 guard

Tutoriel for Angular 13 Firebase CRUD Operations:
================================================

A- INSTALL ANGULAR APP
======================

1- Install Angular App:
command: npm install -g @angular/cli

2- Create a new application (my-food):
command: ng new my-food

3- get into the project’s directory by following the following command:
command: cd my-food

3- Install ng-bootstrap:
command: npm i @ng-bootstrap/ng-bootstrap

4- Test your Project:
command: ng serve --open

B- FIREBASE ACCOUNT SET UP + ANGULARFIRE LIBRARY INTEGRATION
============================================================

1- Go to Firebase website : https://console.firebase.google.com/, and login using your gmail, when you see given below screen click on Add Project section.

2- Enter your project name, accept the terms and condition and click on Create project button.

3- Click on your project then you’ll enter in your Firebase dashboard

4- Navigate to Develop > Authentication > Web setup then click on the Web setup button, and a popup will appear along with your firebase credentials.

5- Copy these Firebase credentials, you will have to paste these credentials in your src/environments/enviorment.ts file to make the connection between Firebase and your Angular app, like this:

export const environment = {

  production: true,

  firebase: {

    apiKey: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",

    authDomain: "xxxxxxxxxxxxxxxxxx",

    projectId: "xxxxxxxxxxxxxx",

    storageBucket: "xxxxxxxxxxxxxxxxxxx",

    messagingSenderId: "xxxxxxxxxxxxx",

    appId: "xxxxxxxxxxxxxxxxxxxxx"

  },

};

6- Next, click on create database and make sure to set the Firebase security rules to test mode.
Don’t forget to change your Firebase database rules, go to Database > Rules. Add these security rules in your Realtime Database’s Rules tab and then publish them.

C- INSTALL FIREBASE AND ANGULARFIRE PACKAGE
===========================================

1- install firebase
command: npm install firebase @angular/fire --save

2- Open app.module.ts file and import the Firebase modules and environment file:

// Import Firebase modules + environment

import { AngularFireModule } from '@angular/fire/compat';

import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { AngularFireStorageModule } from '@angular/fire/compat/storage';

import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

import { environment } from '../environments/environment';

@NgModule({

  declarations: [AppComponent],

  imports: [

    BrowserModule,

    AppRoutingModule,

    AngularFireModule.initializeApp(environment.firebaseConfig),

    AngularFireAuthModule,

    AngularFirestoreModule,

    AngularFireStorageModule,

    AngularFireDatabaseModule,

  ],

  providers: [],

  bootstrap: [AppComponent],

})

..........



