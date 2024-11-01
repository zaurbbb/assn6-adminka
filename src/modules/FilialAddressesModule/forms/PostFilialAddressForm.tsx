import { FileTextOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  Input,
  Select,
} from 'antd';
import React from 'react';
import { useGetCities } from "../../../tanstack/useCities";
import { usePostFilialAddress } from "../../../tanstack/useFilialAddresses";

const PostFilialAddressForm: React.FC = ({
  api,
  hidePostFilialAddressModal,
}) => {
  // const { subFilialId } = useParams();
  const [ form ] = Form.useForm();

  const {
    data: cities,
  } = useGetCities(api);
  const options = cities?.map((city: any) => ({
    value: city.id,
    label: city.name,
  }));
  const {
    mutateAsync: postFilialAddress,
  } = usePostFilialAddress(api);
  const onFinish = async (values: any) => {
    hidePostFilialAddressModal();
    await postFilialAddress(values);
    form.resetFields();
  };

  return (
    <Form
      form={form}
      name="postFilialAddress"
      labelCol={ { span: 10 } }
      onFinish={onFinish}
    >
      <Form.Item
        name="city_id"
        rules={[ { required: true, message: "Выберите город" } ]}
      >
        <Select
          placeholder="Город"
          options={options}
        >
        </Select>
      </Form.Item>
      <Form.Item
        name="region"
        label="Регион"
        rules={[ { required: true, message: 'Введите регион!' } ]}
      >
        <Input
          prefix={<FileTextOutlined />}
          placeholder="Регион"
        />
      </Form.Item>
      <Form.Item
        name="street"
        label="Улица"
        rules={[ { required: true, message: 'Введите улица!' } ]}
      >
        <Input
          prefix={<FileTextOutlined />}
          placeholder="Улица"
        />
      </Form.Item>
      <Form.Item
        name="street_num"
        label="Номер улицы"
        rules={[ { required: true, message: 'Введите номер улицы!' } ]}
      >
        <Input
          prefix={<FileTextOutlined />}
          placeholder="Номер улицы"
        />
      </Form.Item>
      <Form.Item
        name="apartment"
        label="Квартира"
        rules={[ { required: true, message: 'Введите квартира!' } ]}
      >
        <Input
          prefix={<FileTextOutlined />}
          placeholder="Квартира"
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

export default PostFilialAddressForm;
