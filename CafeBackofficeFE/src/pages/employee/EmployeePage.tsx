import { SearchOutlined, UndoOutlined } from '@ant-design/icons';
import { useQuery } from "@tanstack/react-query";
import { AllCommunityModule, ColDef, ModuleRegistry, themeQuartz } from "ag-grid-community";
import { AgGridReact } from 'ag-grid-react';
import { App, Button, Divider, Flex, Select } from 'antd';
import Title from 'antd/es/typography/Title';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import ActionCellRenderer from '../../components/GridRenderers/ActionCellRenderer';
import { IdName } from '../../models/common';
import { EmployeeData, EmployeeQueryParams } from '../../models/employee';
import { deleteEmployee, getCafesForEmployeeSelect, getEmployees } from '../../services/employeeService';

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

interface LocationState {
  cafeId?: string;
}

const EmployeePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state as LocationState;
  const { message } = App.useApp();
  const [cafeFilter, setCafeFilter] = useState<string>('');
  const [queryParams, setQueryParams] = useState<EmployeeQueryParams>({});

  // Extract cafeId from location state (when navigating from Cafe page)
  useEffect(() => {
    if (locationState?.cafeId) {
      setCafeFilter(locationState.cafeId);
      setQueryParams(prev => ({ ...prev, cafeId: locationState.cafeId }));

      // Clear the state after using it to prevent it from persisting on page refresh
      window.history.replaceState({}, document.title);
    }
  }, [locationState]);

  // Configure column definitions for the AG Grid
  const [colDefs, _] = useState<(ColDef<EmployeeData>)[]>([
    { field: "id", headerName: "Employee Id" },
    { field: "name", headerName: "Employee Name" },
    { field: "emailAddress", headerName: "Email" },
    { field: "phoneNumber", headerName: "Phone" },
    { field: "daysWorked", headerName: "Days Worked", valueFormatter: (params) => params.value || '' },
    { field: "cafe.name", headerName: "Café", valueGetter: (params) => params.data?.cafe?.name || '' },
    {
      headerName: "Actions",
      cellRenderer: (params: any) => (
        <ActionCellRenderer
          {...params}
          editPath={(id) => `/employee/${id}`}
          deleteRecord={deleteEmployee}
          deleteMutationKey="employees"
          confirmTitle="Delete Employee"
          confirmDescription="Are you sure you want to delete this employee?"
        />
      ),
      filter: false,
      sortable: false,
      pinned: 'right'
    }
  ]);

  const defaultColDef = {
    flex: 10,
  };

  // Fetch cafes for filter dropdown using TanStack Query
  const {
    data: cafes = [] as IdName[],
    isLoading: cafeLoading,
    error: cafeError
  } = useQuery({
    queryKey: ['cafesForEmployeeSelect'],
    queryFn: getCafesForEmployeeSelect,
    retry: 1
  });

  // Log any errors loading cafes
  useEffect(() => {
    if (cafeError) {
      console.error('Error fetching cafes for filter:', cafeError);
      message.error('Failed to load cafes for filter');
    }
  }, [cafeError, message]);

  // Fetch employees based on query parameters
  const {
    data: employees = [] as EmployeeData[],
    isLoading: employeesLoading,
    error: employeesError,
    isError: isEmployeesError
  } = useQuery({
    queryKey: ['employees', queryParams],
    queryFn: () => getEmployees(queryParams),
    retry: 1
  });

  // Log any errors loading employees
  useEffect(() => {
    if (employeesError) {
      console.error('Query error:', employeesError);
      message.error('Failed to load employee data');
    }
  }, [employeesError, message]);

  const handleSearch = () => {
    // Only include cafe filter if it has a value
    if (cafeFilter) {
      setQueryParams(prev => ({
        ...prev,
        cafeId: cafeFilter
      }));
    } else {
      // Remove cafeId from query params if no filter value
      const { cafeId, ...restParams } = queryParams;
      setQueryParams(restParams);
    }
  };

  const handleReset = () => {
    setCafeFilter('');
    setQueryParams({});
  };

  const isLoading = employeesLoading || cafeLoading;

  return (
    <Flex vertical gap={16}>
      <Flex vertical>
        <Flex justify='space-between' align='center'>
          <Title level={2} style={{ margin: '.5rem' }} >Employees</Title>
          <Button type='primary' onClick={() => navigate('/employee/create')}>Add New Employee</Button>
        </Flex>
        <Divider />
      </Flex>

      {/* Add filter section */}
      <Flex gap={8}>
        <Select
          placeholder="Filter by Café"
          style={{ width: 300 }}
          value={cafeFilter || undefined}
          onChange={(value) => setCafeFilter(value)}
          allowClear
          loading={cafeLoading}
          options={cafes.map(cafe => ({ label: cafe.name, value: cafe.id }))}
        />
        <Button
          type="primary"
          loading={isLoading}
          disabled={isLoading}
          icon={<SearchOutlined />}
          onClick={handleSearch}
        >
          Search
        </Button>
        <Button
          onClick={handleReset}
          loading={isLoading}
          disabled={isLoading}
          icon={<UndoOutlined />}
        >
          Reset
        </Button>
      </Flex>

      {isEmployeesError && (
        <div style={{ color: 'red', marginBottom: '10px' }}>
          Error loading data: {employeesError instanceof Error ? employeesError.message : String(employeesError)}
        </div>
      )}

      <div style={{ marginBottom: '10px' }}>
        Found {employees.length} employees
      </div>

      <AgGridReact
        theme={themeQuartz}
        loading={employeesLoading}
        rowData={employees}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        domLayout="autoHeight"
        pagination={!employeesLoading}
        paginationPageSize={20}
      />
    </Flex>
  );
};

export default EmployeePage; 