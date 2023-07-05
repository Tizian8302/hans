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