import { useMutation, useQueryClient } from '@tanstack/react-query';
import { App, Divider, Flex, Typography } from 'antd';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import EmployeeForm from '../../components/Form/EmployeeForm';
import { EmployeeFormData } from '../../models/employee';
import { createEmployee } from '../../services/employeeService';

const { Title } = Typography;

const CreateEmployeePage: React.FC = () => {
  const navigate = useNavigate();
  const { message, modal } = App.useApp();
  const queryClient = useQueryClient();

  // Initialize react-hook-form
  const {
    control,
    handleSubmit,
    formState: { isDirty }
  } = useForm<EmployeeFormData>({
    defaultValues: {
      name: '',
      emailAddress: '',
      phoneNumber: '',
      gender: undefined,
      cafeId: undefined,
      cafeStartDate: undefined
    }
  });

  // Create mutation using TanStack Query
  const createMutation = useMutation({
    mutationFn: (data: EmployeeFormData) => createEmployee(data),
    onSuccess: () => {
      message.success('Employee created successfully!');
      // Invalidate the employees query to refetch data when returning to the list
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      navigate('/employee'); // Navigate back to the employee list page
    },
    onError: (error) => {
      console.error('Error creating employee:', error);
      message.error('Failed to create employee');
    }
  });

  // Handle form submission
  const onSubmit = (data: EmployeeFormData) => {
    createMutation.mutate(data);
  };

  // Show confirmation when leaving without saving changes
  const handleCancel = () => {
    if (isDirty) {
      modal.confirm({
        title: 'Unsaved Changes',
        content: 'You have unsaved changes. Are you sure you want to leave without saving?',
        okText: 'Leave',
        okType: 'danger',
        cancelText: 'Stay',
        onOk() {
          navigate('/employee');
        }
      });
    } else {
      navigate('/employee');
    }
  };

  return (
    <div>
      <Flex vertical>
        <Flex justify='space-between' align='center'>
          <Title level={2} style={{ margin: '.5rem' }}>Add New Employee</Title>
        </Flex>
        <Divider />
      </Flex>

      <EmployeeForm
        control={control}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        onCancel={handleCancel}
        isLoading={createMutation.isPending}
        isDirty={isDirty}
      />
    </div>
  );
};

export default CreateEmployeePage; 