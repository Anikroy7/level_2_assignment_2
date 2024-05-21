import ProductModel from "./product.model"

const getProductsService = async () => {
    const result = await ProductModel.find();
    return result;
}

const getSingleProductService = async (_id: string) => {
    const result = await ProductModel.findOne({_id});
    return result
}

export const productServices = {
    getProductsService,
    getSingleProductService
}