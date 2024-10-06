import React, { useEffect, useState } from 'react';
import { Role, User } from '../types/types';

const ApiUrl=process.env.REACT_APP_API_URL;

const Settings: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState<User>({ id: 0, username: '', email: '', role: Role.USER });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await fetch(`${ApiUrl}/api/users`);
    const data = await response.json();
    setUsers(data);
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser)
    });
    if (response.ok) {
      fetchUsers();
      setNewUser({ id: 0, username: '', email: '', role: Role.USER });
    }
  };

  const handleUpdateUser = async (user: User) => {
    const response = await fetch(`${ApiUrl}/api/users/${user.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });
    if (response.ok) {
      fetchUsers();
    }
  };

  const handleDeleteUser = async (userId: number) => {
    const response = await fetch(`${ApiUrl}/api/users/${userId}`, { method: 'DELETE' });
    if (response.ok) {
      fetchUsers();
    }
  };

  return (
    <div className="settings">
      <h1>Settings</h1>
      <h2>User Management</h2>
      <form onSubmit={handleAddUser}>
        <input
          type="text"
          placeholder="Username"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <select
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value as Role })}
        >
          {Object.values(Role).map((role) => (
            <option key={role} value={role}>{role}</option>
          ))}
        </select>
        <button type="submit">Add User</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <select
                  value={user.role}
                  onChange={(e) => handleUpdateUser({ ...user, role: e.target.value as Role })}
                >
                  {Object.values(Role).map((role) => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </td>
              <td>
                <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Settings;