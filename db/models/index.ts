import sequelize from '../database';
import Product from './products';
import Purchase from './purchases';
import User from './users';

// Purchase Model
Purchase.belongsTo(Product, { foreignKey: 'productId' });

// Product Model
Product.hasMany(Purchase, { foreignKey: 'productId' });


export { sequelize, Product, Purchase, User };
