import { FileTextOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  Input,
  Select,
} from 'antd';
import React from 'react';
import { useGetCities } from "../../../tanstack/useCities";
import { usePatchServiceAddressById } from "../../../tanstack/useServiceAddresses";

const PatchServiceAddressForm: React.FC = ({
  api,
  selectedServiceAddress,
  hidePatchServiceAddressModal,
}) => {
  // const { subServiceId } = useParams();
  const [ form ] = Form.useForm();

  form.setFieldsValue({
    address: selectedServiceAddress.Address,
    city_id: selectedServiceAddress.CityId,
  });

  const {
    data: cities,
  } = useGetCities(api);
  const options = cities?.map((city: any) => ({
    value: city.id,
    label: city.name,
  }));
  const {
    mutateAsync: patchServiceAddress,
  } = usePatchServiceAddressById(api);
  const onFinish = async (values: any) => {
    hidePatchServiceAddressModal();
    await patchServiceAddress({
      id: selectedServiceAddress.Id,
      values,
    });
    form.resetFields();
  };

  return (
    <Form
      form={form}
      name="patchServiceAddress"
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
        rules={[ { required: true, message: "Выберите город" } ]}
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
          Обновить
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PatchServiceAddressForm;
