import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../Services/order.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent {
  order!: any;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params && Object.keys(params).length > 0) {
        this.order = params as Order;
        console.log('HELP ME IM DEAD INSIDE', this.order)
      }
    });
  }
}
