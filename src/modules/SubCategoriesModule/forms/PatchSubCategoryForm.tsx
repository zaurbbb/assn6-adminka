import { FileTextOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  Input,
} from 'antd';
import React from 'react';
import { useParams } from "react-router-dom";
import { usePatchSubCategoryById } from "../../../tanstack/useSubCategories";

const PatchSubCategoryForm: React.FC = ({
  api,
  selectedSubCategory,
  hidePatchSubCategoryModal,
}) => {
  const { categoryId } = useParams();

  const [ form ] = Form.useForm();

  form.setFieldsValue({ name: selectedSubCategory.label });

  const {
    mutateAsync: patchSubCategory,
  } = usePatchSubCategoryById(api);
  const onFinish = async (values: any) => {
    hidePatchSubCategoryModal();
    await patchSubCategory({
      id: selectedSubCategory.key,
      values: {
        name: values.name,
        category_id: Number(categoryId),
      },
    });
    form.resetFields();
  };

  return (
    <Form
      form={form}
      name="patchSubCategory"
      style={{ maxWidth: 360 }}
      onFinish={onFinish}
    >
      <Form.Item
        name="name"
        rules={[ { required: true, message: 'Введите название!' } ]}
      >
        <Input
          prefix={<FileTextOutlined />}
          placeholder={selectedSubCategory.Name}
        />
      </Form.Item>
      {selectedSubCategory.ProfileSections === null && (
        <Form.Item
          name="content"
          rules={[ { required: false, message: 'Напишите содержание!' } ]}
        >
          <Input.TextArea
            rows={12}
            placeholder="Содержание"
          />
        </Form.Item>
      )}

      <Form.Item>
        <Button
          block
          type="primary"
          htmlType="submit"
        >
          Обновить
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PatchSubCategoryForm;
