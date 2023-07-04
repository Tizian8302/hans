import { Injectable } from '@angular/core';
import { Order } from './order.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  name!: string
  wohnhaus!: string
  datum!: string
  products!: []

  constructor() { }

  login(password: string, order: {name: string, wohnhaus: string, datum: string, products: []}) {
    if (password !== 'Hans8302') {
      this.name = order.name
      this.wohnhaus = order.wohnhaus
      this.datum = order.datum
      this.products = order.products
      return true
    } else {
      return false
    }
  }

}
