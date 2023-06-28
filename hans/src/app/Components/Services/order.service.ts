import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) {}

  createOrder(newOrder: { name: string; wohnhaus: string; datum: string; }) {
    this.http.post('http://localhost:3000/api/orders', newOrder)
    console.log('Successfully created new order for ', newOrder.name)
    return
  }

}
