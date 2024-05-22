import express from "express";
import { productController } from "./product.controller";

const router = express.Router();

router
  .route("/")
  .get(productController.getProducts)
  .post(productController.createProduct);
router.route("/:productId").get(productController.getSingleProduct);
router.route("/:productId").delete(productController.deleteProduct);
router.route("/:productId").put(productController.updateProduct);

export default router;
