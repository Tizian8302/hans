export type newOrderRequestBody = {
    name: string;
    wohnhaus: string;
    datum: Date;
}

export type newProductRequestBody = {
    name: string,
    type: string,
    price: number,
    manufacturer: string,
    quantityType: string
}