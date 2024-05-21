import express from "express";
import { productController } from "./product.controller";

const app = express();

const router = express.Router();

router.route("/").get(productController.getProducts);

export default router;