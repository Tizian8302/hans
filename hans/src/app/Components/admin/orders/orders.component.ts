import { Component } from '@angular/core';
import { OrderService } from '../../Services/order.service';
import { Order } from '../../interfaces/Order';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  orders: Order[] = [] 
  weeklyOrders: { week: string; orders: Order[]; }[] = [];
  selectedWeekIndex: number | null = null;

  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit(): void {
    this.orderService.getOrders().subscribe(orders => this.orders = orders)
  }

  getWeeklyOrders(): { week: string; orders: Order[] }[] {
    return this.orderService.getWeeklyOrders(this.orders)
  }

  deleteOrder(id: string) {
    this.orderService.deleteOrder(id).subscribe(orders => this.orders = orders)
  }

  navigateToWeekOrders(week: string): void {
    const weeklyOrder = this.orderService.getWeeklyOrders(this.orders).find(group => {
      const [start, end] = group.week.split('-');
      console.log('week', group.week)
      console.log('start, end', start, end)
      if (group.week == week) {
        return true
      } else {
        return false
      }
    });
    this.router.navigate(['/weeklyOrder', weeklyOrder])
    console.log('weekly order', weeklyOrder)
  }
  
}
