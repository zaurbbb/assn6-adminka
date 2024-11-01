import { FileTextOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  Input,
} from 'antd';
import React from 'react';
import { usePostCategory } from "../../../tanstack/useCategories";

const PostCategoryForm: React.FC = ({
  api,
  hidePostCategoryModal,
}) => {
  const [ form ] = Form.useForm();

  const {
    mutateAsync: postCategory,
  } = usePostCategory(api);
  const onFinish = async (values: any) => {
    const formData = new FormData();

    // Append regular form fields to FormData
    for (const [ key, value ] of Object.entries(values)) {
      if (value) {
        formData.append(key, value);
      }
    }

    await postCategory(formData);
    form.resetFields();
    hidePostCategoryModal();
  };

  return (
    <Form
      form={form}
      name="postCategory"
      style={{ maxWidth: 360 }}
      onFinish={onFinish}
    >
      <Form.Item
        name="name"
        rules={[ { required: true, message: 'Введите название!' } ]}
      >
        <Input
          prefix={<FileTextOutlined />}
          placeholder="Название"
        />
      </Form.Item>

      <Form.Item>
        <Button
          block
          type="primary"
          htmlType="submit"
        >
          Создать
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PostCategoryForm;
