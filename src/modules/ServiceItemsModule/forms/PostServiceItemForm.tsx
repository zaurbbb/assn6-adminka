import {
  ClockCircleOutlined,
  DollarOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
} from 'antd';
import React from 'react';
import { useParams } from "react-router-dom";
import { usePostServiceItem } from "../../../tanstack/useServiceItems";
import { useGetSubServices } from "../../../tanstack/useSubServices";
import {
  descriptionRules,
  durationRules,
  nameRules,
  numberRules,
} from "../../../utils/formRules";

const PostServiceItemForm: React.FC = ({
  api,
  hidePostServiceItemModal,
}) => {
  const { serviceId } = useParams();
  const [ form ] = Form.useForm();

  const {
    data: subServices,
  } = useGetSubServices(api, serviceId);
  const subServiceOptions = subServices?.map((subService: any) => ({
    value: subService.id,
    label: subService.name,
  }));
  const durationOptions = [
    { value: 15, label: "15 минут" },
    { value: 30, label: "30 минут" },
    { value: 45, label: "45 минут" },
    { value: 60, label: "60 минут" },
  ];

  const {
    mutateAsync: postServiceItem,
  } = usePostServiceItem(api);
  const onFinish = async (values: any) => {
    hidePostServiceItemModal();
    await postServiceItem(values);
    form.resetFields();
  };

  return (
    <Form
      form={form}
      layout="vertical"
      name="postServiceItem"
      style={{ maxWidth: 360 }}
      onFinish={onFinish}
    >
      <Form.Item
        label="Название услуги"
        name="title"
        rules={nameRules}
      >
        <Input
          prefix={<FileTextOutlined />}
          placeholder="Название"
        />
      </Form.Item>
      <Form.Item
        label="Длительность (мин)"
        name="duration"
        rules={durationRules}
      >
        <Select
          placeholder="Длительность (мин)"
          options={durationOptions}
        />
      </Form.Item>
      <Form.Item
        label="Описание"
        name="description"
        rules={descriptionRules}
      >
        <Input.TextArea
          rows={4}
          placeholder="Описание"
        />
      </Form.Item>
      <Form.Item
        label="Цена"
        name="price"
        rules={numberRules}
      >
        <InputNumber
          prefix={<DollarOutlined />}
          placeholder="Цена (kzt)"
        />
      </Form.Item>
      <Form.Item
        label="Подсервис"
        name="subservice_id"
        rules={[ { required: true, message: "Выберите подсервис"} ]}
      >
        <Select
          placeholder="Подсервис"
          options={subServiceOptions}
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

export default PostServiceItemForm;
