
import { Request, Response } from "express";
import { orderService } from "./order.service";
import orderValidationSchema from "./order.validation";
import { productServices } from "../product/product.service";



const getOrders = async (req: Request, res: Response) => {
    try {

        const { email } = req.query
        const data = await orderService.getOrderService(email);
        res.status(201).json({
            "success": true,
            "message": !email ? "Orders fetched successfully!" : "Orders fetched successfully for user email!",
            data: data
        })


    } catch (error: any) {
        res.status(404).json({
            success: false,
            message: "Something went wrong!",
            error,
        });
    }
}


const createOrder = async (req: Request, res: Response) => {
    try {
        const orderData: any = req.body;
        const validData = orderValidationSchema.parse(orderData);

        const isProductExits = await productServices.getSingleProductService(validData.productId)
        console.log(isProductExits, validData.productId);

        if (isProductExits) {
            const data = await orderService.createOrderService(validData);
            res.status(201).json({
                "success": true,
                "message": "Order created successfully!",
                data: data
            })
        } else {
            res.status(201).json({
                "success": false,
                "message": "Can't find the product!",
            })
        }

    } catch (error: any) {
        res.status(404).json({
            success: false,
            message: "Something went wrong!",
            error,
        });
    }
}

export const orderController = {
    createOrder,
    getOrders
}