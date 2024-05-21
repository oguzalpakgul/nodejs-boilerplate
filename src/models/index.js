import sequelize from '../config/database.js';
import config from '../config/config.js';
import User from './user.model.js';
import Token from './token.model.js';
import AppInfo from './appInfo.model.js';
import Module from './module.model.js';
import Role from './role.model.js';
import Permission from './permission.model.js';

export { User, Token, AppInfo, Module, Role, Permission };

async function syncDatabase() {
  try {
    if (config.force_db) {
      await sequelize.sync({ force: true });

      const module_appInfo = await module.exports.Module.create({ name: 'appInfo' });
      const module_user = await module.exports.Module.create({ name: 'user' });
      const module_module = await module.exports.Module.create({ name: 'module' });
      const module_permission = await module.exports.Module.create({ name: 'permission' });
      const module_role = await module.exports.Module.create({ name: 'role' });

      const role_default = await module.exports.Role.create({ name: 'default' });
      const role_developer = await module.exports.Role.create({ name: 'developer' });

      const permission_model = {
        view: true,
        add: true,
        edit: true,
        delete: true,
        mask: false,
        roleId: role_developer.id,
        moduleId: '',
        status: 1,
      };
      permission_model.moduleId = module_appInfo.id;
      await module.exports.Permission.create(permission_model);

      permission_model.moduleId = module_user.id;
      await module.exports.Permission.create(permission_model);

      permission_model.moduleId = module_module.id;
      await module.exports.Permission.create(permission_model);

      permission_model.moduleId = module_permission.id;
      await module.exports.Permission.create(permission_model);

      permission_model.moduleId = module_role.id;
      await module.exports.Permission.create(permission_model);
    } else {
      sequelize.sync().then(() => console.log('Veritabanı senkronizasyonu başarıyla tamamlandı.'));
    }
  } catch (error) {
    console.error('Veritabanı senkronizasyonunda bir hata oluştu:', error);
  }
}

syncDatabase();
