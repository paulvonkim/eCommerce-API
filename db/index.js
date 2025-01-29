import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(process.env.NEON, {
  dialect: "postgres",
  logging: false,
});

export default sequelize;

// Categories DB
export const categoriesDB = new Sequelize(process.env.NEON_CATEGORIES, {
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});
