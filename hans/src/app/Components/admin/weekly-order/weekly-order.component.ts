import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../../interfaces/Order';
import { OrderItem } from '../../interfaces/OrderItem';
import { ProductService } from '../../Services/product.service';

@Component({
  selector: 'app-weekly-order',
  templateUrl: './weekly-order.component.html',
  styleUrls: ['./weekly-order.component.css']
})
export class WeeklyOrderComponent {
  weeklyOrder!: { week: string; orders: Order[]; };

  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.weeklyOrder = params['weeklyOrder'];
    });
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
