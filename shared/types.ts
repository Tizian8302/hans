export type newOrderRequestBody = {
    id: string;
    name: string;
    wohnhaus: string;
    datum: Date;
}

export type newProductRequestBody = {
    id: string,
    name: string,
    type: string,
    price: number,
    manufacturer: string,
    quantityType: string
}

export interface Order {
    id: string
    name: string;
    wohnhausId: number;
    wohnhaus: string;
    datum: string;
    products: Product[];
    week: string;
}

export interface Product {
    id: string,
    name: string,
    type: string,
    price: number,
    manufacturer: string,
    quantityType: string,
}

export interface OrderItem {
    product: Product,
    orderAmount: number
}

export interface DBProduct {
    productId: string,
    orderAmount: number
}

export interface DBOrder {
    id: string,
    name: string,
    wohnhaus: string,
    wohnhausId: number,
    datum: string,
    products: DBProduct[]
}

export interface FullWeeklyOrder {
    id: string;
    name: string;
    wohnhaus: string;
    datum: string;
    week: string;
    products: {
        product: Product,
        orderAmount: number
    }[]
}
export interface WeeklyOrder {
    week: string; orders: DBOrder[];
}  