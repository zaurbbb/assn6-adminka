import {
  FieldTimeOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import {
  Button,
  Form,
  Input,
  InputNumber,
} from 'antd';
import React from 'react';
import { usePatchCityById } from "../../../tanstack/useCities";
import {
  nameRules,
  numberRules,
} from "../../../utils/formRules";

const PatchCityForm: React.FC = ({
  api,
  selectedCity,
  hidePatchCityModal,
}) => {
  const [ form ] = Form.useForm();

  form.setFieldsValue({
    name: selectedCity.name,
    delivery_duration_days: selectedCity.delivery_duration_days,
  });

  const {
    mutateAsync: patchCity,
  } = usePatchCityById(api);
  const onFinish = async (values: any) => {
    hidePatchCityModal();
    await patchCity({
      id: selectedCity.id,
      values: {
        name: values.name,
        delivery_duration_days: Number(values.delivery_duration_days),
      },
    });
    form.resetFields();
  };

  return (
    <Form
      form={form}
      name="patchCity"
      style={{ maxWidth: 360 }}
      onFinish={onFinish}
    >
      <Form.Item
        name="name"
        rules={nameRules}
      >
        <Input
          prefix={<FileTextOutlined />}
          placeholder={selectedCity.Name}
        />
      </Form.Item>
      <Form.Item
        name="delivery_duration_days"
        rules={numberRules}
      >
        <InputNumber
          prefix={<FieldTimeOutlined />}
          placeholder="Срок доставки (в днях)"
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

export default PatchCityForm;
