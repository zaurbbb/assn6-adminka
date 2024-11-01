import {
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Flex,
  Table,
  Image,
} from "antd";
import React from "react";
import {
  Link,
  useParams,
} from "react-router-dom";
import CustomCardTitle from "../../components/CustomCardTitle";
import { useGetStaff } from "../../tanstack/useStaff";

const StaffTable: React.FC = ({
  api,
  setSelectedStaff,
  showPatchWorkTimeModal,
  showPostStaffModal,
  showPatchStaffModal,
  showDeleteStaffModal,
}) => {
  const {
    serviceId,
    serviceAddressId,
  } = useParams();

  const paramId = serviceId || serviceAddressId;
  const paramType = paramId && (serviceId ? "service" : "serviceAddress");

  const {
    data: getStaffData,
    isLoading: isGetStaffLoading,
    isRefetching: isRefetchingStaff,
  } = useGetStaff(api, paramId, paramType);
  const loading = isGetStaffLoading || isRefetchingStaff;

  const handlePatchWorkTime = async (selectedStaff) => {
    setSelectedStaff(selectedStaff);
    showPatchWorkTimeModal();
  };
  const handlePatchStaff = async (selectedStaff) => {
    setSelectedStaff(selectedStaff);
    showPatchStaffModal();
  };
  const handleDeleteStaff = async (selectedStaff) => {
    setSelectedStaff(selectedStaff);
    showDeleteStaffModal();
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "Id",
      key: "Id",
      width: "5%",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "ФИО",
      dataIndex: "FullName",
      key: "FullName",
      width: "15%",
    },
    {
      title: "Должность",
      dataIndex: "Occupation",
      key: "Occupation",
      width: "15%",
    },
    {
      title: "Опыт работы",
      dataIndex: "Experience",
      key: "Experience",
      width: "15%",
      render: (experience) => `${experience} лет`,
    },
    {
      title: "Аватар",
      dataIndex: "Avatar",
      key: "Avatar",
      width: "15%",
      render: (Avatar) => {
        return (
          <Image
            src={Avatar}
            alt="staff"
          />
        );
      },
    },
    {
      title: '',
      dataIndex: '',
      key: 'x',
      width: "15%",
      render: (item) => (
        <Flex
          justify="flex-end"
          gap="small"
        >
          <Button onClick={() => handlePatchWorkTime(item)}>
            Расписание
          </Button>
          <Link to={`/appointments/${item.Id}`}>
            <Button>
              Записи
            </Button>
          </Link>
          <Button
            icon={<EditOutlined />}
            type="dashed"
            onClick={() => handlePatchStaff(item)}
          />
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteStaff(item)}
          />
        </Flex>
      ),
    },
  ];

  return (
    <Card
      title={(
        <CustomCardTitle
          title="Специалисты"
          showModalAction={showPostStaffModal}
        />
      )}
    >
      <Table
        dataSource={getStaffData}
        columns={columns}
        loading={loading}
        showSorterTooltip={false}
      />
    </Card>
  );
};

export default StaffTable;