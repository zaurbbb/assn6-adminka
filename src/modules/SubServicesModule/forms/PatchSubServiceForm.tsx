import { FileTextOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  Input,
} from 'antd';
import React from 'react';
import { usePatchSubServiceById } from "../../../tanstack/useSubServices";
import { nameRules } from "../../../utils/formRules";

const PatchSubServiceForm: React.FC = ({
  api,
  selectedSubService,
  hidePatchSubServiceModal,
}) => {
  const [ form ] = Form.useForm();

  form.setFieldsValue({ name: selectedSubService.label });

  const {
    mutateAsync: patchService,
  } = usePatchSubServiceById(api);
  const onFinish = async (values: any) => {
    hidePatchSubServiceModal();
    await patchService({
      id: selectedSubService.key,
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
          placeholder={selectedSubService.Name}
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

export default PatchSubServiceForm;
