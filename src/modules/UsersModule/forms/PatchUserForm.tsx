import { FileTextOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  Input,
} from 'antd';
import React from 'react';
import { usePatchUserById } from "../../../tanstack/useUsers";
import { nameRules } from "../../../utils/formRules";

const PatchUserForm: React.FC = ({
  api,
  selectedUser,
  hidePatchUserModal,
}) => {
  const [ form ] = Form.useForm();
  form.setFieldsValue({
    username: selectedUser.username,
    email: selectedUser.email,
    phone_number: selectedUser.phone_number,
  });

  const {
    mutateAsync: patchUser,
  } = usePatchUserById(api);
  const onFinish = async (values: any) => {
    hidePatchUserModal();
    await patchUser({
      id: selectedUser.id,
      values,
    });
    form.resetFields();
  };

  return (
    <Form
      form={form}
      name="patchUser"
      style={{ maxWidth: 360 }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Введите имя пользователя!' }]}
      >
        <Input
          prefix={<FileTextOutlined />}
          placeholder="Имя"
        />
      </Form.Item>
      <Form.Item
        name="email"
        rules={[{ required: true, message: 'Введите email!' }]}
      >
        <Input
          prefix={<FileTextOutlined />}
          placeholder="Email"
        />
      </Form.Item>
      <Form.Item
        name="phone_number"
        rules={[{ required: true, message: 'Введите номер телефона!' }]}
      >
        <Input
          prefix={<FileTextOutlined />}
          placeholder="Телефон"
        />
      </Form.Item>

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

export default PatchUserForm;
