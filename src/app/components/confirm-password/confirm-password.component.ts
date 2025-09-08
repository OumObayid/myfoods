import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-confirm-password',
  templateUrl: './confirm-password.component.html',
  styleUrls: ['./confirm-password.component.css'],
})
export class ConfirmPasswordComponent implements OnInit {

  //injection of services and packages
  constructor(
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {}

// Confirm to reset password
  setPassword(form: NgForm){
    //Get code as a parameter in the email verification link
    const code = this.route.snapshot.queryParams['oobCode'];
    //get from the form the new password
    let password  = (form.value).password;
    let confirmPassword  = (form.value).confirmPassword;
    // update password by  code confirmation
    if (password == confirmPassword) {
      this.afAuth.confirmPasswordReset(code, password).then(() => this.router.navigate(['login'])).catch((err) => {console.log(err)});
      return;
    }
  }
}
