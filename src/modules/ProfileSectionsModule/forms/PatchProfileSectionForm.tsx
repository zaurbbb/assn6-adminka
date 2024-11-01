import { FileTextOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  Input,
} from 'antd';
import React from 'react';
import { usePatchProfileSectionById } from "../../../tanstack/useProfileSections";

const PatchProfileSectionForm: React.FC = ({
  api,
  selectedProfileSection,
  hidePatchProfileSectionModal,
}) => {
  const [ form ] = Form.useForm();

  form.setFieldsValue({ name: selectedProfileSection.Name, content: selectedProfileSection.Content });

  const {
    mutateAsync: patchProfileSection,
  } = usePatchProfileSectionById(api);
  const onFinish = async (values: any) => {
    hidePatchProfileSectionModal();
    await patchProfileSection({
      id: selectedProfileSection.Id,
      values,
    });
    form.resetFields();
  };

  return (
    <Form
      form={form}
      name="patchProfileSection"
      onFinish={onFinish}
    >
      <Form.Item
        name="name"
        rules={[ { required: true, message: 'Введите название!' } ]}
      >
        <Input
          prefix={<FileTextOutlined />}
          placeholder={selectedProfileSection.Name}
        />
      </Form.Item>
      {selectedProfileSection.ProfileSections === null && (
        <Form.Item
          name="content"
          rules={[ { required: false, message: 'Напишите содержание!' } ]}
        >
          <Input.TextArea
            // rows={12}
            autoSize={{ minRows: 10, maxRows: 20 }}
            placeholder="Содержание"
          />
        </Form.Item>
      )}

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

export default PatchProfileSectionForm;
