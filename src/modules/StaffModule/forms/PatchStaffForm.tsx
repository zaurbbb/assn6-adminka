import {
  FieldTimeOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  Upload,
} from 'antd';
import React, { useState } from 'react';
import { useGetServiceAddresses } from "../../../tanstack/useServiceAddresses";
import { useGetServices } from "../../../tanstack/useServices";
import { usePatchStaffById } from "../../../tanstack/useStaff";

const PatchStaffForm: React.FC = ({
  api,
  selectedStaff,
  hidePatchStaffModal,
}) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);  // Manage uploaded photos

  // Pre-fill form values
  form.setFieldsValue({
    FullName: selectedStaff.FullName,
    Occupation: selectedStaff.Occupation,
    Experience: selectedStaff.Experience,
    ServiceId: selectedStaff.ServiceId,
    ServiceAddressId: selectedStaff.ServiceAddressId,
  });

  const { data: getServices } = useGetServices(api);
  const serviceOptions = getServices?.map((service: any) => ({
    value: service.id,
    label: service.name,
  }));

  const { data: serviceAddresses } = useGetServiceAddresses(api);
  const addressOptions = serviceAddresses?.map((address: any) => ({
    value: address.Id,
    label: address.Address,
  }));

  const { mutateAsync: patchStaff } = usePatchStaffById(api);

  // Handle form submission with multipart/form-data
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

    hidePatchStaffModal();
    await patchStaff({
      id: selectedStaff.Id,
      values: formData,  // Send FormData to the backend
    });
    form.resetFields();
    setFileList([]);  // Reset file list
  };

  // Handle file selection
  const handleFileChange = ({ fileList }) => {
    setFileList(fileList);  // Update file list state
  };

  return (
    <Form
      form={form}
      layout="horizontal"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 24 }}
      name="PatchStaff"
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
        <Input
          prefix={<FileTextOutlined />}
          placeholder="Опыт работы"
        />
      </Form.Item>

      {/* Avatar upload */}
      <Form.Item
        name="Avatar"
        label="Загрузить фото"
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
        label="Сервис"
        name="ServiceId"
        rules={[{ required: true, message: 'Выберите услугу' }]}
      >
        <Select options={serviceOptions} />
      </Form.Item>
      <Form.Item
        label="Адрес"
        name="ServiceAddressId"
        rules={[{ required: true, message: 'Выберите адрес' }]}
      >
        <Select options={addressOptions} />
      </Form.Item>
      <Form.Item>
        <Button block type="primary" htmlType="submit">
          Обновить
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PatchStaffForm;
