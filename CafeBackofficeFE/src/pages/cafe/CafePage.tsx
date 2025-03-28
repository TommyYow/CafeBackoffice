import { SearchOutlined, UndoOutlined } from '@ant-design/icons';
import { useQuery } from "@tanstack/react-query";
import { AllCommunityModule, ColDef, ModuleRegistry, themeQuartz } from "ag-grid-community";
import { AgGridReact } from 'ag-grid-react';
import { App, Button, Divider, Flex, Input } from 'antd';
import Title from 'antd/es/typography/Title';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import ActionCellRenderer from '../../components/GridRenderers/ActionCellRenderer';
import { CafeData, CafeQueryParams } from '../../models/cafe';
import { deleteCafe, getCafes } from '../../services/cafeService';

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

const CafePage: React.FC = () => {
  const navigate = useNavigate();
  const { message } = App.useApp();
  const [searchText, setSearchText] = useState('');
  const [queryParams, setQueryParams] = useState<CafeQueryParams>({});

  // Configure column definitions for the AG Grid
  const [colDefs, _] = useState<(ColDef<CafeData>)[]>([
    { field: "name", headerName: "Cafe Name" },
    { field: "description", headerName: "Description" },
    { field: "location", headerName: "Location" },
    {
      field: "employees",
      headerName: "Employees",
      cellRenderer: (params: any) => {
        if (!params.value) return '';

        return (
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate('/employee', {
                state: { cafeId: params.data.id }
              });
            }}
          >
            {params.value}
          </a>
        );
      }
    },
    {
      headerName: "Actions",
      cellRenderer: (params: any) => (
        <ActionCellRenderer
          {...params}
          editPath={(id) => `/cafe/${id}`}
          deleteRecord={deleteCafe}
          deleteMutationKey="cafes"
          confirmTitle="Delete Café"
          confirmDescription="Are you sure you want to delete this café?"
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

  const {
    data: cafes,
    isLoading,
    error,
    isError
  } = useQuery({
    queryKey: ['cafes', queryParams],
    queryFn: () => getCafes(queryParams),
    retry: 1
  });

  useEffect(() => {
    if (isError && error) {
      console.error('Query error:', error);
      message.error('Failed to load cafe data');
    }
  }, [isError, error, message]);

  const handleSearch = () => {
    setQueryParams(prev => ({
      ...prev,
      location: searchText
    }));
  };

  const handleReset = () => {
    setSearchText('');
    setQueryParams({});
  };

  return (
    <Flex vertical gap={16}>
      <Flex vertical>
        <Flex justify='space-between' align='center'>
          <Title level={2} style={{ margin: '.5rem' }} >Café</Title>
          <Button type='primary' onClick={() => navigate('/cafe/create')}>Add New Café</Button>
        </Flex>
        <Divider />
      </Flex>

      {/* Add search section */}
      <Flex gap={8}>
        <Input
          placeholder="Enter location"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onPressEnter={handleSearch}
          style={{ maxWidth: '300px' }}
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

      {isError && (
        <div style={{ color: 'red', marginBottom: '10px' }}>
          Error loading data: {error instanceof Error ? error.message : String(error)}
        </div>
      )}

      <div style={{ marginBottom: '10px' }}>
        Found {cafes?.length ?? 0} cafes
      </div>

      <AgGridReact
        theme={themeQuartz}
        loading={isLoading}
        rowData={cafes}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        domLayout="autoHeight"
        pagination={!isLoading}
        paginationPageSize={20}
      />
    </Flex>
  );
};

export default CafePage;