import { DataTypes, Sequelize } from 'sequelize';
import sequelize from '../config/database.js';

// Sequelize model definition
const Module = sequelize.define(
  'Module',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4, // UUIDV4, rastgele UUID üretir
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
      unique: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  }
);

export default Module;
