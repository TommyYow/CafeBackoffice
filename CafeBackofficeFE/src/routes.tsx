import { ApartmentOutlined, TeamOutlined } from '@ant-design/icons';
import React, { lazy } from 'react';

const CafePage = lazy(() => import('./pages/cafe/CafePage'));
const CreateCafePage = lazy(() => import('./pages/cafe/CreateCafePage'));
const EditCafePage = lazy(() => import('./pages/cafe/EditCafePage'));
const EmployeePage = lazy(() => import('./pages/employee/EmployeePage'));
const CreateEmployeePage = lazy(() => import('./pages/employee/CreateEmployeePage'));
const EditEmployeePage = lazy(() => import('./pages/employee/EditEmployeePage'));

export interface RouteConfig {
  path: string;
  label: string;
  key: string;
  icon?: React.ReactNode;
  children?: RouteConfig[];
  element?: React.ReactNode;
  showInMenu?: boolean;
}

// Define the application's routes
const routes: RouteConfig[] = [
  {
    path: '/cafe',
    key: 'cafe',
    label: 'Café',
    icon: <ApartmentOutlined />,
    element: <CafePage />,
    showInMenu: true,
  },
  {
    path: '/cafe/create',
    key: 'cafe-create',
    label: 'Create Café',
    element: <CreateCafePage />,
    showInMenu: false,
  },
  {
    path: '/cafe/:id',
    key: 'cafe-edit',
    label: 'Edit Café',
    element: <EditCafePage />,
    showInMenu: false,
  },
  {
    path: '/employee',
    key: 'employee',
    label: 'Employee',
    icon: <TeamOutlined />,
    element: <EmployeePage />,
    showInMenu: true,
  },
  {
    path: '/employee/create',
    key: 'employee-create',
    label: 'Create Employee',
    element: <CreateEmployeePage />,
    showInMenu: false,
  },
  {
    path: '/employee/:id',
    key: 'employee-edit',
    label: 'Edit Employee',
    element: <EditEmployeePage />,
    showInMenu: false,
  },
];

export default routes; 