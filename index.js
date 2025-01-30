import express from "express";
import dotenv from "dotenv";
import userRouter from "./routers/userRouter.js";
// import productRouter from "./routers/productRouter.js";
import categoryRouter from "./routers/categoryRouter.js";
import orderRouter from "./routers/orderRouter.js";
import sequelize from "./db/index.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.get("/", (req, res) => res.send("Hello, World!"));
app.use("/users", userRouter);
// app.use("/products", productRouter);
app.use("/api/categories", categoryRouter);
app.use("/orders", orderRouter);

sequelize.sync();
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
