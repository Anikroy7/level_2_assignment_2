import { Request, Response } from "express";
import { orderService } from "./order.service";
import orderValidationSchema from "./order.validation";
import { productServices } from "../product/product.service";

const getOrders = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;
    const data = await orderService.getOrderService(email);
    if (data.length > 0) {
      res.status(201).json({
        success: true,
        message: !email
          ? "Orders fetched successfully!"
          : "Orders fetched successfully for user email!",
        data: data,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: "Something went wrong!",
      error,
    });
  }
};

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData: any = req.body;
    const validData = orderValidationSchema.parse(orderData);

    const product = await productServices.getSingleProductService(
      validData.productId,
    );

    if (!product) {
      // return
      // const data = await orderService.createOrderService(validData);
      res.status(201).json({
        success: false,
        message: "Can't find the product!",
      });
    } else {
      if (validData.quantity > product.inventory.quantity) {
        return res.status(403).json({
          success: false,
          message: "Insufficient quantity available in inventory",
        });
      }
      const newQuantity = product.inventory.quantity - validData.quantity;
      const newInventory = {
        quantity: newQuantity,
        inStock: newQuantity > 0,
      };
      const newProduct = {
        ...product?.toObject(),
        inventory: newInventory,
      };
      await productServices.updateProductService(
        product._id.toString(),
        newProduct,
      );
      res.status(201).json({
        success: true,
        message: "Order created successfully!",
        data: { product: product._id, newQuantity },
      });
    }
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: "Something went wrong!",
      error,
    });
  }
};

export const orderController = {
  createOrder,
  getOrders,
};
