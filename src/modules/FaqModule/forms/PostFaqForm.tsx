import { FileTextOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  Input,
} from 'antd';
import React from 'react';
import { usePostFaq } from "../../../tanstack/useFaq";

const PostFaqForm: React.FC = ({
  api,
  hidePostFaqModal,
}) => {
  const [ form ] = Form.useForm();

  const {
    mutateAsync: postFaq,
  } = usePostFaq(api);
  const onFinish = async (values: any) => {
    hidePostFaqModal();
    await postFaq(values);
    form.resetFields();
  };

  return (
    <Form
      form={form}
      name="postFaq"
      onFinish={onFinish}
    >
      <Form.Item
        name="question"
        rules={[ { required: true, message: 'Введите название!'} ]}
      >
        <Input
          prefix={<FileTextOutlined />}
          placeholder="Название"
        />
      </Form.Item>
      <Form.Item
        name="answer"
        rules={[ { required: true, message: 'Введите Содержание!'} ]}
      >
        <Input
          prefix={<FileTextOutlined />}
          placeholder="Содержание"
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

export default PostFaqForm;
