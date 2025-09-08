import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
//declaration of variables
  Message : string = '' // message to affiche in view page after evenement

//injection of services and packages
  constructor(private as: AuthService, private us: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  // to sign up
  signup(form: NgForm){
    // get information from the form
    let data : User = form.value
    // send email and password to service AuthService
    this.as.signup(data.email as string,data.password as string)
      .then(res => { // if everything goes well
        this.us.addNewUser(res.user?.uid,data.name,data.adress)// add a new user in database firbase
        .then(()=>{ // if everything goes well
              this.as.sendEmailForVerification(res.user); // send email Verification
        })
      })
      .catch(err => {
        this.Message = err.message
      })

  }
}
