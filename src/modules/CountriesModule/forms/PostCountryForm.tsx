import {
  FieldTimeOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import {
  Button,
  Form,
  Input,
} from 'antd';
import React from 'react';
import { usePostCountry } from "../../../tanstack/useCountries";
import { nameRules } from "../../../utils/formRules";

const PostCountryForm: React.FC = ({
  api,
  hidePostCountryModal,
}) => {
  const [ form ] = Form.useForm();

  const {
    mutateAsync: postCountry,
  } = usePostCountry(api);
  const onFinish = async (values: any) => {
    await postCountry({
      name: values.name,
    });
    form.resetFields();
    hidePostCountryModal();
  };

  return (
    <Form
      form={form}
      name="postCountry"
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

export default PostCountryForm;
