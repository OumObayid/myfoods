import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent implements OnInit {

  //declaration of variables
  verified:boolean=false; //we use this variable in the view page to distinguish the messages to be displayed

  //injection of services and packages
  constructor(private afAuth: AngularFireAuth, private route: ActivatedRoute) {}

  ngOnInit(): void {
    //Get code as a parameter in the email verification link
    const code = this.route.snapshot.queryParams['oobCode'];
    //Avtive confirmation by this code
    this.afAuth.applyActionCode(code)
  .then(() => {
    this.verified=true
    })
  .catch(err => {
    this.verified=false
  });

    }

}
