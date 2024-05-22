import express, { Application } from "express";
import { orderController } from "./order.controller";

const router = express.Router();

router.route('/').get(orderController.createOrder)

export default router;