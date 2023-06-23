import React, { useEffect, useMemo, useState } from 'react';
import { Link, Route, Routes, useParams } from 'react-router-dom';
import { useTable, useSortBy, useGlobalFilter } from 'react-table';
import CustomerProfilePage from './CustomerProfilePage';
import { fetchCustomers } from '../api';

const CustomerComponent = () => {
  const [customers, setCustomers] = useState([]);

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
        accessor: 'assigned_employee.username',
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
      <table {...getTableProps()} className="table table-striped table-hover">
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

      <Routes>
        <Route path="/customers/:customerId" element={<CustomerProfilePage customers={customers} />} />
      </Routes>
    </div>
  );
};

export default CustomerComponent;
