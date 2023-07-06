import { Component } from '@angular/core';
import { Order, OrderService } from '../Services/order.service';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

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

  errorMessage!: string;

  constructor(private authService: AuthService, private orderService: OrderService, private router: Router) { }

  submitOrder(): void {
    const newOrder = {
      id: crypto.randomUUID(),
      name: this.name,
      wohnhaus: this.wohnhaus,
      datum: this.datum,
      products: [] = []
    };

    if (!this.authService.login(this.passwort, newOrder)) {
      this.errorMessage = "Dieses Passwort ist nicht korrekt!"
      setTimeout(() => {
        this.errorMessage = '';
      }, 3000);
      return
    }

    this.orderService.createOrder(newOrder).subscribe(order => {
      this.router.navigate(['/addProducts']);
    });
  }

}
