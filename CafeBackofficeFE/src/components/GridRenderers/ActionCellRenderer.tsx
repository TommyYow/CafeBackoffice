import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ICellRendererParams } from 'ag-grid-community';
import { App, Button, Popconfirm, Space, Tooltip } from 'antd';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface ActionCellRendererProps<T> extends ICellRendererParams {
  // Navigation
  editPath: (id: string) => string; // Function to generate edit path

  // Deletion
  deleteRecord: (id: string) => Promise<void>;
  deleteMutationKey: string | string[];
  confirmTitle?: string;
  confirmDescription?: string;
}

/**
 * Reusable action cell renderer for AG Grid that provides edit and delete functionality
 */
const ActionCellRenderer = <T extends { id: string }>(props: ActionCellRendererProps<T>) => {
  const {
    data,
    editPath,
    deleteRecord,
    deleteMutationKey,
    confirmTitle = 'Delete Record',
    confirmDescription = 'Are you sure you want to delete this record?'
  } = props;

  const navigate = useNavigate();
  const { message } = App.useApp();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteRecord,
    onSuccess: () => {
      message.success('Record deleted successfully');
      queryClient.invalidateQueries({ queryKey: Array.isArray(deleteMutationKey) ? deleteMutationKey : [deleteMutationKey] });
    },
    onError: (error) => {
      message.error('Failed to delete record');
      console.error('Delete error:', error);
    }
  });

  const handleEdit = useCallback(() => {
    if (data?.id) {
      navigate(editPath(data.id));
    }
  }, [data, navigate, editPath]);

  const handleDelete = useCallback(() => {
    if (data?.id) {
      deleteMutation.mutate(data.id);
    }
  }, [data, deleteMutation]);

  if (!data) return null;

  return (
    <Space>
      <Tooltip title="Edit">
        <Button
          icon={<EditOutlined />}
          size="small"
          onClick={handleEdit}
          type="text"
        />
      </Tooltip>
      <Popconfirm
        title={confirmTitle}
        description={confirmDescription}
        onConfirm={handleDelete}
        okText="Yes"
        cancelText="No"
      >
        <Tooltip title="Delete">
          <Button
            loading={deleteMutation.isPending}
            danger
            icon={<DeleteOutlined />}
            size="small"
            type="text"
          />
        </Tooltip>
      </Popconfirm>
    </Space>
  );
};

export default ActionCellRenderer; 