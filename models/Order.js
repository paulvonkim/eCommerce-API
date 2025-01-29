import { DataTypes } from "sequelize";
import sequelize from "../db/index.js";
import Product from "./Product.js";
import User from "./User.js";

const Order = sequelize.define("Order", {
  total: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

User.hasMany(Order, {
  foreignKey: {
    allowNull: false,
    name: "userId",
  },
});

Order.belongsTo(User, {
  foreignKey: {
    allowNull: false,
    name: "userId" },
  onDelete: "CASCADE",
});

// Order.hasMany(Product, {
//   foreignKey: {
//     allowNull: false,
//     name: "orderId",
//   },
// });

// Product.belongsTo(Order, {
//   foreignKey: {
//     allowNull: false,
//     name: "orderId",
//   },
//   onDelete: "CASCADE",
// });

export default Order;
