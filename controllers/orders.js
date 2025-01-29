import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({ include: [Product, User] });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createOrder = async (req, res) => {
  try {
    const {
      body: { total },
    } = req;
    if (!total)
      return res
        .status(400)
        .json({ error: "no products to count" });
    
    const order = await Order.create(req.body);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    const order = await Order.findByPk(id, { include: [Product, User] });
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const {
      body: { total },
      params: { id },
    } = req;
    if (!total)
      return res
        .status(400)
        .json({ error: "no total amount provided" });
    const order = await Order.findByPk(id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    await order.update(req.body);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    const order = await Order.findByPk(id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    await order.destroy();
    res.json({ message: "Order deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
