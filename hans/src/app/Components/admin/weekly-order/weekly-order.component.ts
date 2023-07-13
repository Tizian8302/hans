import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../Services/product.service';
import { OrderService } from '../../Services/order.service';
import { WeeklyOrder } from '../../interfaces/WeeklyOrder';


@Component({
  selector: 'app-weekly-order',
  templateUrl: './weekly-order.component.html',
  styleUrls: ['./weekly-order.component.css']
})
export class WeeklyOrderComponent {
  weeklyOrder!: WeeklyOrder

  constructor(private route: ActivatedRoute, private productService: ProductService, private orderService: OrderService) { }

  ngOnInit(): void {
    this.weeklyOrder = this.orderService.getWeeklyOrder()
  }

  getProductList(): string[] {
    const productList: string[] = [];

    this.productService.getAllProducts().subscribe(products => {
      products.forEach(product => {
        productList.push(product.name)
      });
      
    })
    // this.weeklyOrder.orders.forEach(order => {
    //   order.products.forEach(product => {
    //     if (!productList.includes(product)) {
    //       productList.push(product);
    //     }
    //   });
    // });

    return productList;
  }

  // getAmountForWohnhaus(product: string, wohnhausId: number): number {
  //   const wohnhausOrder = this.weeklyOrder.orders.find(order => order.wohnhausId === wohnhausId);

  //   if (wohnhausOrder) {
  //     const productOrder = wohnhausOrder.products.find(p => p === product);
  //     return productOrder ? productOrder.orderAmount : 0;
  //   }

  //   return 0;
  // }
}
