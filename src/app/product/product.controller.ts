import { Request, Response } from "express";
import { productServices } from "./product.service";

const getProducts = async (req: Request, res: Response) => {
    try {
        const data = await productServices.getProductsServices();

        if (data) {
            res.status(200).json({
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

export const productController = {
    getProducts
}