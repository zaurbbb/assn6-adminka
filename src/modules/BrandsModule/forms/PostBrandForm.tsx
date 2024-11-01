import { FileTextOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  Input,
} from 'antd';
import React from 'react';
import { usePostBrand } from "../../../tanstack/useBrands";
import {
  descriptionRules,
  nameRules,
} from "../../../utils/formRules";

const { TextArea } = Input;
const PostBrandForm: React.FC = ({
  api,
  hidePostBrandModal,
}) => {
  const [ form ] = Form.useForm();

  const {
    mutateAsync: postBrand,
  } = usePostBrand(api);
  const onFinish = async (values: any) => {
    hidePostBrandModal();
    await postBrand(values);
    form.resetFields();
  };

  return (
    <Form
      form={form}
      name="postBrand"
      style={{ maxWidth: 360 }}
      onFinish={onFinish}
    >
      <Form.Item
        name="name"
        rules={nameRules}
      >
        <Input
          prefix={<FileTextOutlined />}
          placeholder="Название"
        />
      </Form.Item>
      <Form.Item
        name="info"
        rules={descriptionRules}
      >
        <TextArea
          prefix={<FileTextOutlined />}
          placeholder="Описание"
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

export default PostBrandForm;
