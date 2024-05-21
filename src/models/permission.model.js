import { DataTypes, Sequelize } from 'sequelize';
import sequelize from '../config/database.js';

// Sequelize model definition
const Permission = sequelize.define(
  'Permission',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4, // UUIDV4, rastgele UUID üretir
      primaryKey: true,
    },
    view: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    add: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    edit: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    delete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    mask: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    roleId: {
      type: DataTypes.UUID,
      references: {
        model: 'Role',
        key: 'id',
      },
    },
    moduleId: {
      type: DataTypes.UUID,
      references: {
        model: 'Module',
        key: 'id',
      },
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  },
  {
    timestamps: true,
  }
);

export default Permission;
