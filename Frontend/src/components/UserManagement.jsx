import React, { useState } from "react";
import { roles, checkPermission } from "../utils/roles";

const initialUsers = [
  { id: 1, name: "Admin User", role: "Admin" },
  { id: 2, name: "John Doe", role: "Editor" },
  { id: 3, name: "Jane Smith", role: "Viewer" }
];

const UserManagement = ({ currentUserRole }) => {
  const [users, setUsers] = useState(initialUsers);

  // Change Role
  const changeRole = (id, newRole) => {
    setUsers(users.map(user => (user.id === id ? { ...user, role: newRole } : user)));
  };

  // Delete User (Only Admins can delete)
  const deleteUser = (id) => {
    if (checkPermission(currentUserRole, "delete_user")) {
      setUsers(users.filter(user => user.id !== id));
    } else {
      alert("You do not have permission to delete users.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">User Management</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-3">Name</th>
            <th className="border p-3">Role</th>
            <th className="border p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="text-center">
              <td className="border p-3">{user.name}</td>
              <td className="border p-3">
                {checkPermission(currentUserRole, "manage_permissions") ? (
                  <select
                    className="border p-2"
                    value={user.role}
                    onChange={(e) => changeRole(user.id, e.target.value)}
                  >
                    {Object.keys(roles).map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                ) : (
                  user.role
                )}
              </td>
              <td className="border p-3">
                {checkPermission(currentUserRole, "delete_user") && (
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700"
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
