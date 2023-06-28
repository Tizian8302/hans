import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Order {
  id: string
  name: string;
  wohnhaus: string;
  datum: string;
  products: []
}
const port = 3000
const url = `http://localhost:${port}/api`

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) {}

  createOrder(newOrder: { name: string; wohnhaus: string; datum: string; }): Observable<Order[]> {
    return this.http.post<Order[]>(`${url}/orders`, newOrder);
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${url}/orders`)
  }

  deleteOrder(id: string): Observable<Order[]> {
    console.log(`${url}/order/${id}`)
    return this.http.delete<Order[]>(`${url}/order/${id}`)
  }
}
