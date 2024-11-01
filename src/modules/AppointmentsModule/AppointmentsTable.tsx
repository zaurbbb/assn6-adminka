import {
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Flex,
  Table,
} from "antd";
import React from "react";
import { useParams } from "react-router-dom";
import CustomCardTitle from "../../components/CustomCardTitle";
import { useGetAppointments } from "../../tanstack/useAppointments";
import {
  formattedDate,
  formattedTime,
} from "../../utils/formattedDate.ts";

const AppointmentsTable: React.FC = ({
  api,
  setSelectedAppointment,
  showPatchAppointmentModal,
  showDeleteAppointmentModal,
}) => {
  const { staffId } = useParams();
  const {
    data: getAppointmentsData,
    isLoading: isGetAppointmentsLoading,
    isRefetching: isRefetchingAppointments,
  } = useGetAppointments(api, staffId);

  const loading = isGetAppointmentsLoading || isRefetchingAppointments;

  // const handleShowAppointmentDetails = async (selectedAppointment) => {
  //   setSelectedAppointment(selectedAppointment);
  //   showAppointmentDetailsModal();
  // };
  const handlePatchAppointment = async (selectedAppointment) => {
    setSelectedAppointment(selectedAppointment);
    showPatchAppointmentModal();
  };
  const handleDeleteAppointment = async (selectedAppointment) => {
    setSelectedAppointment(selectedAppointment);
    showDeleteAppointmentModal();
  }

  const columns = [
    {
      title: "ID",
      dataIndex: "Id",
      key: "Id",
      width: "4%",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.Id - b.Id,
    },
    {
      title: "День",
      dataIndex: "",
      key: "x",
      width: "8%",
      render: (item) => formattedDate(item.StartTime),
    },
    {
      title: "Время",
      dataIndex: "",
      key: "x",
      width: "8%",
      render: (item) => formattedTime(item.StartTime) + " - " + formattedTime(item.EndTime),
    },
    {
      title: "Услуга",
      dataIndex: "ServiceItemDomain",
      key: "ServiceItemDomain",
      width: "12%",
      render: (ServiceItemDomain) => ServiceItemDomain.Title,
    },
    {
      title: "Специалист",
      dataIndex: "Staff",
      key: "Staff",
      width: "12%",
      render: (Staff) => Staff.FullName,
    },
    {
      title: "Клиент",
      dataIndex: "FullName",
      key: "FullName",
      width: "12%",
    },
    {
      title: "Номер телефона",
      dataIndex: "PhoneNumber",
      key: "PhoneNumber",
      width: "12%",
    },
    {
      title: "Комментарии",
      dataIndex: "Comments",
      key: "Comments",
      width: "8%",
    },
    {
      title: '',
      dataIndex: '',
      key: 'x',
      width: "10%",
      fixed: 'right',
      render: (item) => (
        <Flex
          justify="flex-end"
          gap="small"
        >
          <Button
            icon={<EditOutlined />}
            type="dashed"
            onClick={() => handlePatchAppointment(item)}
          />
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteAppointment(item)}
          />
        </Flex>
      ),
    },
  ];

  return (
    <Card title={<CustomCardTitle title="Записи" />}>
      <Table
        scroll={{ x: 1000 }}
        dataSource={getAppointmentsData}
        columns={columns}
        loading={loading}
        showSorterTooltip={false}
      />
    </Card>
  );
};

export default AppointmentsTable;