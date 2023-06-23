import React, { useState, useEffect } from 'react';

function MatchUserCustomer() {
  const [customers, setCustomers] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [selectedUser, setSelectedUser] = useState('');

  useEffect(() => {
    fetchCustomers();
    fetchUsers();
  }, []);

  const fetchCustomers = () => {
    fetch('http://127.0.0.1:8000/api/customers/')
      .then((response) => response.json())
      .then((data) => setCustomers(data))
      .catch((error) => console.log(error));
  };

  const fetchUsers = () => {
    fetch('http://127.0.0.1:8000/api/users/')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.log(error));
  };

  const handleMatch = () => {
    if (selectedCustomer && selectedUser) {
      const data = { user_id: selectedUser };
      fetch(`http://127.0.0.1:8000/api/customers/${selectedCustomer}/match/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Match successful:', data);
          // Handle success, such as displaying a success message or updating the UI
          // Refresh customers and users data after successful match
          fetchCustomers();
          fetchUsers();
        })
        .catch((error) => {
          console.log('Match error:', error);
          // Handle error, such as displaying an error message or handling the error gracefully
        });
    }
  };

  return (
    <div>
      <h1>Match User with Customer</h1>

      <div>
        <h2>Customers</h2>
        <ul>
          {customers.map((customer) => (
            <li key={customer.id}>
              {customer.name} - Linked User: {customer.assigned_employee ? customer.assigned_employee.username : 'None'}
              {customer.employee && (
                <span> - Assigned Employee: {customer.employee.first_name} {customer.employee.last_name}</span>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Users</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.username}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Match User and Customer</h2>
        <label>
          Select a Customer:
          <select value={selectedCustomer} onChange={(e) => setSelectedCustomer(e.target.value)}>
            <option value="">Select Customer</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Select a User:
          <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
            <option value="">Select User</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.username}
              </option>
            ))}
          </select>
        </label>

        <button onClick={handleMatch}>Match</button>
      </div>
    </div>
  );
}

export default MatchUserCustomer;
