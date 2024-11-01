import {
  Button,
  Divider,
  Form,
  Input,
  Select,
  Typography,
} from 'antd';
import React, { CSSProperties } from 'react';
import { useGetCities } from "../../../tanstack/useCities";
import { usePatchOrderById } from "../../../tanstack/useOrders";
import { deliveryMethodOptions } from "../../../utils/deliveryMethodOptions";
import {
  emailRules,
  nameRules,
} from "../../../utils/formRules";
import { statusOptions } from "../../../utils/statusOptions";

const PatchOrderForm: React.FC = ({
  api,
  selectedOrder,
  hidePatchOrderModal,
}) => {
  const [ form ] = Form.useForm();

  form.setFieldsValue({
    id: selectedOrder.id,
    status: selectedOrder.status,
  });

  const {
    mutateAsync: patchOrder,
  } = usePatchOrderById(api);
  const onFinish = async (values: any) => {
    const formDate = new FormData();
    formDate.append("status", values.status);

    hidePatchOrderModal();
    await patchOrder({
      id: selectedOrder.id,
      values,
    });
    form.resetFields();
  };
  const formStyles: CSSProperties = {
    maxWidth: 360,
  };

  return (
    <Form
      form={form}
      name="patchOrder"
      labelCol={{ span: 10 }}
      // wrapperCol={{ span: 24 }}
      layout="horizontal"
      onFinish={onFinish}
      style={formStyles}
    >
      <Form.Item
        label="Статус"
        name="status"
        rules={[ { required: true, message: 'Выберите метод доставки' } ]}
      >
        <Select
          options={statusOptions}
          placeholder="Статус"
        />
      </Form.Item>

      <Divider />


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

export default PatchOrderForm;
