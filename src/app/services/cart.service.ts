import { AuthService } from './auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Good } from './../interfaces/goods.interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
    //declaration of variables
  cart: Good[] = [];

    //injection of services AngularFirestore(firebase) and AuthService
  constructor(private fs: AngularFirestore, private as: AuthService) { }

  // add cart (when buy) to user. cart is a doccument in collection users
  addToCart(data: Good){
    return this.fs.collection(`users/${this.as.userId}/cart`).add(data);
  }

  // get All carts: (users -> idUser -> cart).snapshotChanges()
  getCart(){
    return this.fs.collection(`users/${this.as.userId}/cart`).snapshotChanges();
  }

  //update amount in a selected cart: (users -> idUser -> cart-> idCart).update(field:value)
  update(id:any, amount:number){
   return this.fs.collection(`users/${this.as.userId}/cart`).doc(id).update({amount:amount});
  }

  // delete cart selected:  (users -> idUser -> cart-> idCart).delete()
  delete(id:any){
      return this.fs.collection(`users/${this.as.userId}/cart`).doc(id).delete();
  }


}
