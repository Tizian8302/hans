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

  orders: Order[] = [] 

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

    this.orderService.createOrder(newOrder).subscribe(orders => this.orders = orders)
  }

  deleteOrder(id: string) {
    this.orderService.deleteOrder(id).subscribe(orders => this.orders = orders)
  }

  ngOnInit(): void {
    this.orderService.getOrders().subscribe(orders => this.orders = orders)
  }
}
