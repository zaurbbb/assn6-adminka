import { FileTextOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  Input,
  Select,
} from 'antd';
import React from 'react';
import { useGetCities } from "../../../tanstack/useCities";
import { usePostServiceAddress } from "../../../tanstack/useServiceAddresses";

const PostServiceAddressForm: React.FC = ({
  api,
  hidePostServiceAddressModal,
}) => {
  // const { subServiceId } = useParams();
  const [ form ] = Form.useForm();

  const {
    data: cities,
  } = useGetCities(api);
  const options = cities?.map((city: any) => ({
    value: city.id,
    label: city.name,
  }));
  const {
    mutateAsync: postServiceAddress,
  } = usePostServiceAddress(api);
  const onFinish = async (values: any) => {
    hidePostServiceAddressModal();
    await postServiceAddress(values);
    form.resetFields();
  };

  return (
    <Form
      form={form}
      name="postServiceAddress"
      style={{ maxWidth: 360 }}
      onFinish={onFinish}
    >
      <Form.Item
        name="address"
        rules={[ { required: true, message: 'Введите адрес!' } ]}
      >
        <Input
          prefix={<FileTextOutlined />}
          placeholder="Название"
        />
      </Form.Item>
      <Form.Item
        name="city_id"
        rules={[ { required: true, message: "Выберите город"} ]}
      >
        <Select
          placeholder="Город"
          options={options}
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

export default PostServiceAddressForm;
