// CustomerCreationForm.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCustomer } from '../api/api.js';
import './CustomerCreationForm.css'; // Import your custom CSS file here

const CustomerCreationForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [mail, setMail] = useState('');
  const [sector, setSector] = useState('');
  const [city, setCity] = useState('');
  const [contact_name, setContactName] = useState('');
  const [contact_email, setContactMail] = useState('');
  const [contact_phone, setContactPhone] = useState('');
  const navigate = useNavigate();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleMailChange = (event) => {
    setMail(event.target.value);
  };

  const handleSectorChange = (event) => {
    setSector(event.target.value);
  };
  const handleCityChange = (event) => {
    setCity(event.target.value);
  };
  const handleContactNameChange = (event) => {
    setContactName(event.target.value);
  };

  const handleContactMailChange = (event) => {
    setContactMail(event.target.value);
  };

  const handleContactPhoneChange = (event) => {
    setContactPhone(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const customerData = { name, phone, mail, sector, city, contact_name, contact_email, contact_phone };
    createCustomer(customerData);
    navigate('/customerPage'); // Redirect back to the customer list page
  };

  const handleCancel = () => {
    navigate('/customerPage');
  };

  return (
    <div>
      <h2>Create Customer</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" value={name} onChange={handleNameChange} />
        </div>
        <div className="form-group">
          <label>Phone:</label>
          <input type="text" value={phone} onChange={handlePhoneChange} />
        </div>
        <div className="form-group">
          <label>Mail:</label>
          <input type="text" value={mail} onChange={handleMailChange} />
        </div>
        <div className="form-group">
          <label>Sector:</label>
          <input type="text" value={sector} onChange={handleSectorChange} />
        </div>
        <div className="form-group">
          <label>City:</label>
          <input type="text" value={city} onChange={handleCityChange} />
        </div>
        <div className="form-group">
          <label>Contact Name:</label>
          <input type="text" value={contact_name} onChange={handleContactNameChange} />
        </div>
        <div className="form-group">
          <label>Contact Mail:</label>
          <input type="text" value={contact_email} onChange={handleContactMailChange} />
        </div>
        <div className="form-group">
          <label>Contact Phone:</label>
          <input type="text" value={contact_phone} onChange={handleContactPhoneChange} />
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
