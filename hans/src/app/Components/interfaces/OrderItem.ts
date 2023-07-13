import { Product } from "./Product";

export interface OrderItem {
    product: Product,
    orderAmount: number
  }