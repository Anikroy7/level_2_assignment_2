import express, { Application, Request, Response } from "express";
import cors from "cors";
import ProductModel from "./app/product/product.model";
import productRouter from "./app/product/product.route";
const app: Application = express();

// parser middleware
app.use(express.json());
app.use(cors());


//routes
app.use('/api/products', productRouter)

app.get("/", async (req: Request, res: Response) => {
  const data = await ProductModel.find();
  res.send(data);
});

export default app;
