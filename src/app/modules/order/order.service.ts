
import { Order } from "./order.interface";
import OrderModel from "./order.model"

const createOrderService = async (data: Order) => {

    const result = await OrderModel.create(data);
    return result;
}

const getOrderService = async (email: string | any) => {

    if (email) {
        return await OrderModel.find({ email });
    } else {
        return OrderModel.find()
    }

}

export const orderService = {
    createOrderService,
    getOrderService
}