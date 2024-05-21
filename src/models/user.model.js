import bcrypt from 'bcryptjs';
import sequelize from '../config/database.js';
import { roles } from '../config/roles.js';
import { Sequelize, DataTypes } from 'sequelize';

const User = sequelize.define(
  'User',
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
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
      validate: {
        len: [8, undefined],
        isPassword(value) {
          if (!/\d/.test(value) || !/[a-zA-Z]/.test(value)) {
            throw new Error('Password must contain at least one letter and one number');
          }
        },
      },
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'user',
      validate: {
        isIn: [roles],
      },
    },
    roleId: {
      type: DataTypes.UUID,
      references: {
        model: 'Role',
        key: 'id',
      },
    },
    isEmailVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
    hooks: {
      beforeSave: async (user) => {
        if (user.changed('password')) {
          user.password = await bcrypt.hash(user.password, 8);
        }
      },
    },
  }
);

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {string} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
User.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ where: { email, id: { [Sequelize.Op.not]: excludeUserId } } });
  return !!user;
};

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
User.prototype.isPasswordMatch = async function (password) {
  return bcrypt.compare(password, this.password);
};

export default User;
