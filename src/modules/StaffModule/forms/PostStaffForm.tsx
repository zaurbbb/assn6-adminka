import {
  FieldTimeOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
} from 'antd';
import React, { useState } from 'react';
import { useGetServiceAddresses } from "../../../tanstack/useServiceAddresses";
import { useGetServices } from "../../../tanstack/useServices";
import { usePostStaff } from "../../../tanstack/useStaff";

const PostStaffForm: React.FC = ({
  api,
  hidePostStaffModal,
}) => {
  const [ form ] = Form.useForm();
  const [fileList, setFileList] = useState([]);  // Manage uploaded photos

  const {
    data: getServices,
  } = useGetServices(api);
  const serviceOptions = getServices?.map((service: any) => ({
    value: service.id,
    label: service.name,
  }));

  const { data: serviceAddresses } = useGetServiceAddresses(api);
  const addressOptions = serviceAddresses?.map((address: any) => ({
    value: address.Id,
    label: address.Address,
  }));

  const {
    mutateAsync: postStaff,
  } = usePostStaff(api);
  const onFinish = async (values: any) => {
    const formData = new FormData();

    // Append regular form fields to FormData
    formData.append('full_name', values.FullName);
    formData.append('occupation', values.Occupation);
    formData.append('experience', values.Experience);
    formData.append('start_time', values.StartTime.toISOString());
    formData.append('end_time', values.EndTime.toISOString());
    formData.append('service_id', values.ServiceId);
    formData.append('service_address_id', values.ServiceAddressId);

    // Append photo (file) to FormData
    if (fileList.length > 0) {
      formData.append('avatar', fileList[0].originFileObj);  // append the file
    }

    hidePostStaffModal();
    await postStaff(formData);
    form.resetFields();
    setFileList([]);
  };

  // Handle file selection
  const handleFileChange = ({ fileList }) => {
    setFileList(fileList);  // Update file list state
  };

  return (
    <Form
      form={form}
      layout="horizontal"
      labelCol={{ span: 10 }}
      wrapperCol={{ span: 24 }}
      name="PostStaff"
      onFinish={onFinish}
    >
      <Form.Item
        label="ФИО"
        name="FullName"
        rules={[{ required: true, message: 'Введите ФИО!' }]}
      >
        <Input
          prefix={<FileTextOutlined />}
          placeholder="ФИО"
        />
      </Form.Item>
      <Form.Item
        label="Должность"
        name="Occupation"
        rules={[{ required: true, message: 'Введите должность!' }]}
      >
        <Input
          prefix={<FileTextOutlined />}
          placeholder="Должность"
        />
      </Form.Item>
      <Form.Item
        label="Опыт работы"
        name="Experience"
        rules={[{ required: true, message: 'Введите опыт работы!' }]}
      >
        <InputNumber
          prefix={<FileTextOutlined />}
          placeholder="Опыт работы"
        />
      </Form.Item>

      {/* Avatar upload */}
      <Form.Item
        label="Загрузить фото"
        name="Avatar"
        rules={[{ required: true, message: 'Загрузите фото!' }]}  // Require photo
      >
        <Upload
          fileList={fileList}
          beforeUpload={() => false}  // Prevent immediate upload
          onChange={handleFileChange}
          accept="image/*"  // Restrict to image files
        >
          <Button>Загрузить фото</Button>
        </Upload>
      </Form.Item>

      <Form.Item
        label="Время начала"
        name="StartTime"
        rules={[{ required: true, message: 'Введите время начала!' }]}
      >
        <DatePicker
          showTime
          format="D MMM YYYY, HH:mm"
          placeholder="Время начала"
          prefix={<FieldTimeOutlined />}
        />
      </Form.Item>
      <Form.Item
        label="Время окончания"
        name="EndTime"
        rules={[{ required: true, message: 'Введите время окончания!' }]}
      >
        <DatePicker
          showTime
          format="D MMM YYYY, HH:mm"
          placeholder="Время окончания"
          prefix={<FieldTimeOutlined />}
        />
      </Form.Item>
      <Form.Item
        label="Сервис"
        name="ServiceId"
        rules={[{ required: true, message: 'Выберите услугу' }]}
      >
        <Select
          options={serviceOptions}
          placeholder="Выберите услугу"
        />
      </Form.Item>
      <Form.Item
        label="Адрес"
        name="ServiceAddressId"
        rules={[{ required: true, message: 'Выберите адрес' }]}
      >
        <Select
          options={addressOptions}
          placeholder="Выберите адрес"
        />
      </Form.Item>
      <Form.Item>
        <Button block type="primary" htmlType="submit">
          Создать
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PostStaffForm;
