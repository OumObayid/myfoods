import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { Good } from 'src/app/interfaces/goods.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  //declaration of variables
  isOpen: boolean = false; // parametre for navigation mobile
  isUser: boolean = false; // if user is user
  isAdmin: boolean = false; // if user is admin
  cart: Good[] = []; // array to store cart product
  cartCount: number = 0; // number of cart product
  userName:string =""; // user name
  userId:string =""; // user id

  //injection of services and packages
  constructor(
    private as: AuthService,
    private afAuth: AngularFireAuth,
    private router: Router,
    private cs: CartService,
    private fs: AngularFirestore
  ) {}

  ngOnInit(): void {
    //get user from the service
    this.afAuth.user.subscribe((user) => {
      if (user) { // if user is loging
        this.isUser = true;
        this.as.userId = user.uid;
        this.userId=user.uid;
        if (user.email == 'elobayidoumaima@gmail.com') { // if user is admin
          this.isAdmin = true;
        } else {   // if user is note admin
          this.isAdmin = false;
        }
        //get user name
        this.fs.collection(`users`).doc(this.as.userId).snapshotChanges().subscribe(data=>{
         this.userName=data.payload.get('name');
      })
       // get all cart product for this user and store it in array cart
        this.cs.getCart().subscribe((data) => {
          this.cart = data.map((element) => {
            return {
              id: element.payload.doc.id,
              name: element.payload.doc.get('name'),
              price: element.payload.doc.get('price'),
              amount: element.payload.doc.get('amount'),
              photoUrl: element.payload.doc.get('photoUrl'),
            };
          });
          this.cartCount = this.cart.length; // get number of cart product
        });
      } else {
        this.isUser = false;
        this.as.userId = '';
      }
    });
  }

  //we create the event that adds or removes the "show" class in navigation mobile
  toggleNavbar() {
    this.isOpen = !this.isOpen;
  }

  // for log out
  logout() {
    this.isAdmin = false;
    this.isUser = false;
    this.as.logout().then(() => {
      this.router.navigate(['']).then(()=>{
        localStorage.removeItem('token');
        window.location.reload()
      })
    });
  }
}
