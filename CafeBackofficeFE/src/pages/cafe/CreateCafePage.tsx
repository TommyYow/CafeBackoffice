import { useMutation, useQueryClient } from '@tanstack/react-query';
import { App, Divider, Flex, Typography } from 'antd';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import CafeForm from '../../components/Form/CafeForm';
import { CafeFormData } from '../../models/cafe';
import { createCafe } from '../../services/cafeService';

const { Title } = Typography;

const CreateCafePage: React.FC = () => {
  const navigate = useNavigate();
  const { message, modal } = App.useApp();
  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    formState: { isDirty }
  } = useForm<CafeFormData>({
    defaultValues: {
      name: '',
      description: '',
      location: ''
    }
  });

  // Create mutation using TanStack Query
  const createMutation = useMutation({
    mutationFn: (data: CafeFormData) => createCafe({ ...data }),
    onSuccess: () => {
      message.success('Café created successfully!');
      // Invalidate the cafes query to refetch data when returning to the list
      queryClient.invalidateQueries({ queryKey: ['cafes'] });
      navigate('/cafe'); // Navigate back to the cafe list page
    },
    onError: (error) => {
      console.error('Error creating cafe:', error);
      message.error('Failed to create café');
    }
  });

  // Handle form submission
  const onSubmit = (data: CafeFormData) => {
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
          navigate('/cafe');
        }
      });
    } else {
      navigate('/cafe');
    }
  };

  return (
    <div>
      <Flex vertical>
        <Flex justify='space-between' align='center'>
          <Title level={2} style={{ margin: '.5rem' }}>Add New Café</Title>
        </Flex>
        <Divider />
      </Flex>

      <CafeForm
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

export default CreateCafePage; 