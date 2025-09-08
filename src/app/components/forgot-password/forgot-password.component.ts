import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  //declaration of variables
  email : string = '';

  //injection of services and packages
  constructor(private auth : AuthService,private router : Router) { }

  ngOnInit(): void {
  }
//send a password change request
  forgotpassword(form: NgForm) {
    //get email from the form
    this.email= (form.value).email;
    //send request and route to verify-email page
    this.auth.forgotPassword(this.email).then(() => {
      this.router.navigate(['/verify-email']);
    }).catch(err=> alert('Something went wrong'))
  }
}
