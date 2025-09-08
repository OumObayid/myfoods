import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root',
})

export class GoodsService {

  //injection of service of  AngularFirestore (database firebase) and AngularFireStorage (store for file)
  constructor(
    private fs: AngularFirestore,private storage: AngularFireStorage
  ) {}

  //get all goods by AngularFirestore by : collection().snapshotChanges()
  getAllGoods() {
    return this.fs.collection('goods').snapshotChanges();
  }

  // add new good: first we must store image in AngularFireStorage, after we must add info of new good in database
  addNewGood(name: any, price: number, image: File) {
    let ref = this.storage.ref('goods/' + image.name);
    ref.put(image).then(() => {
      ref.getDownloadURL().subscribe((photoUrl: any) => {
       console.log(photoUrl);
        this.fs.collection('goods').add({ name, price, photoUrl });
      });
    });
  }

// delete good selected
  delete(id: any) {
    var ok = confirm("Are you sure to delete this good ?");
    if(ok){
      this.fs.collection('goods').doc(id).delete();
    }

  }
}
