import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.NEON, {
  dialect: 'postgres',
  logging: false,
});

export default sequelize;
