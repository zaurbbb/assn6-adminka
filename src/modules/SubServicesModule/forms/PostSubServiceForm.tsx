import { FileTextOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  Input,
} from 'antd';
import React from 'react';
import { useParams } from "react-router-dom";
import { usePostSubService } from "../../../tanstack/useSubServices";
import { nameRules } from "../../../utils/formRules";

const PostSubServiceForm: React.FC = ({
  api,
  hidePostSubServiceModal,
}) => {
  const { serviceId } = useParams();
  const [ form ] = Form.useForm();

  const {
    mutateAsync: postSubService,
  } = usePostSubService(api);
  const onFinish = async (values: any) => {
    hidePostSubServiceModal();
    await postSubService({
      name: values.name,
      service_id: Number(serviceId),
    });
    form.resetFields();
  };

  return (
    <Form
      form={form}
      name="postSubService"
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
          Создать
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PostSubServiceForm;
