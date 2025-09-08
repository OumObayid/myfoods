// src/app/services/orders.service.ts
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Good } from '../interfaces/goods.interface';

@Injectable({ providedIn: 'root' })
export class OrdersService {
  constructor(private fs: AngularFirestore) {}

  addOrder(cart: Good[], total: number, userId: string) {
    const order = {
      userId,
      items: cart,
      total,
      createdAt: new Date(),
      status: 'pending'
    };
    return this.fs.collection('orders').add(order);
  }

  getOrdersByUser(userId: string) {
    return this.fs
      .collection('orders', ref => ref.where('userId', '==', userId))
      .snapshotChanges();
  }

  getAllOrders() {
    return this.fs.collection('orders').snapshotChanges();
  }
}
