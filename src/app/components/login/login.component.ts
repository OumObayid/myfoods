import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //declaration of variables
  Message : string = ''// message to affiche after evenement

  constructor(private as: AuthService, private router : Router) { }

  ngOnInit(): void {

  }

  //to signin with faceboock and route to home
  FacebookAuth(form: NgForm){
    this.as.FacebookAuth().then(()=>{
      this.router.navigate([''])
    })
  }
  //to signin with google and route to home
  authGoogle(form: NgForm){
    this.as.GoogleAuth().then(()=>{
      this.router.navigate([''])
    })
  }

// to signin with email and password
  login(form: NgForm){
    // get informations from the form
    let data  = form.value
    // send this informations to the service AuthService
    this.as.login(data.email,data.password)
      .then((res) =>{    //if all goes well
        //if user email is verified
        if(res.user?.emailVerified){
          // if user is admin,
          if(data.email=="elobayidoumaima@gmail.com")
          this.router.navigate(['/admin']) //navigate to the daschboard
          else this.router.navigate([''])
        }else{ // if user email is not verified
          this.router.navigate(['/verify-email']) // navigate to the verify-email page
        }
      })
      .catch(err => {
        this.Message = err.message
      })

  }
}
