import { FileTextOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  Input,
} from 'antd';
import React from 'react';
import { usePatchServiceById } from "../../../tanstack/useServices";
import { nameRules } from "../../../utils/formRules";

const PatchServiceForm: React.FC = ({
  api,
  selectedService,
  hidePatchServiceModal,
}) => {
  const [ form ] = Form.useForm();
  form.setFieldsValue({ name: selectedService.label });

  const {
    mutateAsync: patchService,
  } = usePatchServiceById(api);
  const onFinish = async (values: any) => {
    hidePatchServiceModal();
    await patchService({
      id: selectedService.key,
      values,
    });
    form.resetFields();
  };

  return (
    <Form
      form={form}
      name="patchService"
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
          Обновить
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PatchServiceForm;
