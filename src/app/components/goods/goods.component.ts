import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Good } from 'src/app/interfaces/goods.interface';
import { GoodsService } from 'src/app/services/goods.service';

@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.css'],
})
export class GoodsComponent implements OnInit {

  //declaration of variables
  goods: Good[] = []; // declare an array to store the products in it
  @ViewChild('image') img: ElementRef | any; //get the value of a form field

  //injection of services and packages
  constructor(private gs: GoodsService) {}

  ngOnInit(): void {
    //get all products in cart
    this.gs.getAllGoods().subscribe((data) => {
      this.goods = data.map((element) => {
        return {
          id: element.payload.doc.id,
          name: element.payload.doc.get('name'),
          price: element.payload.doc.get('price'),
          photoUrl: element.payload.doc.get('photoUrl'),
        };
      });
    });
  }

  // add a new good
  addNewGood(form: NgForm) {
    // get informations from the form
    let name= (<Good>form.value).name,
        price= (<Good>form.value).price,
        image=this.img?.nativeElement.files[0];
        this.gs.addNewGood(name,price,image);
        form.reset();
  }

 // delete a good selected
  delete(id:any){
    this.gs.delete(id);

  }
}
