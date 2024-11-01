import { FileTextOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  Input,
} from 'antd';
import React from 'react';
import { usePatchBrandById } from "../../../tanstack/useBrands";
import {
  descriptionRules,
  nameRules,
} from "../../../utils/formRules";

const { TextArea } = Input;
const PatchBrandForm: React.FC = ({
  api,
  selectedBrand,
  hidePatchBrandModal,
}) => {
  const [ form ] = Form.useForm();
  form.setFieldsValue({
    name: selectedBrand.label,
    info: selectedBrand.info,
  });

  const {
    mutateAsync: patchBrand,
  } = usePatchBrandById(api);
  const onFinish = async (values: any) => {
    hidePatchBrandModal();
    await patchBrand({
      id: selectedBrand.key,
      values,
    });
    form.resetFields();
  };

  return (
    <Form
      form={form}
      name="patchBrand"
      style={{ maxWidth: 360 }}
      onFinish={onFinish}
    >
      <Form.Item
        name="name"
        rules={nameRules}
      >
        <Input
          prefix={<FileTextOutlined />}
          placeholder={selectedBrand.name}
        />
      </Form.Item>
      <Form.Item
        name="info"
        rules={descriptionRules}
      >
        <TextArea
          prefix={<FileTextOutlined />}
          placeholder={selectedBrand.info}
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

export default PatchBrandForm;
