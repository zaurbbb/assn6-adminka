import { FileTextOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  Input,
  Select,
} from 'antd';
import React from 'react';
import { useParams } from "react-router-dom";
import { usePostAttribute } from "../../../tanstack/useAttributes";
import { useGetCharacteristics } from "../../../tanstack/useCharacteristics";
import { nameRules } from "../../../utils/formRules";

const PostAttributeForm: React.FC = ({
  api,
  hidePostAttributeModal,
}) => {
  const { serviceId } = useParams();

  const [ form ] = Form.useForm();

  const {
    data: characteristics,
  } = useGetCharacteristics(api, serviceId);
  const characteristicOptions = characteristics?.map((characteristic: any) => ({
    value: characteristic.id,
    label: characteristic.name,
  }));

  const {
    mutateAsync: postAttribute,
  } = usePostAttribute(api);
  const onFinish = async (values: any) => {
    hidePostAttributeModal();
    await postAttribute(values);
    form.resetFields();
  };

  return (
    <Form
      form={form}
      name="postAttribute"
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
        name="characteristic_id"
        rules={[ { required: true, message: "Выберите характеристику" } ]}
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
          Создать
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PostAttributeForm;