import { FileTextOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  Input,
} from 'antd';
import React from 'react';
import { usePatchCategoryById } from "../../../tanstack/useCategories";

const PatchCategoryForm: React.FC = ({
  api,
  selectedCategory,
  hidePatchCategoryModal,
}) => {
  const [ form ] = Form.useForm();
  form.setFieldsValue({ name: selectedCategory.name });

  const {
    mutateAsync: patchCategory,
  } = usePatchCategoryById(api);
  const onFinish = async (values: any) => {
    hidePatchCategoryModal();
    await patchCategory({
      id: selectedCategory.key,
      values,
    });
    form.resetFields();
  };

  return (
    <Form
      form={form}
      name="patchCategory"
      style={{ maxWidth: 360 }}
      onFinish={onFinish}
    >
      <Form.Item
        name="name"
        rules={[ { required: true, message: 'Введите название!' } ]}
      >
        <Input
          prefix={<FileTextOutlined />}
          placeholder={selectedCategory.Name}
        />
      </Form.Item>
      {selectedCategory.ProfileSections === null && (
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

export default PatchCategoryForm;
