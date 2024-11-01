import { FileTextOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  Input,
} from 'antd';
import React from 'react';
import { usePostProfileSection } from "../../../tanstack/useProfileSections";

const PostProfileSectionForm: React.FC = ({
  api,
  hidePostProfileSectionModal,
}) => {
  const [ form ] = Form.useForm();

  const {
    mutateAsync: postProfileSection,
  } = usePostProfileSection(api);
  const onFinish = async (values: any) => {
    hidePostProfileSectionModal();
    await postProfileSection(values);
    form.resetFields();
  };

  return (
    <Form
      form={form}
      name="postProfileSection"
      onFinish={onFinish}
    >
      <Form.Item
        name="name"
        rules={[ { required: true, message: 'Введите название!'} ]}
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

export default PostProfileSectionForm;
