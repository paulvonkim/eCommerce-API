import { DataTypes } from "sequelize";
import { categoriesDB } from "../db/index.js";

const Category = categoriesDB.define(
  "Category",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
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

try {
  await Category.sync();
  console.log("Category model synced successfully");
} catch (error) {
  console.error("Error syncing Category model:", error);
}

export default Category;
