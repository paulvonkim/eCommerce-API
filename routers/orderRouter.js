import { Router } from "express";
import {
  getOrders,
  createOrder,
  getOrderById,
  updateOrder,
  deleteOrder,
} from "../controllers/orders.js";

const orderRouter = Router();

orderRouter.get("/", getOrders);
orderRouter.post("/", createOrder);
orderRouter.get("/:id", getOrderById);
orderRouter.put("/:id", updateOrder);
orderRouter.delete("/:id", deleteOrder);

export default orderRouter;
