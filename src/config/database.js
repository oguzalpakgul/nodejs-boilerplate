import { Sequelize } from 'sequelize';
import config from './config.js';

const sequelize = new Sequelize(config.postgre.name, config.postgre.user_name, config.postgre.password, {
  host: config.postgre.host,
  port: config.postgre.port,
  dialect: 'postgres',
  define: {
    freezeTableName: true,
    paranoid: true,
  },
});

export default sequelize;
