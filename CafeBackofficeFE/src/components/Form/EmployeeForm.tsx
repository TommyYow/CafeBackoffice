import { useQuery } from '@tanstack/react-query';
import { Button, Card, DatePicker, Flex, Form, Select, Space } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { Control, Controller, SubmitHandler } from 'react-hook-form';
import { IdName } from '../../models/common';
import { EmployeeFormData } from '../../models/employee';
import { getCafesForEmployeeSelect } from '../../services/employeeService';
import { FormInput } from '../FormInputs/FormInput';
import FormSkeleton from '../FormSkeleton';

interface EmployeeFormProps {
  control: Control<EmployeeFormData>;
  handleSubmit: (onSubmit: SubmitHandler<EmployeeFormData>) => (e?: React.BaseSyntheticEvent) => Promise<void>;
  onSubmit: SubmitHandler<EmployeeFormData>;
  onCancel: () => void;
  isLoading?: boolean;
  submitButtonText?: string;
  isDirty?: boolean;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({
  control,
  handleSubmit,
  onSubmit,
  onCancel,
  isLoading = false,
  submitButtonText = 'Submit',
  isDirty = false
}) => {
  // Gender options
  const genderOptions = [
    { value: 0, label: 'Male' },
    { value: 1, label: 'Female' }
  ];

  // Load cafes for select dropdown using TanStack Query
  const {
    data: cafes = [],
    isLoading: cafeLoading,
    error: cafeError
  } = useQuery({
    queryKey: ['cafesForEmployeeSelect'],
    queryFn: getCafesForEmployeeSelect,
    retry: 1
  });

  // Log any errors loading cafes
  if (cafeError) {
    console.error('Error fetching cafes:', cafeError);
  }

  return (
    <Card>
      {isLoading ? (
        <FormSkeleton rows={6} buttonCount={2} />
      ) : (
        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
          <FormInput
            name="name"
            control={control}
            label="Employee Name"
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
            placeholder="Enter employee name"
          />

          <Flex gap={16} wrap="wrap">
            <Flex flex={1} vertical>
              <FormInput
                name="emailAddress"
                control={control}
                label="Email Address"
                required
                maxLength={50}
                rules={{
                  required: 'Email address is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  },
                  maxLength: {
                    value: 50,
                    message: 'Email cannot exceed 50 characters'
                  }
                }}
                placeholder="Enter email address"
              />
            </Flex>

            <Flex flex={1} vertical>
              <FormInput
                name="phoneNumber"
                control={control}
                label="Phone Number"
                required
                maxLength={8}
                rules={{
                  required: 'Phone number is required',
                  pattern: {
                    value: /^[89]\d{7}$/,
                    message: 'Phone number must start with 8 or 9 and have 8 digits'
                  }
                }}
                placeholder="Enter phone number (8 digits)"
              />
            </Flex>
          </Flex>

          <Flex gap={16} wrap="wrap">
            <Flex flex={1} vertical>
              <Form.Item
                label="Gender"
                required
              >
                <Controller
                  name="gender"
                  control={control}
                  rules={{
                    required: 'Gender is required'
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <div>
                      <Select
                        {...field}
                        options={genderOptions}
                        placeholder="Select gender"
                        style={{ width: '100%' }}
                        status={error ? 'error' : undefined}
                      />
                      {error && <div style={{ color: 'red', fontSize: '14px' }}>{error.message}</div>}
                    </div>
                  )}
                />
              </Form.Item>
            </Flex>
            <Flex flex={1} vertical><div></div></Flex>
          </Flex>

          <Flex gap={16} wrap="wrap">
            <Flex flex={1} vertical>
              <Form.Item
                label="Café"
                required={!!control._formValues.cafeStartDate}
              >
                <Controller
                  name="cafeId"
                  control={control}
                  rules={{
                    validate: value => {
                      // If cafeStartDate has a value, cafeId is required
                      const startDate = control._formValues.cafeStartDate;
                      if (startDate && !value) {
                        return 'Café is required when Start Date is provided';
                      }
                      return true;
                    }
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <div>
                      <Select
                        {...field}
                        options={cafes.map((cafe: IdName) => ({ value: cafe.id, label: cafe.name }))}
                        placeholder={control._formValues.cafeStartDate ? "Select café (required)" : "Select café (optional)"}
                        loading={cafeLoading}
                        style={{ width: '100%' }}
                        status={error ? 'error' : undefined}
                        allowClear
                      />
                      {error && <div style={{ color: 'red', fontSize: '14px' }}>{error.message}</div>}
                    </div>
                  )}
                />
              </Form.Item>
            </Flex>

            <Flex flex={1} vertical>
              <Form.Item
                label="Start Date"
                required={!!control._formValues.cafeId}
              >
                <Controller
                  name="cafeStartDate"
                  control={control}
                  rules={{
                    validate: value => {
                      // If cafeId has a value, cafeStartDate is required
                      const cafeId = control._formValues.cafeId;
                      if (cafeId && !value) {
                        return 'Start Date is required when Café is provided';
                      }
                      // Check if the date is in the future
                      if (value && dayjs(value).isAfter(dayjs(), 'day')) {
                        return 'Start Date cannot be in the future';
                      }
                      return true;
                    }
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <div>
                      <DatePicker
                        {...field}
                        format="YYYY-MM-DD"
                        style={{ width: '100%' }}
                        status={error ? 'error' : undefined}
                        value={field.value ? dayjs(field.value) : null}
                        onChange={(date) => {
                          if (date) {
                            const dateWithoutTimeZone = date.format('YYYY-MM-DD');
                            field.onChange(dateWithoutTimeZone);
                          } else {
                            field.onChange(null);
                          }
                        }}
                        placeholder={control._formValues.cafeId ? "Select start date (required)" : "Select start date (optional)"}
                        allowClear
                        disabledDate={(current) => current && current > dayjs().endOf('day')}
                      />
                      {error && <div style={{ color: 'red', fontSize: '14px' }}>{error.message}</div>}
                    </div>
                  )}
                />
              </Form.Item>
            </Flex>
          </Flex>

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

export default EmployeeForm; 