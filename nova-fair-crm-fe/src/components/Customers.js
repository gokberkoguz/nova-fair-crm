import React, { useEffect, useMemo, useState } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { useTable, useSortBy, useGlobalFilter } from 'react-table';
import CustomerProfilePage from './CustomerProfilePage';
import CustomerCreationForm from './CustomerCreationForm';
import { fetchCustomers, updateCustomer, createCustomer } from '../api';

const CustomerComponent = () => {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCustomers();
      setCustomers(data);
    };

    fetchData();
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Name',
        accessor: 'name',
        Cell: ({ row }) => (
          <Link to={`/customers/${row.original.id}`}>{row.original.name}</Link>
        ),
      },
      {
        Header: 'Sector',
        accessor: 'sector',
      },
      {
        Header: 'Assigned Employee',
        accessor: 'assigned_employee',
        Cell: ({ row }) => {
          const { original } = row;
          const assignToMe = async () => {
            try {
              const updatedValues = {
                assigned_employee: localStorage.getItem('username'),
              };
              await updateCustomer(original, updatedValues);
              const updatedData = await fetchCustomers();
              setCustomers(updatedData);
            } catch (error) {
              console.error('Error:', error);
              // Handle error, e.g., show an error message, handle different error cases, etc.
            }
          };

          return original.assigned_employee ? (
            original.assigned_employee
          ) : (
            <button onClick={assignToMe}>Assign to Me</button>
          );
        },
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable({ columns, data: customers }, useGlobalFilter, useSortBy);

  const { globalFilter } = state;

  const createNewCustomer = async (customerData) => {
    try {
      // Create customer on the backend
      await createCustomer(customerData);
      // Fetch the updated customer data
      const updatedData = await fetchCustomers();
      setCustomers(updatedData);
      // Redirect back to the customer list page
      navigate('/customers');
    } catch (error) {
      console.error('Error:', error);
      // Handle error, e.g., show an error message, handle different error cases, etc.
    }
  };

  return (
    <div>
      <h1>Customers</h1>
      <div>
        Search:{' '}
        <input
          type="text"
          value={globalFilter || ''}
          onChange={(e) => setGlobalFilter(e.target.value)}
        />
      </div>
      <button onClick={() => navigate('/add_customer/')}>Add Customer</button>
      <Routes>
        <Route
          path="/add_customer/"
          element={<CustomerCreationForm onCreateCustomer={createNewCustomer} />}
        />
        <Route path="/customers/:id" element={<CustomerProfilePage />} />
      </Routes>
      <table {...getTableProps()} style={{ marginTop: '1rem' }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerComponent;
