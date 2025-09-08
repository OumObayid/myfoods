import { CartService } from './../../services/cart.service';
import { GoodsService } from './../../services/goods.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Good } from 'src/app/interfaces/goods.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {

  //declaration of variables
  //Good[] or Array<Good> it an interface created to indicate the types of fields (see the good interface)
  goods: Good[] = [];
  goodsObservable: Subscription | undefined;
  add: number = -1; //

  constructor(private gs: GoodsService, private cs: CartService) {}

  ngOnInit(): void {
    //Subscription observable consumes memory, it must be destroyed when leaving the page
    //get all goods and store it in array goods
    this.goodsObservable = this.gs.getAllGoods().subscribe((data) => {
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
 //destroy the subscription
  ngOnDestroy(): void {
    this.goodsObservable?.unsubscribe();
  }

  // increment this variable if we click on the button add to cart
  addToCart(index: number) {
    this.add = +index;
  }

  //add the chosen product in the cart
  buy(amount: string) {
    let selectedGood = this.goods[this.add];
    let data = {
      name: selectedGood.name,
      amount: +amount,
      price: selectedGood.price,
      photoUrl: selectedGood.photoUrl,
    };
    if(data.amount>0)
    this.cs.addToCart(data).then(() => (this.add = -1));

  }
}
