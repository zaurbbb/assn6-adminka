import { FileTextOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  Input,
  Select,
} from 'antd';
import React from 'react';
import { useParams } from "react-router-dom";
import { usePatchCharacteristicById } from "../../../tanstack/useCharacteristics";
import { useGetSubCategories } from "../../../tanstack/useSubCategories";
import { nameRules } from "../../../utils/formRules";

const PatchCharacteristicForm: React.FC = ({
  api,
  selectedCharacteristic,
  hidePatchCharacteristicModal,
}) => {
  const { serviceId } = useParams();

  const [ form ] = Form.useForm();

  form.setFieldsValue({
    name: selectedCharacteristic.label,
    subcategory_id: selectedCharacteristic.subcategory_id,
  });

  const {
    data: subCategories,
  } = useGetSubCategories(api, serviceId);
  const subCategoryOptions = subCategories?.map((subCategory: any) => ({
    value: subCategory.id,
    label: subCategory.name,
  }));

  const {
    mutateAsync: patchCharacteristic,
  } = usePatchCharacteristicById(api);
  const onFinish = async (values: any) => {
    hidePatchCharacteristicModal();
    await patchCharacteristic({
      id: selectedCharacteristic.key,
      values,
    });
    form.resetFields();
  };

  return (
    <Form
      form={form}
      name="patchCharacteristic"
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
          placeholder={selectedCharacteristic.name}
        />
      </Form.Item>
      <Form.Item
        label="Подкатегория"
        name="subcategory_id"
        rules={[ { required: true, message: "Выберите Подкатегория"} ]}
      >
        <Select
          placeholder="Подкатегория"
          options={subCategoryOptions}
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

export default PatchCharacteristicForm;
