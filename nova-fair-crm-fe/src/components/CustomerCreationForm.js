import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {createCustomer} from '../api';
const CustomerCreationForm = () => {
  const [name, setName] = useState('');
  const [sector, setSector] = useState('');
  const navigate = useNavigate();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSectorChange = (event) => {
    setSector(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const customerData = { name, sector };
    createCustomer(customerData);
    navigate('/customers'); // Redirect back to the customer list page
  };

  const handleCancel = () => {
    navigate('/customers');
  };

  return (
    <div>
      <h2>Create Customer</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={handleNameChange} />
        </div>
        <div>
          <label>Sector:</label>
          <input type="text" value={sector} onChange={handleSectorChange} />
        </div>
        <div>
          <button type="submit">Save</button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomerCreationForm;
