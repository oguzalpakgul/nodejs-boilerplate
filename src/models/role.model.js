import { DataTypes, Sequelize } from 'sequelize';
import sequelize from '../config/database.js';

// Sequelize model definition
const Role = sequelize.define(
  'Role',
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
    score: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default Role;
