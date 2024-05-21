import ProductModel from "./product.model"

const getProductsServices = async () => {
    const result = await ProductModel.find();
    return result;
}


export const productServices= {
    getProductsServices
}