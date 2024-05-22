import { Product } from "./product.interface";
import ProductModel from "./product.model";

const getProductsService = async (searchTerm: string | any) => {
  if (searchTerm) {
    return await ProductModel.find({
      name: { $regex: new RegExp(searchTerm, "i") },
    });
  }
  const result = await ProductModel.find();
  return result;
};

const getSingleProductService = async (_id: string) => {
  const result = await ProductModel.findOne({ _id }).exec();
  return result;
};
const deleteProductService = async (_id: string) => {
  const result = await ProductModel.deleteOne({ _id });
  return result;
};

const createProductService = async (data: Product) => {
  const result = await ProductModel.create(data);
  return result;
};

const updateProductService = async (_id: string, product: Product) => {
  const result = await ProductModel.updateOne({ _id }, product);
  return result;
};

export const productServices = {
  getProductsService,
  getSingleProductService,
  deleteProductService,
  createProductService,
  updateProductService,
};
