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
    const { userId, products } = req.body;
    const productIds = products.map(product => product.productId);
    const fetchedProducts = await Product.findAll({
      where: { id: productIds },
    });

    if (!fetchedProducts.length) {
      return res.status(400).json({ error: "No valid products found." });
    }

    const productMap = new Map(products.map(product => [product.productId, product.quantity]));
    const total = fetchedProducts.reduce((sum, product) => {
      const quantity = productMap.get(product.id) || 1;
      return sum + product.price * quantity;
    }, 0);

    const order = await Order.create({ userId, total });

    await Promise.all(products.map(async (product) => {
      await order.addProduct(product.productId, { through: { quantity: product.quantity } });
    }));

    const responseOrder = {
      id: order.id,
      userId: order.userId,
      products: products.map(product => ({
        productId: product.productId,
        quantity: product.quantity
      })),
      total
    };

    res.json(responseOrder);
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
