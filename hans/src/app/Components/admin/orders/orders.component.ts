import { Component } from '@angular/core';
import { OrderService } from '../../Services/order.service';
import { Router } from '@angular/router';
import { DBOrder, Order, WeeklyOrder } from '../../../../../../shared/types';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  orders: DBOrder[] = []

  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit(): void {
    this.orderService.getOrders().subscribe(orders => this.orders = orders)
  }

  getWeeklyOrders(): WeeklyOrder[] {
    return this.orderService.getWeeklyOrders(this.orders)
  }

  deleteOrder(id: string) {
    this.orderService.deleteOrder(id).subscribe(orders => this.orders = orders)
  }

  navigateToWeeklyOrder(week: string): void {
    const weeklyOrder = this.getWeeklyOrders().find(group => {
      const [start, end] = group.week.split('-');
      if (group.week == week) {
        return true
      } else {
        return false
      }
    });
    this.orderService.setWeeklyOrder(weeklyOrder as WeeklyOrder)
    this.router.navigate(['/weeklyOrder'])
  }
  
}
