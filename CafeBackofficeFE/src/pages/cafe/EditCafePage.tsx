import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { App, Button, Divider, Flex, Typography } from 'antd';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import CafeForm from '../../components/Form/CafeForm';
import { CafeFormData } from '../../models/cafe';
import { getCafeById, updateCafe } from '../../services/cafeService';

const { Title } = Typography;

const EditCafePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { message, modal } = App.useApp();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty }
  } = useForm<CafeFormData>({
    defaultValues: {
      name: '',
      description: '',
      location: ''
    }
  });

  // Fetch cafe data
  const { data: cafe, isLoading, isError, error } = useQuery({
    queryKey: ['cafe', id],
    queryFn: () => id ? getCafeById(id) : Promise.reject('No cafe ID provided'),
    enabled: !!id,
    retry: 1
  });

  // Update form when data is loaded
  useEffect(() => {
    if (cafe) {
      reset({
        name: cafe.name,
        description: cafe.description,
        location: cafe.location
      });
    }
  }, [cafe, reset]);

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: (data: CafeFormData) => {
      if (!id) throw new Error('No cafe ID provided');
      return updateCafe(id, data);
    },
    onSuccess: () => {
      message.success('Café updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['cafes'] });
      queryClient.invalidateQueries({ queryKey: ['cafe', id] });
      navigate('/cafe');
    },
    onError: (error) => {
      console.error('Error updating cafe:', error);
      message.error('Failed to update café');
    }
  });

  // Show confirmation dialog before submitting
  const showConfirmation = (data: CafeFormData) => {
    modal.confirm({
      title: 'Are you sure you want to update this café?',
      content: (
        <div>
          <p>You are about to update the café with the following information:</p>
          <ul>
            <li><strong>Name:</strong> {data.name}</li>
            <li><strong>Location:</strong> {data.location}</li>
            <li><strong>Description:</strong> {data.description.length > 50 ?
              `${data.description.substring(0, 50)}...` : data.description}</li>
          </ul>
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

  // Show error if cafe data couldn't be loaded
  if (isError) {
    return (
      <div>
        <Typography.Title level={4} style={{ color: 'red' }}>
          Error loading café data: {error instanceof Error ? error.message : String(error)}
        </Typography.Title>
        <Button onClick={() => navigate('/cafe')}>Back to Cafés</Button>
      </div>
    );
  }

  return (
    <div>
      <Flex vertical>
        <Flex justify='space-between' align='center'>
          <Title level={2} style={{ margin: '.5rem' }} >Edit Café</Title>
        </Flex>
        <Divider />
      </Flex>

      <CafeForm
        control={control}
        handleSubmit={handleSubmit}
        onSubmit={showConfirmation}
        onCancel={handleCancel}
        isLoading={isLoading || updateMutation.isPending}
        isDirty={isDirty}
      />
    </div>
  );
};

export default EditCafePage; 