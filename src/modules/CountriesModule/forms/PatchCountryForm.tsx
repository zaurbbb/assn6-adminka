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
import { usePatchCountryById } from "../../../tanstack/useCountries";
import { nameRules } from "../../../utils/formRules";

const PatchCountryForm: React.FC = ({
  api,
  selectedCountry,
  hidePatchCountryModal,
}) => {
  const [ form ] = Form.useForm();

  form.setFieldsValue({
    name: selectedCountry.name
  });

  const {
    mutateAsync: patchCountry,
  } = usePatchCountryById(api);
  const onFinish = async (values: any) => {
    hidePatchCountryModal();
    await patchCountry({
      id: selectedCountry.id,
      values: {
        name: values.name,
      },
    });
    form.resetFields();
  };

  return (
    <Form
      form={form}
      name="patchCountry"
      style={{ maxWidth: 360 }}
      onFinish={onFinish}
    >
      <Form.Item
        name="name"
        rules={nameRules}
      >
        <Input
          prefix={<FileTextOutlined />}
          placeholder={selectedCountry.Name}
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

export default PatchCountryForm;
