import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCustomerById, updateCustomer } from '../api/api.js';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

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

  const { name, phone, mail, sector, city, contact_name, contact_email, contact_phone, assigned_employee } = customer;

  return (
    <div>
      <h2>Customer Profile</h2>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <strong style={{ marginRight: '10px' }}>Name:</strong>
        {editing ? (
          <TextField
            type="text"
            name="name"
            value={updatedValues.name || name || ''}
            onChange={handleInputChange}
          />
        ) : (
          <span>{name || 'N/A'}</span>
        )}
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <strong style={{ marginRight: '10px' }}>Phone:</strong>
        {editing ? (
          <TextField
            type="text"
            name="phone"
            value={updatedValues.phone || phone || ''}
            onChange={handleInputChange}
          />
        ) : (
          <span>{phone || 'N/A'}</span>
        )}
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <strong style={{ marginRight: '10px' }}>Mail:</strong>
        {editing ? (
          <TextField
            type="text"
            name="mail"
            value={updatedValues.mail || mail || ''}
            onChange={handleInputChange}
          />
        ) : (
          <span>{mail || 'N/A'}</span>
        )}
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <strong style={{ marginRight: '10px' }}>Sector:</strong>
        {editing ? (
          <TextField
            type="text"
            name="sector"
            value={updatedValues.sector || sector || ''}
            onChange={handleInputChange}
          />
        ) : (
          <span>{sector || 'N/A'}</span>
        )}
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <strong style={{ marginRight: '10px' }}>City:</strong>
        {editing ? (
          <TextField
            type="text"
            name="city"
            value={updatedValues.city || city || ''}
            onChange={handleInputChange}
          />
        ) : (
          <span>{city || 'N/A'}</span>
        )}
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <strong style={{ marginRight: '10px' }}>Contact Name:</strong>
        {editing ? (
          <TextField
            type="text"
            name="contact_name"
            value={updatedValues.contact_name || contact_name || ''}
            onChange={handleInputChange}
          />
        ) : (
          <span>{contact_name || 'N/A'}</span>
        )}
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <strong style={{ marginRight: '10px' }}>Contact Mail:</strong>
        {editing ? (
          <TextField
            type="text"
            name="contact_email"
            value={updatedValues.contact_email || contact_email || ''}
            onChange={handleInputChange}
          />
        ) : (
          <span>{contact_email || 'N/A'}</span>
        )}
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <strong style={{ marginRight: '10px' }}>Contact Phone:</strong>
        {editing ? (
          <TextField
            type="text"
            name="contact_phone"
            value={updatedValues.contact_phone || contact_phone || ''}
            onChange={handleInputChange}
          />
        ) : (
          <span>{contact_phone || 'N/A'}</span>
        )}
      </Box>
      {assigned_employee && (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <strong style={{ marginRight: '10px' }}>Assigned Employee:</strong>
          {editing ? (
            <TextField
              type="text"
              name="assigned_employee"
              value={updatedValues.assigned_employee || assigned_employee || ''}
              onChange={handleInputChange}
            />
          ) : (
            <span>{assigned_employee || 'N/A'}</span>
          )}
        </Box>
      )}
      <Box sx={{ marginTop: '10px' }}>
        {editing ? (
          <Button variant="contained" onClick={handleSaveClick}>
            Save
          </Button>
        ) : (
          <Button variant="contained" onClick={handleEditClick}>
            Edit
          </Button>
        )}
      </Box>
    </div>
  );
};

export default CustomerProfilePage;
