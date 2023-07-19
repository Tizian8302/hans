import { Component } from '@angular/core';
import { OrderService } from '../Services/order.service';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(private authService: AuthService, 
    private orderService: OrderService, 
    private router: Router,
    private _matSnackBar: MatSnackBar) { }

  submitOrder(): void {
    const newOrder = {
      id: crypto.randomUUID(),
      name: this.name,
      wohnhaus: this.wohnhaus,
      datum: this.datum,
      products: [] = []
    };

    if (!this.authService.login(this.passwort)) {
      this._matSnackBar.open("Dieses Passwort ist nicht korrekt!", "X", {
        duration: 5000
      })
      return
    }

    this.orderService.createOrder(newOrder).subscribe(order => {
      this.router.navigate(['/addProducts'], {queryParams: {id: order.id}});
    });
  }

}
