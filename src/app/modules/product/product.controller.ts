import { Request, Response } from "express";
import { productServices } from "./product.service";
import productValidationSchema from "./product.validation";

const getProducts = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;
    const data = await productServices.getProductsService(searchTerm);
    res.status(200).json({
      success: true,
      message: "Products fetched successfully!",
      data: data,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message || "Something went wrong",
      error,
    });
  }
};

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const data = await productServices.getSingleProductService(productId);
    if (data) {
      res.status(200).json({
        success: true,
        message: "Product fetched successfully!",
        data: data,
      });
    } else {
      res.status(202).json({
        success: false,
        message: "Product not found!!",
        data: data,
      });
    }
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message || "Something went wrong!",
      error,
    });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const data = await productServices.deleteProductService(productId);

    if (data.deletedCount > 0) {
      res.status(200).json({
        success: true,
        message: "Product deleted successfully!",
        data: null,
      });
    } else {
      res.status(200).json({
        success: false,
        message: "Product not found!",
        data: null,
      });
    }
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message || "Something went wrong!",
      error,
    });
  }
};

const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    const validData = productValidationSchema.parse(productData);
    const data = await productServices.createProductService(validData);

    res.status(200).json({
      success: true,
      message: "Product created successfully!",
      data: data,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: "Something went wrong!",
      error,
    });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    const { productId } = req.params;
    const prevProd = await productServices.getSingleProductService(productId);
    const newProduct = {
      ...prevProd?.toObject(),
      ...productData,
    };
    const validData = productValidationSchema.parse(newProduct);
    const data = await productServices.updateProductService(
      productId,
      validData,
    );

    res.status(200).json({
      success: true,
      message: "Product updated successfully!",
      data: data,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: "Something went wrong!",
      error,
    });
  }
};

export const productController = {
  getProducts,
  getSingleProduct,
  deleteProduct,
  createProduct,
  updateProduct,
};
