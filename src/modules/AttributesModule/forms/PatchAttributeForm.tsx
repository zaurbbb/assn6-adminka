import { FileTextOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  Input,
  Select,
} from 'antd';
import React from 'react';
import { useParams } from "react-router-dom";
import { usePatchAttributeById } from "../../../tanstack/useAttributes";
import { useGetCharacteristics } from "../../../tanstack/useCharacteristics";
import { nameRules } from "../../../utils/formRules";

const PatchAttributeForm: React.FC = ({
  api,
  selectedAttribute,
  hidePatchAttributeModal,
}) => {
  const { serviceId } = useParams();

  const [ form ] = Form.useForm();

  form.setFieldsValue({
    name: selectedAttribute.label,
    characteristic_id: selectedAttribute.characteristic_id,
  });

  const {
    data: characteristics,
  } = useGetCharacteristics(api, serviceId);
  const characteristicOptions = characteristics?.map((characteristic: any) => ({
    value: characteristic.id,
    label: characteristic.name,
  }));

  const {
    mutateAsync: patchAttribute,
  } = usePatchAttributeById(api);
  const onFinish = async (values: any) => {
    hidePatchAttributeModal();
    await patchAttribute({
      id: selectedAttribute.key,
      values,
    });
    form.resetFields();
  };

  return (
    <Form
      form={form}
      name="patchAttribute"
      labelCol={{ span: 10 }}
      onFinish={onFinish}
    >
      <Form.Item
        label="Название"
        name="name"
        rules={nameRules}
      >
        <Input
          prefix={<FileTextOutlined />}
          placeholder={selectedAttribute.name}
        />
      </Form.Item>
      <Form.Item
        label="Характеристика"
        name="characteristic_id"
        rules={[ { required: true, message: "Выберите характеристику"} ]}
      >
        <Select
          placeholder="Характеристика"
          options={characteristicOptions}
        >
        </Select>
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

export default PatchAttributeForm;