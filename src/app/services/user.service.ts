import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //injection of service of  AngularFirestore
  constructor(private fs: AngularFirestore) { }

  // add new user by AngularFirestore
  addNewUser(id: any, name: any, adress: any){
    return this.fs.doc('users/' + id).set({
       name,
       adress
     })
  }
}
