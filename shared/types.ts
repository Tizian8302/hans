export type newOrderRequestBody = {
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