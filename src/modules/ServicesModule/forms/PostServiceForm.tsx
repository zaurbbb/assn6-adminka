import { FileTextOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  Input,
} from 'antd';
import React from 'react';
import { usePostService } from "../../../tanstack/useServices";
import { nameRules } from "../../../utils/formRules";

const PostServiceForm: React.FC = ({
  api,
  hidePostServiceModal,
}) => {
  const [ form ] = Form.useForm();

  const {
    mutateAsync: postService,
  } = usePostService(api);
  const onFinish = async (values: any) => {
    hidePostServiceModal();
    await postService(values);
    form.resetFields();
  };

  return (
    <Form
      form={form}
      name="postService"
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

export default PostServiceForm;
