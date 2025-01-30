import sequelize from './index.js';
import Order from '../models/Order.js';
import User from '../models/User.js';
import Product from '../models/Product.js';

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

Product.belongsToMany(Order, {
  through: 'OrderProducts',
  foreignKey: {
    name: "productId",
    allowNull: false,
  },
  otherKey: {
    name:'orderId',
    allowNull: false,
  }
});

(async () => {
  try {
    await sequelize.sync({ force: false });
    console.log("Database synced.");
  } catch (error) {
    console.error("Error syncing database:", error);
  }
})();