import React, { useState } from 'react';
import { Box, Button, Checkbox, Typography } from '@mui/material';
import CustomInput from './CustomInput.tsx';

const SigninPage = ({ handleLogin }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(credentials);
    handleLogin(credentials.username, credentials.password);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  return (
    <Box>
      <Box>
        <Typography variant="h4" fontWeight="bold" color="whitesmoke" mb={3}>

        </Typography>
      </Box>

      <form onSubmit={handleSubmit}>
        <CustomInput
          label="Login"
          placeholder="Enter your login..."
          value={credentials.username}
          onChange={handleInputChange}
          name="username"
          isIconActive={false}
        />

        <CustomInput
          label="Password"
          placeholder="Enter your password..."
          value={credentials.password}
          onChange={handleInputChange}
          name="password"
          isIconActive={true}
        />

        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          mt={2}
          width="100%"
          color="white"
        >
          <div style={{ display: 'flex' }}>
            <Checkbox disableRipple sx={{ p: 0, pr: 1 }} />
            <Typography>Remember me</Typography>
          </div>
          <a
            href="#yoyo"
            style={{
              color: 'green',
              textDecoration: 'none',
            }}
          >
            Forget password?
          </a>
        </Box>

        <Button type="submit" variant="contained" fullWidth sx={{ mt: 4 }}>
          Login
        </Button>
      </form>
    </Box>
  );
};

export default SigninPage;
