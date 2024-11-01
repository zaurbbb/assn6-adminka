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
import { usePostCity } from "../../../tanstack/useCities";
import {
  nameRules,
  numberRules,
} from "../../../utils/formRules";

const PostCityForm: React.FC = ({
  api,
  hidePostCityModal,
}) => {
  const [ form ] = Form.useForm();

  const {
    mutateAsync: postCity,
  } = usePostCity(api);
  const onFinish = async (values: any) => {
    await postCity({
      name: values.name,
      delivery_duration_days: Number(values.delivery_duration_days),
    });
    form.resetFields();
    hidePostCityModal();
  };

  return (
    <Form
      form={form}
      name="postCity"
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
          Создать
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PostCityForm;
