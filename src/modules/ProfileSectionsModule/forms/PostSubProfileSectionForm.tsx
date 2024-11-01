import { FileTextOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  Input,
} from 'antd';
import React from 'react';
import { usePostProfileSection } from "../../../tanstack/useProfileSections";

const PostSubProfileSectionForm: React.FC = ({
  api,
  selectedProfileSection,
  hidePostSubProfileSectionModal,
}) => {
  const [ form ] = Form.useForm();

  const {
    mutateAsync: postProfileSection,
  } = usePostProfileSection(api);
  const onFinish = async (values: any) => {
    await postProfileSection({
      name: values.name,
      content: values.content,
      parent_id: selectedProfileSection.Id,
    });
    form.resetFields();
    hidePostSubProfileSectionModal();
  };

  return (
    <Form
      form={form}
      name="postProfileSection"
      onFinish={onFinish}
    >
      <Form.Item
        name="name"
        rules={[ { required: true, message: 'Введите название!' } ]}
      >
        <Input
          prefix={<FileTextOutlined />}
          placeholder="Название"
        />
      </Form.Item>
      <Form.Item
        name="content"
        rules={[ { required: false, message: 'Напишите содержание!' } ]}
      >
        <Input.TextArea
          rows={12}
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

export default PostSubProfileSectionForm;
