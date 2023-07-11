import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../../interfaces/Order';

@Component({
  selector: 'app-weekly-order',
  templateUrl: './weekly-order.component.html',
  styleUrls: ['./weekly-order.component.css']
})
export class WeeklyOrderComponent {
  weeklyOrder!: { week: string; orders: Order[]; };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
    const week = params['weeklyOrder'];
  });
  }
}
