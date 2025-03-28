import { Button, Card, Flex, Form, Space } from 'antd';
import React from 'react';
import { Control, SubmitHandler } from 'react-hook-form';
import { CafeFormData } from '../../models/cafe';
import { FormInput } from '../FormInputs/FormInput';
import FormSkeleton from '../FormSkeleton';

interface CafeFormProps {
  control: Control<CafeFormData>;
  handleSubmit: (onSubmit: SubmitHandler<CafeFormData>) => (e?: React.BaseSyntheticEvent) => Promise<void>;
  onSubmit: SubmitHandler<CafeFormData>;
  onCancel: () => void;
  isLoading?: boolean;
  submitButtonText?: string;
  isDirty?: boolean;
}

const CafeForm: React.FC<CafeFormProps> = ({
  control,
  handleSubmit,
  onSubmit,
  onCancel,
  isLoading = false,
  submitButtonText = 'Submit',
  isDirty = false,
}) => {
  return (
    <Card>
      {isLoading ? (
        <FormSkeleton rows={3} buttonCount={2} />
      ) : (
        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
          <Flex gap={16} wrap="wrap">
            <Flex flex={1} vertical>
              <FormInput
                name="name"
                control={control}
                label="Café Name"
                required
                maxLength={10}
                rules={{
                  required: 'Name is required',
                  minLength: {
                    value: 6,
                    message: 'Name must be at least 6 characters'
                  },
                  maxLength: {
                    value: 10,
                    message: 'Name cannot exceed 10 characters'
                  }
                }}
                placeholder="Enter café name"
              />
            </Flex>

            <Flex flex={1} vertical>
              <FormInput
                name="location"
                control={control}
                label="Location"
                required
                maxLength={10}
                rules={{
                  required: 'Location is required',
                  maxLength: {
                    value: 10,
                    message: 'Location cannot exceed 10 characters'
                  }
                }}
                placeholder="Enter location"
              />
            </Flex>
          </Flex>

          <FormInput
            name="description"
            control={control}
            label="Description"
            required
            maxLength={256}
            rules={{
              required: 'Description is required',
              maxLength: {
                value: 256,
                message: 'Description cannot exceed 256 characters'
              }
            }}
            placeholder="Enter a description of the café"
            textArea
            textAreaRows={4}
          />

          <Form.Item style={{ textAlign: 'right' }}>
            <Space style={{ marginTop: '1rem' }}>
              <Button onClick={onCancel}>
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                disabled={!isDirty}
              >
                {submitButtonText}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      )}
    </Card>
  );
};

export default CafeForm; 