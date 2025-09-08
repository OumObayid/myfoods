import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Good } from 'src/app/interfaces/goods.interface';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {
  cart: Good[] = [];
  total = 0;
  cartCount = 0;
  userId: string | null = null;

  constructor(
    private cs: CartService,
    private os: OrdersService,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    // récupérer l'utilisateur connecté
    this.afAuth.authState.subscribe(user => {
      this.userId = user ? user.uid : null;
    });

    // récupérer les produits du panier
    this.cs.getCart().subscribe((data) => {
      this.cart = data.map((element) => ({
        id: element.payload.doc.id,
        name: element.payload.doc.get('name'),
        price: element.payload.doc.get('price'),
        amount: element.payload.doc.get('amount'),
        photoUrl: element.payload.doc.get('photoUrl')
      }));

      this.total = 0;
      this.cart.forEach(el => {
        this.total += el.amount * el.price;
      });
      this.cartCount = this.cart.length;
    });
  }

// update amount of product
  update(id:any,amount:any){
    this.total=0;
    this.cs.update(id,amount).then(()=>{
      //calculation of the price of all products purchased
      this.cart.forEach(element=>{
        this.total =this.total + (element.amount * element.price)
      })
    });

  }
  // delete a product
  delete(id:any){
    this.cs.delete(id).then(()=>{
      //calculation of  the price of all products purchased
      this.total=0;
      this.cart.forEach(element=>{
        this.total =this.total + (element.amount * element.price)
      })
    });
  }
  // ➡️ Nouvelle méthode pour passer la commande
  placeOrder() {
    if (!this.userId) {
      alert('Vous devez être connecté pour passer une commande.');
      return;
    }

    if (this.cart.length === 0) {
      alert('Votre panier est vide.');
      return;
    }

    this.os.addOrder(this.cart, this.total, this.userId).then(() => {
      alert('Commande passée avec succès ✅');
      // vider le panier si tu veux
      this.cart.forEach(item => this.cs.delete(item.id));
    });
  }
}
