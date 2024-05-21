const allRoles = {
  user: [],
  admin: ['getUsers', 'manageUsers', 'view', 'add', 'edit', 'delete'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

export { roles, roleRights };
