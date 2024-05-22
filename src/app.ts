import express, { Application, NextFunction, Request, Response } from "express";
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

app.get("/", (req: Request, res: Response) => {
  res.status(404).json({
    success: "Okay",
  });
});

app.get("*", (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

//Global Middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const errorObj = {
    message: err?.message || "Something went wrong",
    status: err?.status || 500,
  };
  res.status(errorObj.status).json(errorObj);
});
export default app;
