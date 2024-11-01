import {
  FileTextOutlined,
  LinkOutlined,
} from '@ant-design/icons';
import {
  Button,
  Form,
  Input,
} from 'antd';
import React from 'react';
import { usePatchContactById } from "../../../tanstack/useContacts";
import { nameRules } from "../../../utils/formRules";

const PatchContactForm: React.FC = ({
  api,
  selectedContact,
  hidePatchContactModal,
}) => {
  const [ form ] = Form.useForm();

  form.setFieldsValue({
    // title: selectedContact.title,
    value: selectedContact.value,
  });

  const {
    mutateAsync: patchContact,
  } = usePatchContactById(api);
  const onFinish = async (values: any) => {
    hidePatchContactModal();
    await patchContact({
      id: selectedContact.id,
      values,
    });
    form.resetFields();
  };

  return (
    <Form
      form={form}
      name="patchContact"
      style={{ maxWidth: 360 }}
      onFinish={onFinish}
    >
      {/*<Form.Item*/}
      {/*  name="title"*/}
      {/*  rules={nameRules}*/}
      {/*>*/}
      {/*  <Input*/}
      {/*    prefix={<FileTextOutlined />}*/}
      {/*    placeholder={selectedContact.Name}*/}
      {/*  />*/}
      {/*</Form.Item>*/}
      <Form.Item
        name="value"
        rules={nameRules}
      >
        <Input
          prefix={<LinkOutlined />}
          placeholder="Ссылка"
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

export default PatchContactForm;
