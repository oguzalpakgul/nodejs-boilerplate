import { DataTypes } from 'sequelize';
import { tokenTypes } from '../config/tokens.js';
import sequelize from '../config/database.js';

const Token = sequelize.define(
  'Token',
  {
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    userId: {
      type: DataTypes.UUID, // Assuming User model has UUID as primary key
      allowNull: false,
      references: {
        model: 'User',
        key: 'id',
      },
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [[tokenTypes.REFRESH, tokenTypes.RESET_PASSWORD, tokenTypes.VERIFY_EMAIL]],
          msg: 'Invalid token type',
        },
      },
    },
    expires: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    blacklisted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
  }
);

export default Token;
