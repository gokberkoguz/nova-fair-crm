import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes, Navigate } from 'react-router-dom';
import UserList from './components/UserList';
import CustomerComponent from './components/Customers';
import CustomerProfilePage from './components/CustomerProfilePage';
import LoginPage from './components/LoginPage';

const PrivateRoute = ({ isLoggedIn, ...props }) => {
    console.log("loggedin", isLoggedIn)
  // Check if the user is logged in
  if (isLoggedIn) {
    // If logged in, render the component associated with the route
    return <Route {...props} />;
  } else {
    // If not logged in, redirect to the login page
    return <Navigate to="/login" />;
  }
};

const App = () => {

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<h1>Welcome to User-Customer App</h1>} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/users"
            element={<PrivateRoute element={UserList} path="/users" />}
          />
          <Route
            path="/customers/*"
            element={<PrivateRoute element={CustomerComponent} path="/customers/*" />}
          />
          <Route
            path="/customers/:customerId"
            element={<PrivateRoute element={CustomerProfilePage} path="/customers/:customerId" />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
