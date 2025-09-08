import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  //declaration of variables
  id: string = '';
  name: string = '';
  adress: string = '';
  email: any = '';
  password: string = '';
  messageAccount: string = '';
  messagePass: string = '';

  //injection of services and packages
  constructor(
    private as: AuthService,
    private fs: AngularFirestore,
    private route: ActivatedRoute,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit(): void {

    // Get the user id from the current route.
    this.id = this.route.snapshot.params['id'];
    // Get user informations
    this.fs
      .collection(`users`)
      .doc(this.id)
      .snapshotChanges()
      .subscribe((data) => {
        this.name = data.payload.get('name');
        this.adress = data.payload.get('adress');
      });
    this.afAuth.user.subscribe((data) => {
      this.email = data?.email;
    });
  }

  //Update user informations
  updateAccount(form: NgForm) {
    let name = form.value.name,
      adress = form.value.adress;
    this.fs
      .collection('users')
      .doc(this.id)
      .update({ name: name, adress: adress })
      .then(() => {
        this.messageAccount = 'change is made';
        setTimeout(() => {
          this.messageAccount = '';
        }, 4000);
      });
  }

  //Update user password
  updatePass(form: NgForm) {
    //get old password from form
    let oldPass = form.value.oldPass,
        newPass = form.value.newPass;
    // check if the password is correct and update it
    this.as
      .login(this.email, oldPass)
      .then(() => {
        this.afAuth.currentUser.then((user) => {
          user?.updatePassword(newPass).then(
            () => {
              this.messagePass = 'password change is done';
              setTimeout(() => {
                form.control.reset();
                this.messagePass = '';
              }, 4000);
            },
            (error) => {
              this.messagePass = 'Password should be at least 6 characters';
              setTimeout(() => {
                form.control.reset();
                this.messagePass = '';
              }, 4000);

            }
          );
        });
      })
      .catch((err) => {
        this.messagePass ='The old password is invalid or the user does not have a password';
              setTimeout(() => {
                form.control.reset();
                this.messagePass = '';
              }, 4000);
      });
  }
}
