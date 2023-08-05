import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddIcon from '@mui/icons-material/Add';
import { fetchCustomers, updateCustomer, createCustomer } from '../api/api.js';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

export default function Customers() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [rows, setRows] = React.useState([]);
  const [filteredRows, setFilteredRows] = React.useState([]);
  const [username, setUsername] = React.useState('');

  React.useEffect(() => {
    const fetchData = async () => {
      const dataRows = await fetchCustomers();
      console.log(dataRows)
      setRows(dataRows);
      setFilteredRows(dataRows);
    };

    fetchData();
  }, []);

  React.useEffect(() => {
    const usernameFromCookie = localStorage.getItem('username');
    setUsername(usernameFromCookie);
  }, []);

  const handleSearchQueryChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = rows.filter((row) =>
      Object.values(row).some(
        (value) =>
          typeof value === 'string' && value.toLowerCase().includes(query)
      )
    );
    setFilteredRows(filtered);
  };

  const handleAssignToMe = (customer) => {
    // Send POST request to assign the customer to the current username
    // Here, you can make use of your API functions like updateCustomer
    // Assuming you have an updateCustomer function in your 'api' file:
    const updatedCustomer = { ...customer, assigned_employee: username };
    updateCustomer(customer, { assigned_employee: username })
      .then((response) => {
        const updatedRows = filteredRows.map((row) =>
          row.id === customer.id ? { ...row, assigned_employee: username } : row
        );
        setFilteredRows(updatedRows);
        console.log('Customer assigned successfully:', response);
      })
      .catch((error) => {
        // Handle error
        console.error('Error assigning customer:', error);
      });
  };

  const preventDefault = (event) => {
    event.preventDefault();
  };

  return (
    <React.Fragment>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Title>Customers</Title>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ marginRight: '10px' }}>
            <label htmlFor="search"></label>
            <input
              id="search"
              type="text"
              value={searchQuery}
              onChange={handleSearchQueryChange}
            />
          </div>
          <div>
            <Link component={RouterLink} to="/AddCustomers" color="inherit">
              <AddIcon />
            </Link>
          </div>
        </div>
      </div>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Mail</TableCell>
            <TableCell>Sector</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Contact Name</TableCell>
            <TableCell>Contact Mail</TableCell>
            <TableCell>Contact Phone</TableCell>
            <TableCell>Assigned To</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredRows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.phone}</TableCell>
              <TableCell>{row.mail}</TableCell>
              <TableCell>{row.sector}</TableCell>
              <TableCell>{row.city}</TableCell>
              <TableCell>{row.contact_name}</TableCell>
              <TableCell>{row.contact_email}</TableCell>
              <TableCell>{row.contact_phone}</TableCell>
              <TableCell>
                {row.assigned_employee ? (
                  row.assigned_employee
                ) : (
                  <Link
                    component="button"
                    onClick={() => handleAssignToMe(row)}
                    variant="body2"
                  >
                    Assign to me
                  </Link>
                )}
              </TableCell>
              <TableCell>
                <Link component={RouterLink} to={`/ProfileCustomer/${row.id}`}>
                  <DashboardIcon />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
