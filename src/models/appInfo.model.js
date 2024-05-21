import { DataTypes, Sequelize } from 'sequelize';
import sequelize from '../config/database.js';

// Sequelize model definition
const AppInfo = sequelize.define(
  'AppInfo',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4, // UUIDV4, rastgele UUID üretir
      primaryKey: true,
    },
    os: {
      type: DataTypes.STRING,
    },
    version: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
      lowercase: true,
    },
    update_type: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

export default AppInfo;
