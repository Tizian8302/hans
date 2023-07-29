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

    if (newOrder) {
      this.orderService.isWohnhausInWeeklyOrder(newOrder).subscribe(result => {
        if (result) {
          // An order for the specific wohnhaus exists in the same week.
          this._matSnackBar.open('Für dieses Wohnhaus wurde in dieser Woche bereits eine Bestellung erstellt.', 'Close');
        } else {
          // The order for the specific wohnhaus doesn't exist in the same week, create the order.
          this.orderService.createOrder(newOrder).subscribe(order => {
            this.router.navigate(['/addProducts'], { queryParams: { id: order.id } });
          });
        }
      });
    } else {
      this._matSnackBar.open('Ungültige Bestellungsdaten.', 'Close');
    }    
  }

}
