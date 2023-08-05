import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes, Navigate } from 'react-router-dom';
import UserList from './components/UserList';
import CustomerComponent from './components/Customers';
//import CustomerProfilePage from './components/CustomerProfilePage';
import LoginPage from './components/LoginPage';
import CustomerCreationForm from './components/CustomerCreationForm';
import Homepage from './components/Dashboard';
import CustomerPage from './routes/CustomerPage';
import AddCustomers from './routes/AddCustomers';
import EditCustomers from './routes/EditCustomers';
import CustomerProfilePage from './routes/CustomerProfile';


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
          <Route path="/" element={<LoginPage />}  />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/users"
            element={<PrivateRoute element={UserList} isLoggedIn={isLoggedIn} />}
          />
          <Route
            path="/homepage"
            element={<PrivateRoute element={Homepage} isLoggedIn={isLoggedIn} />}
          />
          <Route
            path="/CustomerPage"
            element={<PrivateRoute element={CustomerPage} isLoggedIn={isLoggedIn} />}
          />
          <Route
            path="/AddCustomers"
            element={<PrivateRoute element={AddCustomers} isLoggedIn={isLoggedIn} />}
          />
          <Route
            path="/EditCustomers/:customerId"
            element={<PrivateRoute element={EditCustomers} isLoggedIn={isLoggedIn} />}
          />
          <Route
            path="/ProfileCustomer/:customerId"
            element={<PrivateRoute element={CustomerProfilePage} isLoggedIn={isLoggedIn} />}
          />


        </Routes>
      </div>
    </Router>
  );
};

export default App;
