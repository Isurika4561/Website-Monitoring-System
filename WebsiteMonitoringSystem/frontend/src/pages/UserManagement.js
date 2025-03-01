import React, { useEffect, useState } from "react";
import axios from "axios";

function UserManagement() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/users")
      .then(response => setUsers(response.data))
      .catch(error => console.error("Error fetching users:", error));
  }, []);

  return (
    <div className="container">
      <h2>User Management</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} ({user.is_admin ? "Admin" : "User"})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserManagement;
