import React, { useState, useEffect } from 'react';
import SigninPage from "./SigninPage.tsx";
import TitleBox from "./TitleBox.tsx";
import MainLayout from "../layouts/MainLayout.tsx";
import { Box, Button, Checkbox, colors, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { authenticate } from '../api/api.js'; // Import your authentication API function
import { useNavigate } from 'react-router-dom';


const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is already authenticated
    const token = localStorage.getItem('token');
    if (token) {
      // Redirect to the homepage
      navigate('/');
    }
  }, []);

  const handleLogin = (username, password) => {
    console.log("username")
    console.log(username,password)
    // Perform login logic
    authenticate(username, password)
      .then((response) => {
        // Handle successful login
        console.log('Login successful');
        setIsLoggedIn(true); // Update authentication status
        navigate('/homepage');
      })
      .catch((error) => {
        // Handle login error
        console.error('Login error:', error);
      });


  };
  const navigate = useNavigate();

return (
    <MainLayout>
      <Box
        sx={{
          width: {
            sm: "90vw",
            xs: "90vw",
            md: "60vw",
            lg: "60vw",
            xl: "60vw",
          },
        }}
      >
        {/* GRID SYSTEM */}
        <Grid container height="90vh">
        <SigninPage handleLogin={handleLogin} />

          <TitleBox />
        </Grid>
        {/* GRID SYSTEM END */}
      </Box>
    </MainLayout>
  );
};

export default LoginPage;
