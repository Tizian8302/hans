import { Component } from '@angular/core';
import { OrderService } from '../../Services/order.service';
import { Order } from '../../interfaces/Order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  orders: Order[] = [] 
  selectedWeekIndex: number | null = null;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.getOrders().subscribe(orders => this.orders = orders)
  }

  getWeeklyOrders(): { week: string; orders: Order[] }[] {
    const weeklyOrders: { week: string; orders: Order[] }[] = [];

    this.orders.forEach(order => {
      const weekStart = this.getWeekStart(order.datum);
      console.log('week start', weekStart)
      const weekEnd = this.getWeekEnd(order.datum);
      console.log('week end', weekEnd)

      let weekOrderGroup = weeklyOrders.find(
        group => group.week === `${weekStart}-${weekEnd}`
      );

      if (!weekOrderGroup) {
        weekOrderGroup = { week: `${weekStart}-${weekEnd}`, orders: [] };
        weeklyOrders.push(weekOrderGroup);
      }

      weekOrderGroup.orders.push(order);
    });
    console.log(weeklyOrders)

    return weeklyOrders;
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

  navigateToWeekOrders(week: string): void {
    const weekIndex = this.getWeeklyOrders().findIndex(group => {
      const [start, end] = group.week.split('-');
      return this.isSameWeek(start, end, week);
    });
    this.selectedWeekIndex = weekIndex !== -1 ? weekIndex : null;
    console.log(this.selectedWeekIndex)
  }

  private isSameWeek(start: string, end: string, targetWeek: string): boolean {
    const [startDay, startMonth, startYear] = start.split('.').map(Number);
    const [endDay, endMonth, endYear] = end.split('.').map(Number);
    const [targetStartDay, targetStartMonth, targetStartYear] = targetWeek.split('.').map(Number);

    const startDate = new Date(startYear, startMonth - 1, startDay);
    const endDate = new Date(endYear, endMonth - 1, endDay);
    const targetStartDate = new Date(targetStartYear, targetStartMonth - 1, targetStartDay);

    return (
      startDate.getTime() === targetStartDate.getTime() &&
      endDate.getTime() === targetStartDate.getTime() + (6 * 24 * 60 * 60 * 1000)
    );
  }

  deleteOrder(id: string) {
    this.orderService.deleteOrder(id).subscribe(orders => this.orders = orders)
  }
  
}
