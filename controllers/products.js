import Product from "../models/Product.js";

// Get all products (optional filtering by categoryId)
export const getProducts = async (req, res) => {
  try {
    const { categoryId } = req.query;
    const whereClause = categoryId ? { where: { categoryId } } : {};
    const products = await Product.findAll(whereClause);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving products", error });
  }
};

// Get a product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving product", error });
  }
};

// Create a new product
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, categoryId } = req.body;
    const newProduct = await Product.create({ name, description, price, categoryId });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: "Error creating product", error });
  }
};

// Update a product by ID
export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, categoryId } = req.body;
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    await product.update({ name, description, price, categoryId });
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: "Error updating product", error });
  }
};

// Delete a product by ID
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    await product.destroy();
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
};