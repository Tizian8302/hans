import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../Services/order.service';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent {
  order!: any;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.order = this.authService.getOrder()
  }
}
