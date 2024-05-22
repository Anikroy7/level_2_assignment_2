import mongodb = require("mongodb");

export type Order = {
    email: string;
    productId: any;
    quantity: number;
    price: number;
}