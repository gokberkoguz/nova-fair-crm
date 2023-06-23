import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/users/');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>User List</h2>
      {users.map(user => (
        <div key={user.id}>
          <p>{user.username}</p>
          <p>{user.email}</p>
          {/* Add any other user fields you want to display */}
        </div>
      ))}
    </div>
  );
};

export default UserList;
