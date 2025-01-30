import { DataTypes } from "sequelize";
import { categoriesDB } from "../db/index.js";

const Category = categoriesDB.define(
  "Category",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: true,
    tableName: "Categories",
  }
);

export default Category;
