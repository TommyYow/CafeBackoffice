import { Flex, Skeleton } from 'antd';
import React from 'react';

interface FormSkeletonProps {
  rows?: number;
  buttonCount?: number;
}

const FormSkeleton: React.FC<FormSkeletonProps> = ({ rows = 3, buttonCount = 2 }) => {
  return (
    <Flex vertical gap={16}>
      {/* Form input fields */}
      {Array.from({ length: rows }).map((_, index) => (
        <Skeleton.Input
          key={index}
          active
          block
          style={{
            height: index === rows - 1 && rows > 2 ? 120 : 32
          }}
        />
      ))}

      {/* Buttons at the bottom */}
      <Flex justify="flex-end" gap={8}>
        {Array.from({ length: buttonCount }).map((_, index) => (
          <Skeleton.Button key={index} active />
        ))}
      </Flex>
    </Flex>
  );
};

export default FormSkeleton; 