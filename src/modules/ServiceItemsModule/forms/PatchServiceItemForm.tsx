import {
  ClockCircleOutlined,
  DollarOutlined,
  FileTextOutlined,
  PicLeftOutlined,
} from '@ant-design/icons';
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
} from 'antd';
import { options } from "axios";
import React from 'react';
import { useParams } from "react-router-dom";
import { usePatchServiceItemById } from "../../../tanstack/useServiceItems";
import { useGetSubServices } from "../../../tanstack/useSubServices";
import {
  descriptionRules,
  durationRules,
  nameRules,
  numberRules,
} from "../../../utils/formRules";

const PatchServiceItemForm: React.FC = ({
  api,
  selectedServiceItem,
  hidePatchServiceItemModal,
}) => {
  const { serviceId } = useParams();
  const [ form ] = Form.useForm();

  form.setFieldsValue({
    title: selectedServiceItem.title,
    duration: selectedServiceItem.duration,
    description: selectedServiceItem.description,
    price: selectedServiceItem.price,
    subservice_id: selectedServiceItem.subservice_id,
  });

  const {
    data: getSubServices,
  } = useGetSubServices(api, serviceId);
  const subServiceOptions = getSubServices?.map((subService: any) => ({
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
    mutateAsync: patchServiceItem,
  } = usePatchServiceItemById(api);
  const onFinish = async (values: any) => {
    hidePatchServiceItemModal();
    await patchServiceItem({
      id: selectedServiceItem.id,
      values,
    });
    form.resetFields();
  };

  return (
    <Form
      form={form}
      layout="vertical"
      name="patchServiceItem"
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
        rules={[ { required: true, message: "Выберите подсервис" } ]}
      >
        <Select options={subServiceOptions} />
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

export default PatchServiceItemForm;
