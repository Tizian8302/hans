import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Order } from '../interfaces/Order';
import { OrderItem } from '../interfaces/OrderItem';
import { WeeklyOrder } from '../interfaces/WeeklyOrder';

const port = 3000
const url = `http://localhost:${port}/api`

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  weeklyOrder!: WeeklyOrder

  constructor(private http: HttpClient) {}

  createOrder(newOrder: { id: string, name: string; wohnhaus: string; datum: string; }): Observable<Order> {
    return this.http.post<Order>(`${url}/orders`, newOrder);
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${url}/orders`).pipe(
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

  deleteOrder(id: string): Observable<Order[]> {
    return this.http.delete<Order[]>(`${url}/order/${id}`)
  }

  getWeeklyOrders(orders: Order[]): { week: string; orders: Order[] }[] {
    const weeklyOrders: { week: string; orders: Order[] }[] = [];

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

  setWeeklyOrder(weeklyOrder: WeeklyOrder) {
    this.weeklyOrder = weeklyOrder
  }

  getWeeklyOrder() {
    return this.weeklyOrder
  }

  private getWeekStart(dateString: string): string {
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    const dayOfWeek = date.getUTCDay() || 7;
  
    const startOfWeek = new Date(date.getTime() - (dayOfWeek - 1) * 24 * 60 * 60 * 1000);
    return this.formatDate(startOfWeek);
  }
  
  private getWeekEnd(dateString: string): string {
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    const dayOfWeek = date.getUTCDay() || 7;
  
    const endOfWeek = new Date(date.getTime() + (7 - dayOfWeek) * 24 * 60 * 60 * 1000);
    return this.formatDate(endOfWeek);
  }  

  private formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }
}
