import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { WeeklyOrder, OrderItem, Order, Product, DBOrder, FullWeeklyOrder } from '../../../../../shared/types';
import { ProductService } from './product.service';
import { environment } from 'src/environments/environment';

const url = environment.apiUrl

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient, private productService: ProductService) { }

  createOrder(newOrder: { id: string, name: string; wohnhaus: string; datum: string; }): Observable<Order> {
    return this.http.post<Order>(`${url}/orders`, newOrder);
  }

  isWohnhausInWeeklyOrder(newOrder: { id: string, name: string; wohnhaus: string; datum: string; }): Observable<boolean> {
    return this.getOrders().pipe(
      map(orders => this.getWeeklyOrders(orders)),
      map(weeklyOrders => {
        const week = this.getWeekStart(newOrder.datum) + '-' + this.getWeekEnd(newOrder.datum);
        const weeklyOrder = weeklyOrders.find(group => group.week === week);
  
        if (weeklyOrder) {
          return weeklyOrder.orders.some(order => order.wohnhaus === newOrder.wohnhaus);
        }
  
        return false;
      })
    );
  }

  getOrders(): Observable<DBOrder[]> {
    return this.http.get<DBOrder[]>(`${url}/orders`).pipe(
      map(orders => {
        orders.forEach(order => {
          order.wohnhausId = parseInt(order.wohnhaus.split(' ')[1]); // Assuming Wohnhaus is in the format "Wohnhaus 1"
        });
        return orders;
      })
    )
  }

  addProductToOrder(productToOrder: OrderItem, order: Order) {
    return this.http.put<OrderItem>(`${url}/orders/${order.id}/products`, productToOrder)
  }

  deleteOrder(id: string): Observable<DBOrder[]> {
    return this.http.delete<DBOrder[]>(`${url}/order/${id}`)
  }

  getWeeklyOrders(orders: DBOrder[]): WeeklyOrder[] {
    const weeklyOrders: WeeklyOrder[] = [];

    orders.forEach(order => {
      const weekStart = this.getWeekStart(order.datum);
      const weekEnd = this.getWeekEnd(order.datum);

      let weekOrderGroup = weeklyOrders.find(
        group => group.week === `${weekStart}-${weekEnd}`
      );

      if (!weekOrderGroup) {
        weekOrderGroup = { week: `${weekStart}-${weekEnd}`, orders: [] };
        weeklyOrders.push(weekOrderGroup);
      }

      weekOrderGroup.orders.push(order);
    });
    return weeklyOrders;
  }

  getFullWeeklyOrder(weeklyOrder: WeeklyOrder): FullWeeklyOrder[] {
    let fullWeeklyOrder: FullWeeklyOrder[] = []

    weeklyOrder.orders.forEach(order => {
      let allProducts: { product: Product; orderAmount: number; }[] = []
      order.products.forEach(item => {
        let productJSON: {
          product: Product,
          orderAmount: number
        }
        this.productService.getProductById(item.productId).subscribe(
          product => {
            if (product) {
              productJSON = {
                product: product,
                orderAmount: item.orderAmount
              }
              allProducts.push(productJSON)
            }
          }
        );
      })
      fullWeeklyOrder.push({
        id: order.id,
        name: order.name,
        wohnhaus: order.wohnhaus,
        datum: order.datum,
        week: weeklyOrder.week,
        products: allProducts,
      });

    })

    return fullWeeklyOrder
  }

  private getWeekStart(dateString: string): string {
    const date = new Date(dateString)
    const dayOfWeek = date.getUTCDay() || 7
    const startOfWeek = new Date(date)
    startOfWeek.setDate(date.getDate() - dayOfWeek + 1)

    return this.formatDate(startOfWeek);
  }

  private getWeekEnd(dateString: string): string {
    const date = new Date(dateString)
    const dayOfWeek = date.getUTCDay() || 7
    const endOfWeek = new Date(date)
    endOfWeek.setDate(date.getDate() - dayOfWeek + 7)
    return this.formatDate(endOfWeek);
  }

  private formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }
}
