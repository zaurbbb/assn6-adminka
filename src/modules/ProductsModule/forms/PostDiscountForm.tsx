import { FieldTimeOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Form,
  InputNumber,
} from 'antd';
import React, { CSSProperties } from 'react';
import { usePostDiscount } from "../../../tanstack/useDiscounts";
import { numberRules } from "../../../utils/formRules";

const PostDiscountForm: React.FC = ({
  api,
  selectedProduct,
  hidePostDiscountModal
}) => {
  const [ form ] = Form.useForm();

  const { mutateAsync: postDiscount } = usePostDiscount(api);

  // Handle form submission with multipart/form-data
  const onFinish = async (values: any) => {
    hidePostDiscountModal();
    await postDiscount({
      product_id: selectedProduct.id,
      discount: values.discount,
      start_date: values.start_time.toISOString(),
      end_date: values.end_time.toISOString(),
    });
    form.resetFields();
  };

  const formStyles: CSSProperties = {
    maxHeight: 600,
    overflowY: 'auto',
  }
  const inputStyles: CSSProperties = {
    width: '100%',
  }
  return (
    <Form
      form={form}
      name="PostDiscount"
      layout="vertical"
      onFinish={onFinish}
      style={formStyles}
    >
      <Form.Item
        label="Процент скидки"
        name="discount"
        rules={numberRules}
      >
        <InputNumber placeholder="Процент" style={inputStyles} />
      </Form.Item>
      <Form.Item
        label="Время начала"
        name="start_time"
        rules={[{ required: true, message: 'Введите время начала!' }]}
      >
        <DatePicker
          showTime
          format="D MMM YYYY, HH:mm"
          placeholder="Время начала"
          prefix={<FieldTimeOutlined />}
          style={inputStyles}
        />
      </Form.Item>
      <Form.Item
        label="Время окончания"
        name="end_time"
        rules={[{ required: true, message: 'Введите время окончания!' }]}
      >
        <DatePicker
          showTime
          format="D MMM YYYY, HH:mm"
          placeholder="Время окончания"
          prefix={<FieldTimeOutlined />}
          style={inputStyles}
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

export default PostDiscountForm;
