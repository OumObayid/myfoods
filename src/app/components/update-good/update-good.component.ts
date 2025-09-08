import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-update-good',
  templateUrl: './update-good.component.html',
  styleUrls: ['./update-good.component.css']
})
export class UpdateGoodComponent implements OnInit {
   //declaration of variables
  id:string=""; //good id
  name:string=""; // good name
  price:number=0; // good price
  photoUrl:string=""; // good image name

  percentageVal!: Observable<any>;
  task!: AngularFireUploadTask;


//recuperer la valeur d'un champ de la form
@ViewChild('image') img: ElementRef | any;
  constructor(private route: ActivatedRoute,private db: AngularFirestore,private storage: AngularFireStorage,private fs: AngularFirestore,private router: Router
    ) { }

  ngOnInit(): void {
    // First get the product id from the current route.
    this.id = this.route.snapshot.params['id'];

    //get all goods name, price and image
    this.db.collection('goods').doc(this.id).snapshotChanges().subscribe(data=>{
          this.name= data.payload.get('name'),
          this.price = data.payload.get('price'),
          this.photoUrl = data.payload.get('photoUrl')
      });
  }

  // update good selected
  updateGood(form: NgForm) {
    // get informations from the form
    let name= (form.value).name,
        price= (form.value).price,
        image=this.img?.nativeElement.files[0];

        // if image is selected by field File
        if (image) {
          // The storage path
          const path = 'goods/' + image.name;
          // Reference to storage bucket in firebase
          const  ref = this.storage.ref(path);
          // The main task
          this.task = this.storage.upload(path, image);

          this.percentageVal = this.task.percentageChanges();

          //put image in storage firebase
          ref.put(image).then(() => {
            ref.getDownloadURL().subscribe((photoUrl) => {
              this.fs
                .collection('goods')
                .doc(this.id)
                .update({ name: name, price: price, photoUrl: photoUrl }) // update info in firestore database
                .then(() => {
                  this.router.navigate(['/admin']); // navigate to dashboard page
                });
            });
          });
          // if image is not selected by field File
        } else {
          this.fs
            .collection('goods')
            .doc(this.id)
            .update({ name: name, price: price }) //update info in firestore database
            .then(() => {
              this.router.navigate(['/admin']); // navigate to dashboard page
            });
        }
  }
}
