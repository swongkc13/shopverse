import sequelize from '../utils/db';

import User from './User';
import Product from './Product';


export { User, Product };

export const initModels = async () => {
  await sequelize.sync({ alter: true });
  console.log('All models synced');
};
