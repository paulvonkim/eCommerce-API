import { DataTypes } from "sequelize";
import sequelize from "../db/index.js";
import Product from "./Product.js";

const Category = sequelize.define("Category", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

Category.hasMany(Product);
Product.belongsTo(Category);

export default Category;
