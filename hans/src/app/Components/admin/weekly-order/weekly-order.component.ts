import { Component } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { OrderService } from '../../Services/order.service';
import { FullWeeklyOrder, Product } from '../../../../../../shared/types';


@Component({
  selector: 'app-weekly-order',
  templateUrl: './weekly-order.component.html',
  styleUrls: ['./weekly-order.component.css']
})
export class WeeklyOrderComponent {
  weeklyOrder!: FullWeeklyOrder[]
  productList: Product[] = []

  constructor(
    private productService: ProductService, 
    private orderService: OrderService) { }

  ngOnInit(): void {
    this.weeklyOrder = this.orderService.getWeeklyOrder()
    this.productService.getAllProducts().subscribe(products => {
      products.forEach(product => {
        this.productList.push(product)
      });
    });
  }

  getUniqueWohnhauses(): string[] {
    const wohnhauses = this.weeklyOrder.map(order => order.wohnhaus);
    return [...new Set(wohnhauses)];
  }
  
  getOrderAmountForWohnhausProduct(wohnhaus: string, product: string): number {
    const order = this.weeklyOrder.find(order => order.wohnhaus === wohnhaus);
    if (order) {
      const orderProduct = order.products.find(p => p.product.name === product);
      if (orderProduct) {
        return orderProduct.orderAmount;
      }
    }
    return 0;
  }
  
  getOrderCostForProduct(product: Product): number {
    let totalCost = 0;
    this.weeklyOrder.forEach(order => {
      order.products.forEach(orderProduct => {
        if (orderProduct.product.id === product.id) {
          totalCost += orderProduct.orderAmount * product.price;
        }
      });
    });
    return totalCost;
  }

  getTotalCostForWohnhaus(wohnhaus: string): number {
    let wohnhausCost = 0;
    this.weeklyOrder.forEach(order => {
      if (order.wohnhaus === wohnhaus) {
        order.products.forEach(orderProduct => {
          const product = this.productList.find(p => p.name === orderProduct.product.name);
          if (product) {
            wohnhausCost += orderProduct.orderAmount * product.price;
          }
        });
      }
    });
    return wohnhausCost;
  }
  
  getTotalCostForAllProducts(): number {
    let totalCost = 0;
    this.weeklyOrder.forEach(order => {
      order.products.forEach(orderProduct => {
        const product = this.productList.find(p => p.name === orderProduct.product.name);
        if (product) {
          totalCost += orderProduct.orderAmount * product.price;
        }
      });
    });
    return totalCost;
  }
  
}
