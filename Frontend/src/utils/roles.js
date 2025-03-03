export const roles = {
  Admin: ["add_user", "edit_user", "delete_user", "manage_permissions"],
  Editor: ["edit_content"],
  Viewer: []
};

export const checkPermission = (role, permission) => {
  return roles[role]?.includes(permission);
};
