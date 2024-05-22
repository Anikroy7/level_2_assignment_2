import { Order } from "./Order.interface";
import OrderModel from "./order.model"

const createOrderService = async (data: Order) => {
    const result = await OrderModel.create(data);
    return result;
}

export const orderService = {
    createOrderService
}