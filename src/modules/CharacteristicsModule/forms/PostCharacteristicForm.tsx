import { FileTextOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  Input,
  Select,
} from 'antd';
import React from 'react';
import { useParams } from "react-router-dom";
import { usePostCharacteristic } from "../../../tanstack/useCharacteristics";
import { useGetSubCategories } from "../../../tanstack/useSubCategories";
import { nameRules } from "../../../utils/formRules";

const PostCharacteristicForm: React.FC = ({
  api,
  hidePostCharacteristicModal,
}) => {
  const { serviceId } = useParams();

  const [ form ] = Form.useForm();

  const {
    data: subCategories,
  } = useGetSubCategories(api, serviceId);
  const subCategoryOptions = subCategories?.map((subCategory: any) => ({
    value: subCategory.id,
    label: subCategory.name,
  }));

  const {
    mutateAsync: postCharacteristic,
  } = usePostCharacteristic(api);
  const onFinish = async (values: any) => {
    hidePostCharacteristicModal();
    await postCharacteristic(values);
    form.resetFields();
  };

  return (
    <Form
      form={form}
      name="postCharacteristic"
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
          placeholder="Название"
        />
      </Form.Item>
      <Form.Item
        label="Характеристика"
        name="subcategory_id"
        rules={[ { required: true, message: "Выберите характеристика" } ]}
      >
        <Select
          placeholder="Характеристика"
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
          Создать
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PostCharacteristicForm;
