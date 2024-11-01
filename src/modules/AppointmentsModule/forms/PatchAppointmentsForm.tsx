import { FieldTimeOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Spin,
  Typography,
} from 'antd';
import dayjs from 'dayjs';
import React, {
  CSSProperties,
  useEffect,
  useState,
} from 'react';
import CustomTimeSlots from "../../../components/CustomTimeSlots";
import { usePatchAppointmentById } from "../../../tanstack/useAppointments";
import { useGetStaffTimeSlotsByDate } from "../../../tanstack/useStaff";
import { formattedDateISO } from "../../../utils/formattedDate";

const PatchAppointmentsForm: React.FC = ({
  api,
  selectedAppointment,
  handleSelectedAppointment,
  hidePatchAppointmentModal,
}) => {
  const [ form ] = Form.useForm();

  const [ date, setDate ] = useState(selectedAppointment.StartTime.split('T')[0]);
  const handleAppointmentDateChange = (date: any, dateString: any) => {
    setDate(dateString);
  };

  const initialValues = {
    date: dayjs(selectedAppointment.StartTime),
    comments: selectedAppointment.Comments,
  };
  form.setFieldsValue(initialValues);

  const {
    mutateAsync: patchAppointment,
  } = usePatchAppointmentById(api);

  const [ selectedTimeSlot, setSelectedTimeSlot ] = useState("");
  const handleSelectedTimeSlotChange = (timeSlot: string) => {
    setSelectedTimeSlot(timeSlot);
  };

  const {
    data: getStaffTimeSlots,
    isPending: isGetStaffTimeSlotsPending,
    refetch: refetchStaffTimeSlots,
  } = useGetStaffTimeSlotsByDate(api, selectedAppointment.StaffId, formattedDateISO(date));

  const [ freeTimeSlots, setFreeTimeSlots ] = useState(getStaffTimeSlots);
  useEffect(() => {
    if (getStaffTimeSlots) {
      setFreeTimeSlots(getStaffTimeSlots.filter((item) => item.isAvailable));
    } else {
      setFreeTimeSlots(null);
    }

    return () => {
      setFreeTimeSlots(null);
    }
  }, [date, getStaffTimeSlots]);

  const handleFreeTimeSlotsChange = (timeSlot: string, checked: boolean) => {
    const resetTimeSlots = freeTimeSlots.map((item) => {
      return { ...item, isAvailable: true };
    });
    const newTimeSlots = resetTimeSlots.map((item) => {
      if (timeSlot.id === item.id) {
        handleSelectedTimeSlotChange(timeSlot.time);
        return { ...item, isAvailable: !checked };
      }
      return item;
    });
    setFreeTimeSlots(newTimeSlots);
  };

  const onFinish = async (values: any) => {
    hidePatchAppointmentModal();
    const start_time = `${date}T${selectedTimeSlot}:00Z`;
    await patchAppointment({
      id: selectedAppointment.Id,
      values: {
        comments: values.comments,
        start_time: start_time,
      },
    });
    refetchStaffTimeSlots();
    form.resetFields();
    handleSelectedAppointment({});
  };

  const formStyles: CSSProperties = {
    maxWidth: 360,
  };

  return (
    <Form
      form={form}
      name="patchAppointment"
      labelCol={{ span: 10 }}
      layout="horizontal"
      onFinish={onFinish}
      style={formStyles}
    >
      <Form.Item
        label="Время приема"
        name="date"
      >
        <DatePicker
          onChange={handleAppointmentDateChange}
          format="YYYY-MM-DD"
          placeholder="Время начала"
          prefix={<FieldTimeOutlined />}
        />
      </Form.Item>
      <Form.Item
        label="Время приема"
        name="start_time"
      >
        {isGetStaffTimeSlotsPending && !freeTimeSlots && <Spin />}
        {!isGetStaffTimeSlotsPending && !freeTimeSlots && <Typography.Text>Нет доступных слотов времени</Typography.Text>}
        {!isGetStaffTimeSlotsPending && freeTimeSlots && (
          <CustomTimeSlots
            timeSlots={freeTimeSlots}
            handleChange={handleFreeTimeSlotsChange}
          />
        )}
      </Form.Item>
      <Form.Item
        label="Комментарии"
        name="comments"
      >
        <Input.TextArea placeholder="Комментарии" />
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

export default PatchAppointmentsForm;
