import { Request, Response } from "express";
import { productServices } from "./product.service";

const getProducts = async (req: Request, res: Response) => {
    try {
        const data = await productServices.getProductsService();

        if (data) {
            res.status(200).json({
                "success": true,
                "message": "Products fetched successfully!",
                data: data.length
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



const getSingleProduct = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params
        const data = await productServices.getSingleProductService(productId);

        if (data) {
            res.status(200).json({
                "success": true,
                "message": "Product fetched successfully!",
                data: data
            })
        } else {
            res.status(200).json({
                "success": false,
                "message": "Failed to fetched Product!",
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

const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params
        const data = await productServices.deleteProductService(productId);

        if (data.deletedCount > 0) {
            res.status(200).json({
                "success": true,
                "message": "Product deleted successfully!",
                "data": null
            })
        } else {
            res.status(200).json({
                "success": false,
                "message": "Something went wrong!! for delete the product",
                "data": null
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
    getProducts,
    getSingleProduct,
    deleteProduct
}