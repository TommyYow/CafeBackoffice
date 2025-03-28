import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { App, Button, Divider, Flex, Typography } from 'antd';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import EmployeeForm from '../../components/Form/EmployeeForm';
import { EmployeeFormData } from '../../models/employee';
import { getEmployeeById, updateEmployee } from '../../services/employeeService';

const { Title } = Typography;

const EditEmployeePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { message, modal } = App.useApp();
  const queryClient = useQueryClient();

  // Initialize react-hook-form
  const {
    control,
    handleSubmit,
    reset,
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

  // Fetch employee data
  const { data: employee, isLoading, isError, error } = useQuery({
    queryKey: ['employee', id],
    queryFn: () => id ? getEmployeeById(id) : Promise.reject('No employee ID provided'),
    enabled: !!id,
    retry: 1
  });

  // Reset form when employee data is loaded
  useEffect(() => {
    if (employee) {
      reset({
        name: employee.name,
        emailAddress: employee.emailAddress,
        phoneNumber: employee.phoneNumber,
        gender: employee.gender,
        cafeId: employee.cafe?.id ?? undefined,
        cafeStartDate: employee.cafeStartDate
      });
    }
  }, [employee, reset]);

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: (data: EmployeeFormData) => {
      if (!id) throw new Error('No employee ID provided');
      return updateEmployee(id, data);
    },
    onSuccess: () => {
      message.success('Employee updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      queryClient.invalidateQueries({ queryKey: ['employee', id] });
      navigate('/employee');
    },
    onError: (error) => {
      console.error('Error updating employee:', error);
      message.error('Failed to update employee');
    }
  });

  // Show confirmation dialog before submitting
  const showConfirmation = (data: EmployeeFormData) => {
    modal.confirm({
      title: 'Are you sure you want to update this employee?',
      content: (
        <div>
          <p>You are about to update the employee information</p>
        </div>
      ),
      okText: 'Confirm',
      okType: 'primary',
      cancelText: 'Cancel',
      onOk() {
        updateMutation.mutate(data);
      }
    });
  };

  // Handle form submission
  const onSubmit = (data: EmployeeFormData) => {
    showConfirmation(data);
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

  // Show error if employee data couldn't be loaded
  if (isError) {
    return (
      <div>
        <Typography.Title level={4} style={{ color: 'red' }}>
          Error loading employee data: {error instanceof Error ? error.message : String(error)}
        </Typography.Title>
        <Button onClick={() => navigate('/employee')}>Back to Employees</Button>
      </div>
    );
  }

  return (
    <div>
      <Flex vertical>
        <Flex justify='space-between' align='center'>
          <Title level={2} style={{ margin: '.5rem' }} >Edit Employee</Title>
        </Flex>
        <Divider />
      </Flex>

      <EmployeeForm
        control={control}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        onCancel={handleCancel}
        isLoading={isLoading || updateMutation.isPending}
        isDirty={isDirty}
      />
    </div>
  );
};

export default EditEmployeePage; 