import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Flex,
  Table,
} from "antd";
import React from "react";
import { useGetServiceAddresses } from "../../tanstack/useServiceAddresses";


const ServiceAddressesTable: React.FC = ({
  api,
  setSelectedServiceAddress,
  showPostServiceAddressModal,
  showPatchServiceAddressModal,
  showDeleteServiceAddressModal,
}) => {
  const {
    data: getServiceAddressesData,
    isLoading: isGetServiceAddressesLoading,
    isRefetching: isRefetchingServiceAddresses,
  } = useGetServiceAddresses(api);
  const loading = isGetServiceAddressesLoading || isRefetchingServiceAddresses;

  const handlePatchServiceAddress = async (selectedServiceAddress) => {
    setSelectedServiceAddress(selectedServiceAddress);
    showPatchServiceAddressModal();
  };
  const handleDeleteServiceAddress = async (selectedServiceAddress) => {
    setSelectedServiceAddress(selectedServiceAddress);
    showDeleteServiceAddressModal();
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
      title: "Адрес",
      dataIndex: "Address",
      key: "Address",
      width: "25%",
    },
    {
      title: "Город",
      dataIndex: "City",
      key: "City",
      width: "25%",
      render: (City) => City.Name,
    },
    {
      title: '',
      dataIndex: '',
      key: 'x',
      render: (Address) => (
        <Flex
          justify="flex-end"
          gap="small"
        >
          <Button
            icon={<EditOutlined />}
            type="dashed"
            onClick={() => handlePatchServiceAddress(Address)}
          />
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteServiceAddress(Address)}
          />
        </Flex>
      ),
    },
  ];

  return (
    <Card
      title={(
        <Flex justify="space-between">
          <span>Адреса</span>
          <Button
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => showPostServiceAddressModal()}
          >
            Добавить
          </Button>
        </Flex>
      )}
    >
      <Table
        dataSource={getServiceAddressesData}
        columns={columns}
        loading={loading}
        showSorterTooltip={false}
      />
    </Card>
  );
};

export default ServiceAddressesTable;