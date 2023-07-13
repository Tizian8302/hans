import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  id!: string
  name!: string
  wohnhaus!: string
  datum!: string
  products!: []

  constructor() { }

  login(password: string, order: {id: string, name: string, wohnhaus: string, datum: string, products: []}) {
    if (password == environment.password) {
      this.id = order.id
      this.name = order.name
      this.wohnhaus = order.wohnhaus
      this.datum = order.datum
      this.products = order.products
      return true
    } else {
      return false
    }
  }

  adminLogin(username: any, password: any): Boolean {
    if (username === 'admin' && password === environment.adminPassword) {
      return true
    } else {
      return false
    }
  }

  getOrder() {
    return {
      id: this.id,
      name: this.name,
      wohnhaus: this.wohnhaus,
      datum: this.datum,
      products: this.products
    }
  }

}
