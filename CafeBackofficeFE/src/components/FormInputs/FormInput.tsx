import { Form, Input } from 'antd';
import React from 'react';
import { Control, Controller } from 'react-hook-form';

interface FormInputProps {
  name: string;
  control: Control<any>;
  label: string;
  rules?: any;
  placeholder?: string;
  textArea?: boolean;
  textAreaRows?: number;
  required?: boolean;
  maxLength?: number;
}

export const FormInput: React.FC<FormInputProps> = ({
  name,
  control,
  label,
  rules,
  placeholder,
  textArea = false,
  textAreaRows = 4,
  required = false,
  maxLength,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <Form.Item
          label={label}
          validateStatus={error ? 'error' : ''}
          help={error?.message}
          style={{ width: '100%' }}
          required={required}
        >
          {textArea ? (
            <Input.TextArea
              {...field}
              placeholder={placeholder}
              rows={textAreaRows}
              maxLength={maxLength}
              showCount={!!maxLength}
            />
          ) : (
            <Input
              {...field}
              placeholder={placeholder}
              maxLength={maxLength}
              showCount={!!maxLength}
            />
          )}
        </Form.Item>
      )}
    />
  );
}; 