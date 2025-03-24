import { useEffect, useState } from 'react';
import instance from '../api/axios';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', role: 'user' });
  const { isAdmin } = useAuth();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('bearer_token');
      const response = await instance.get('/api/admin/users', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setUsers(response.data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      const token = localStorage.getItem('bearer_token');
      await instance.delete(`/api/admin/users/${userId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchUsers(); // Refresh list
    } catch (err) {
      console.error('Failed to delete user:', err);
    }
  };

  const startEditing = (user) => {
    setEditingUser(user.id);
    setEditForm({ name: user.name, role: user.role });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const saveEdit = async (userId) => {
    try {
      const token = localStorage.getItem('bearer_token');
      await instance.put(`/api/admin/users/${userId}`, editForm, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setEditingUser(null);
      fetchUsers(); // Refresh
    } catch (err) {
      console.error('Failed to update user:', err);
    }
  };

  if (!isAdmin) return <Navigate to="/" />;

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-100">
      <header className="bg-white shadow-md p-6 text-center">
        <h2 className="text-3xl font-bold text-blue-700">User Management - Admin Panel</h2>
      </header>

      <div className="flex-grow flex justify-center p-6">
        <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-6 overflow-x-auto text-gray-900">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-3">ID</th>
                <th className="border p-3">Name</th>
                <th className="border p-3">Email</th>
                <th className="border p-3">Role</th>
                <th className="border p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center p-4 text-gray-500">No users found.</td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id}>
                    <td className="border p-3">{user.id}</td>
                    <td className="border p-3">
                      {editingUser === user.id ? (
                        <input
                          type="text"
                          name="name"
                          value={editForm.name}
                          onChange={handleEditChange}
                          className="border p-1 w-full"
                        />
                      ) : (
                        user.name
                      )}
                    </td>
                    <td className="border p-3">{user.email}</td>
                    <td className="border p-3">
                      {editingUser === user.id ? (
                        <select
                          name="role"
                          value={editForm.role}
                          onChange={handleEditChange}
                          className="border p-1 w-full"
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </select>
                      ) : (
                        user.role
                      )}
                    </td>
                    <td className="border p-3">
                      {editingUser === user.id ? (
                        <button
                          onClick={() => saveEdit(user.id)}
                          className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                        >Save</button>
                      ) : (
                        <button
                          onClick={() => startEditing(user)}
                          className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                        >Edit</button>
                      )}
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
