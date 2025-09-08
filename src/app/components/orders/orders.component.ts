import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Good } from 'src/app/interfaces/goods.interface';
import firebase from 'firebase/compat/app';

export interface Order {
  items: Good[];
  total: number;
  status: string;
  createdAt: firebase.firestore.Timestamp;
  userId: string;
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: (Order & { id: string })[] = [];
  userId: string | null = null;

  constructor(
    private os: OrdersService,
    private afAuth: AngularFireAuth
  ) { }

  ngOnInit(): void {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;

        this.os.getOrdersByUser(this.userId).subscribe(data => {
          this.orders = data.map(e => {
            const orderData = e.payload.doc.data() as Order;
            return { id: e.payload.doc.id, ...orderData };
          });
        });

      } else {
        this.orders = [];
      }
    });
  }

  // convert Timestamp Firestore en Date
  formatDate(ts: firebase.firestore.Timestamp) {
    return ts?.toDate() || new Date();
  }
}
