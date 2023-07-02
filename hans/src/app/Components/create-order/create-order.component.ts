import { Component } from '@angular/core';
import { Order, OrderService } from '../Services/order.service';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent {

  name!: string;
  wohnhaus!: string;
  datum!: string;
  passwort!: string;
  
  successMessage!: string;
  orders: Order[] = [] 

  constructor(private orderService: OrderService) {}

  submitOrder(): void {
    this.createOrder();

    this.name = '';
    this.wohnhaus = '';
    this.datum = '';
    this.passwort = '';

    this.successMessage = 'Die Bestellung wurde erfolgreich aufgegeben';

    setTimeout(() => {
      this.successMessage = '';
    }, 3000); 
  }

  createOrder(): void {
    const newOrder = {
      name: this.name,
      wohnhaus: this.wohnhaus,
      datum: this.datum
    };

    if(this.passwort !== 'Hans8302') {
      console.log('Password incorrect')
      return
    }

    this.orderService.createOrder(newOrder).subscribe(orders => this.orders = orders)
  }
}
