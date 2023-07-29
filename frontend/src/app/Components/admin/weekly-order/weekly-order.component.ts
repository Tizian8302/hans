import { Component } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { OrderService } from '../../Services/order.service';
import { DBOrder, FullWeeklyOrder, Product, WeeklyOrder } from '../../../../../../shared/types';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, switchMap } from 'rxjs';

@Component({
  selector: 'app-weekly-order',
  templateUrl: './weekly-order.component.html',
  styleUrls: ['./weekly-order.component.css']
})
export class WeeklyOrderComponent {

  weeklyOrder!: FullWeeklyOrder[];
  productList: Product[] = [];
  manufacturers: string[] = [];
  wohnhauses: string[] = [];

  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParamMap.pipe(
      switchMap(params => {
        return forkJoin([
          this.orderService.getOrders(),
          this.productService.getAllProducts(),
        ]);
      })
    ).subscribe(([orders, products]) => {
      let week = this.route.snapshot.queryParamMap.get('week');
      const weeklyOrder = this.getWeeklyOrders(orders).find(group => group.week === week);
  
      this.weeklyOrder = this.orderService.getFullWeeklyOrder(weeklyOrder as WeeklyOrder);
      this.productList = products;
      this.manufacturers = this.getUniqueManufacturers();
      this.wohnhauses = this.getUniqueWohnhauses();
    });
  }

  getWeeklyOrders(orders: DBOrder[]): WeeklyOrder[] {
    return this.orderService.getWeeklyOrders(orders)
  }

  getUniqueManufacturers(): string[] {
    const manufacturers = this.productList.map((product) => product.manufacturer);
    return [...new Set(manufacturers)].sort();
  }

  getProductsByManufacturer(manufacturer: string): Product[] {
    return this.productList.filter((product) => product.manufacturer === manufacturer);
  }

  getUniqueWohnhauses(): string[] {
    const wohnhauses = this.weeklyOrder.map(order => order.wohnhaus);
    return [...new Set(wohnhauses)].sort();
  }

  getOrderAmountForWohnhausProduct(wohnhaus: string, product: string): number {
    const order = this.weeklyOrder.find((order) => order.wohnhaus === wohnhaus);
    if (order) {
      const orderProduct = order.products.find((p) => p.product.name === product);
      if (orderProduct) {
        return orderProduct.orderAmount;
      }
    }
    return 0;
  }

  getOrderAmountForProduct(product: Product): number {
    let totalAmo = 0;
    this.weeklyOrder.forEach((order) => {
      order.products.forEach((orderProduct) => {
        if (orderProduct.product.id === product.id) {
          totalAmo += orderProduct.orderAmount;
        }
      });
    });
    return totalAmo;
  }

  getTotalCostForManufacturerAndWohnhaus(manufacturer: string, wohnhaus: string): number {
    let totalCost = 0;
    this.weeklyOrder.forEach((order) => {
      if (order.wohnhaus === wohnhaus) {
        order.products.forEach((orderProduct) => {
          const product = this.productList.find((p) => p.name === orderProduct.product.name);
          if (product && product.manufacturer === manufacturer) {
            totalCost += orderProduct.orderAmount * product.price;
          }
        });
      }
    });
    return totalCost;
  }  

  getTotalCostForManufacturer(manufacturer: string): number {
    let manufacturerCost = 0;
    this.weeklyOrder.forEach((order) => {
      order.products.forEach((orderProduct) => {
        const product = this.productList.find((p) => p.name === orderProduct.product.name);
        if (product && product.manufacturer === manufacturer) {
          manufacturerCost += orderProduct.orderAmount * product.price;
        }
      });
    });
    return manufacturerCost;
  }

  getTotalCostForAllProducts(): number {
    if (!this.weeklyOrder || this.weeklyOrder.length === 0) {
      return 0;
    }

    let totalCost = 0;
    this.weeklyOrder.forEach((order) => {
      order.products.forEach((orderProduct) => {
        const product = this.productList.find((p) => p.name === orderProduct.product.name);
        if (product) {
          totalCost += orderProduct.orderAmount * product.price;
        }
      });
    });
    return totalCost;
  }
}
