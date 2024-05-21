import { Op } from 'sequelize';
import ApiError from '../utils/ApiError.js';
import httpStatus from 'http-status';

const sequelizeFilter = (bodyFilter) => {
  const filter = {
    [Op.and]: [],
  };
  if (bodyFilter.length > 20) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Array length exceeded');
  }

  bodyFilter.forEach((condition) => {
    const fields = condition.fields;
    const values = condition.values;
    const operator = getSequelizeOperator(condition.condition);
    if (fields.length > 20 || values.length > 20) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Array length exceeded');
    }
    if (fields && values && operator) {
      const fieldCondition = {
        [Op.or]: [],
      };
      fields.forEach((field) => {
        values.forEach((value) => {
          value =
            condition.condition == '%='
              ? `%${value}`
              : condition.condition == '%=%'
              ? `%${value}%`
              : condition.condition == '=%'
              ? `${value}%`
              : value;

          const fieldItem = {
            [field]: {
              [operator]: value,
            },
          };
          fieldCondition[Op.or].push(fieldItem);
        });
      });
      filter[Op.and].push(fieldCondition);
    }
  });

  return filter;
};

const getSequelizeOperator = (condition) => {
  switch (condition) {
    case '==':
      return Op.eq;
    case '!=':
      return Op.ne;
    case '<':
      return Op.lt;
    case '<=':
      return Op.lte;
    case '>':
      return Op.gt;
    case '>=':
      return Op.gte;
    case '%=':
      return Op.iLike;
    case '=%':
      return Op.iLike;
    case '%=%':
      return Op.iLike;
    default:
      return Op.eq;
  }
};

export { sequelizeFilter };
