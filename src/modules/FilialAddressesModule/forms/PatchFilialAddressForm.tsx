import { FileTextOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  Input,
  Select,
} from 'antd';
import React from 'react';
import { useGetCities } from "../../../tanstack/useCities";
import { usePatchFilialAddressById } from "../../../tanstack/useFilialAddresses";

const PatchFilialAddressForm: React.FC = ({
  api,
  selectedFilialAddress,
  hidePatchFilialAddressModal,
}) => {
  // const { subFilialId } = useParams();
  const [ form ] = Form.useForm();

  form.setFieldsValue({
    street: selectedFilialAddress.street,
    region: selectedFilialAddress.region,
    apartment: selectedFilialAddress.apartment,
    street_num: selectedFilialAddress.street_num,
    city_id: selectedFilialAddress.city_id,
  });

  const {
    data: cities,
  } = useGetCities(api);
  const options = cities?.map((city: any) => ({
    value: city.id,
    label: city.name,
  }));
  const {
    mutateAsync: patchFilialAddress,
  } = usePatchFilialAddressById(api);
  const onFinish = async (values: any) => {
    hidePatchFilialAddressModal();
    await patchFilialAddress({
      id: selectedFilialAddress.id,
      values,
    });
    form.resetFields();
  };

  return (
    <Form
      form={form}
      name="patchFilialAddress"
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
          Обновить
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PatchFilialAddressForm;
