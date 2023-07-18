import { Component } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { OrderService } from '../../Services/order.service';
import { FullWeeklyOrder } from '../../../../../../shared/types';


@Component({
  selector: 'app-weekly-order',
  templateUrl: './weekly-order.component.html',
  styleUrls: ['./weekly-order.component.css']
})
export class WeeklyOrderComponent {
  weeklyOrder!: FullWeeklyOrder[]
  productList: string[] = []

  constructor(
    private productService: ProductService, 
    private orderService: OrderService) { }

  ngOnInit(): void {
    this.weeklyOrder = this.orderService.getWeeklyOrder()
    this.productService.getAllProducts().subscribe(products => {
      products.forEach(product => {
        this.productList.push(product.name)
      });
    });
  }
}
