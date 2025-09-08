import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-switch-confirm-email-pass',
  templateUrl: './switch-confirm-email-pass.component.html',
  styleUrls: ['./switch-confirm-email-pass.component.css']
})
export class SwitchConfirmEmailPassComponent implements OnInit {

  // get email verification mode
  mode = this.activatedActivated.snapshot.queryParams['mode'];

  //injection of services and packages
  constructor(private activatedActivated: ActivatedRoute) { }

  ngOnInit(): void {

  }

}

//the reactive code is in page view
