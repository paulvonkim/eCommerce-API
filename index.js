import express from "express";
import './db/associations.js';
import userRouter from "./routers/userRouter.js";
import productRouter from "./routers/productRouter.js";
import categoryRouter from "./routers/categoryRouter.js";
import orderRouter from "./routers/orderRouter.js";

const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.get("/", (req, res) => res.send("Hello, World!"));
app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/categories", categoryRouter);
app.use("/orders", orderRouter);

app.listen(port, () => console.log(`Server is running on port ${port}`));
