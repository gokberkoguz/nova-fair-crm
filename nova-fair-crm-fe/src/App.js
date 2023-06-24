import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes, Navigate } from 'react-router-dom';
import UserList from './components/UserList';
import CustomerComponent from './components/Customers';
import CustomerProfilePage from './components/CustomerProfilePage';
import LoginPage from './components/LoginPage';
import CustomerCreationForm from './components/CustomerCreationForm';

const PrivateRoute = ({ element: Component, isLoggedIn, ...rest }) => {
  // Check if the user is logged in
  if (isLoggedIn) {
    // If logged in, render the component associated with the route
    return <Component {...rest} />;
  } else {
    // If not logged in, redirect to the login page
    return <Navigate to="/login" />;
  }
};

const App = () => {
  const token = localStorage.getItem('token');
  const isLoggedIn = !!token;

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<h1>Welcome to User-Customer App</h1>} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/users"
            element={<PrivateRoute element={UserList} isLoggedIn={isLoggedIn} />}
          />
          <Route
            path="/customers/*"
            element={<PrivateRoute element={CustomerComponent} isLoggedIn={isLoggedIn} />}
          />
          <Route
            path="/customers/:customerId"
            element={<PrivateRoute element={CustomerProfilePage} isLoggedIn={isLoggedIn} />}
          />
          <Route
            path="/add_customer"
            element={<PrivateRoute element={CustomerCreationForm} isLoggedIn={isLoggedIn} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
