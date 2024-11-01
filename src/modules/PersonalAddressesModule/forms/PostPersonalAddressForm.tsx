import { FileTextOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  Input,
  Select,
} from 'antd';
import React from 'react';
import { useGetCities } from "../../../tanstack/useCities";
import { usePostPersonalAddress } from "../../../tanstack/usePersonalAddresses";

const PostPersonalAddressForm: React.FC = ({
  api,
  hidePostPersonalAddressModal,
}) => {
  // const { subPersonalId } = useParams();
  const [ form ] = Form.useForm();

  const {
    data: cities,
  } = useGetCities(api);
  const options = cities?.map((city: any) => ({
    value: city.id,
    label: city.name,
  }));
  const {
    mutateAsync: postPersonalAddress,
  } = usePostPersonalAddress(api);
  const onFinish = async (values: any) => {
    hidePostPersonalAddressModal();
    await postPersonalAddress(values);
    form.resetFields();
  };

  return (
    <Form
      form={form}
      name="postPersonalAddress"
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

export default PostPersonalAddressForm;
