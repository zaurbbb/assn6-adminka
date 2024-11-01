import { FileTextOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  Input,
} from 'antd';
import React from 'react';
import { useParams } from "react-router-dom";
import { usePostSubCategory } from "../../../tanstack/useSubCategories";

const PostSubCategoryForm: React.FC = ({
  api,
  hidePostSubCategoryModal,
}) => {
  const { categoryId } = useParams();
  const [ form ] = Form.useForm();

  const {
    mutateAsync: postSubCategory,
  } = usePostSubCategory(api);
  const onFinish = async (values: any) => {
    hidePostSubCategoryModal();
    await postSubCategory({
      name: values.name,
      category_id: Number(categoryId),
    });
    form.resetFields();
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

export default PostSubCategoryForm;
