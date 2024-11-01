import { FileTextOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  Input,
} from 'antd';
import React from 'react';
import { usePatchFaqById } from "../../../tanstack/useFaq";

const PatchFaqForm: React.FC = ({
  api,
  selectedFaq,
  hidePatchFaqModal,
}) => {
  const [ form ] = Form.useForm();

  form.setFieldsValue({ question: selectedFaq.question, answer: selectedFaq.answer });

  const {
    mutateAsync: patchFaq,
  } = usePatchFaqById(api);
  const onFinish = async (values: any) => {
    hidePatchFaqModal();
    await patchFaq({
      id: selectedFaq.id,
      values,
    });
    form.resetFields();
  };

  return (
    <Form
      form={form}
      name="patchFaq"
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
          Обновить
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PatchFaqForm;
