import {
  Button,
  Form,
  Select,
  Tag,
} from 'antd';
import React from 'react';
import CustomTimeSlots from "../../../components/CustomTimeSlots";
import { usePatchStaffById } from "../../../tanstack/useStaff";
import { workDaysOptions } from "../../../utils/workDaysOptions";

const PatchWorkTimeForm: React.FC = ({
  api,
  selectedStaff,
  hidePatchWorkTimeModal,
}) => {
  const [ form ] = Form.useForm();

  form.setFieldsValue({
    working_days: selectedStaff.WorkingDays,
  });

  const { mutateAsync: patchWorkTime } = usePatchStaffById(api);

  const [ selectedTimeSlots, setSelectedTimeSlots ] = React.useState(selectedStaff.TimeSlot);
  const handleChange = (timeSlot: string, checked: boolean) => {
    const newArray = selectedTimeSlots.map((item) => {
      if (timeSlot.id === item.id) {
        return { ...item, isAvailable: checked };
      }
      return item;
    });
    setSelectedTimeSlots(newArray);
  };

  const onFinish = async (values: any) => {

    const formData = new FormData();

    values.working_days.forEach((working_day) => {
      formData.append('working_days', working_day);
    });

    formData.append('time_slot', JSON.stringify(selectedTimeSlots));

    console.log("formData.entries()", formData.entries());
    for (let object of formData.entries()) {
      console.log(object);
    }

    hidePatchWorkTimeModal();
    await patchWorkTime({
      id: selectedStaff.Id,
      values: formData,
    });
    form.resetFields();
  };

  return (
    <Form
      form={form}
      layout="horizontal"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 24 }}
      name="PatchWorkTime"
      onFinish={onFinish}
    >
      <Form.Item
        label="Рабочие дни"
        name="working_days"
        rules={[ { required: true, message: 'Выберите рабочий день' } ]}
      >
        <Select
          mode="multiple"
          options={workDaysOptions}
        />
      </Form.Item>
      <Form.Item
        label="Рабочее время"
        name="time_slots"
      >
        <CustomTimeSlots
          timeSlots={selectedTimeSlots}
          handleChange={handleChange}
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

export default PatchWorkTimeForm;
