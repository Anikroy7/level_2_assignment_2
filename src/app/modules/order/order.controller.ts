
import { Order } from "./Order.interface";
import { orderService } from "./order.service";

const createOrder = async (req: Request, res: Response) => {
    try {
        const orderData:any = req.body;
        const data = await orderService.createOrderService(orderData);

        if (data) {
            res.status(201).json({
                "success": true,
                "message": "Products fetched successfully!",
                data: data
            })
        } else {
            res.status(200).json({
                "success": false,
                "message": "Failed to fetched Products!",
                data: data
            })
        }
    } catch (error: any) {
        res.status(404).json({
            success: false,
            message: error.message
        })
    }
}

export const orderController ={
    createOrder
}