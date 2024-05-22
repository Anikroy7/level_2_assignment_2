import express, { Application, Request, Response } from "express";
import cors from "cors";
import productRouter from "./app/modules/product/product.route";
import orderRouter from "./app/modules/order/order.route";
const app: Application = express();

// parser middleware
app.use(express.json());
app.use(cors());

//routes

//For products
app.use("/api/products", productRouter);

//For Orders
app.use("/api/orders", orderRouter);


app.get('*', (req: Request, res: Response) => {
  res.status(404).json({
    "success": false,
    "message": "Route not found"
  });
})

export default app;
