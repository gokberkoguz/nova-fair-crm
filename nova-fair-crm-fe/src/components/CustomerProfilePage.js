import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCustomerById, updateCustomer } from '../api';

const CustomerProfilePage = () => {
  const { customerId } = useParams();
  const [customer, setCustomer] = useState(null);
  const [editing, setEditing] = useState(false);
  const [updatedValues, setUpdatedValues] = useState({});

  useEffect(() => {
    const fetchCustomerData = async () => {
      const data = await fetchCustomerById(customerId);
      setCustomer(data);
    };

    fetchCustomerData();
  }, [customerId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEditClick = () => {
    setEditing(true);
    setUpdatedValues({}); // Reset updated values when entering edit mode
  };

  const handleSaveClick = async () => {
    await updateCustomer(customer, updatedValues);
    setEditing(false);
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      ...updatedValues,
    }));
  };

  if (!customer) {
    return <div>Loading...</div>;
  }

  const { name, sector, assigned_employee } = customer;

  return (
    <div>
      <h2>Customer Profile</h2>
      <div>
        <strong>Name:</strong>{' '}
        {editing ? (
          <input
            type="text"
            name="name"
            value={updatedValues.name || name || ''}
            onChange={handleInputChange}
          />
        ) : (
          <span>{name || 'N/A'}</span>
        )}
      </div>
      <div>
        <strong>Sector:</strong>{' '}
        {editing ? (
          <input
            type="text"
            name="sector"
            value={updatedValues.sector || sector || ''}
            onChange={handleInputChange}
          />
        ) : (
          <span>{sector || 'N/A'}</span>
        )}
      </div>
      {assigned_employee && (
        <div>
          <strong>Assigned Employee:</strong>{' '}
          {editing ? (
            <input
              type="text"
              name="assigned_employee"
              value={updatedValues.assigned_employee || assigned_employee.username || ''}
              onChange={handleInputChange}
            />
          ) : (
            <span>{assigned_employee.username || 'N/A'}</span>
          )}
        </div>
      )}
      {editing ? (
        <button onClick={handleSaveClick}>Save</button>
      ) : (
        <button onClick={handleEditClick}>Edit</button>
      )}
    </div>
  );
};

export default CustomerProfilePage;
