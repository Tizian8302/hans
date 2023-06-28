import { Component } from '@angular/core';
import { OrderService } from '../Services/order.service';

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

  constructor(private orderService: OrderService) {}

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

    this.orderService.createOrder(newOrder)
  }
}
