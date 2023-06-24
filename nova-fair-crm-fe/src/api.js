
const API_URL = 'https://example.com/api';

export const fetchCustomers = async () => {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/customers/');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const fetchCustomerById = async (customerId) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/customers/${customerId}/`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const createCustomer = async (customerData) => {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/customers/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customerData),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Failed to create customer');
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const updateCustomer = async (customer, updatedValues) => {
  try {
    console.log(updatedValues)
    console.log({...customer, ...updatedValues})
    const response = await fetch(`http://127.0.0.1:8000/api/customers/${customer.id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({...customer, ...updatedValues}),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Failed to update customer');
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const authenticate = async (username, password) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
        const token = data.token;

        // Store the token in local storage
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);

        // Redirect to the desired page
        window.location.href = '/homepage';
    } else {
      throw new Error('Login failed');
    }
  } catch (error) {
    throw new Error('Login error:', error);
  }
};