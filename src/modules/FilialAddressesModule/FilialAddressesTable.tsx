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
import { useGetFilialAddresses } from "../../tanstack/useFilialAddresses";
import { formattedAddress } from "../../utils/formattedAddress";


const FilialAddressesTable: React.FC = ({
  api,
  setSelectedFilialAddress,
  showPostFilialAddressModal,
  showPatchFilialAddressModal,
  showDeleteFilialAddressModal,
}) => {
  const {
    data: getFilialAddressesData,
    isLoading: isGetFilialAddressesLoading,
    isRefetching: isRefetchingFilialAddresses,
  } = useGetFilialAddresses(api);
  const loading = isGetFilialAddressesLoading || isRefetchingFilialAddresses;

  const handlePatchFilialAddress = async (selectedFilialAddress) => {
    setSelectedFilialAddress(selectedFilialAddress);
    showPatchFilialAddressModal();
  };
  const handleDeleteFilialAddress = async (selectedFilialAddress) => {
    setSelectedFilialAddress(selectedFilialAddress);
    showDeleteFilialAddressModal();
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "5%",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Адрес",
      dataIndex: "",
      key: "",
      render: (filialAddress) => formattedAddress(
        filialAddress.city.name,
        filialAddress.region,
        filialAddress.street,
        filialAddress.street_num,
        filialAddress.apartment,
      ),
    },
    {
      title: "",
      dataIndex: "",
      key: "x",
      render: (filialAddress) => (
        <Flex
          justify="flex-end"
          gap="small"
        >
          <Button
            icon={<EditOutlined />}
            type="dashed"
            onClick={() => handlePatchFilialAddress(filialAddress)}
          />
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteFilialAddress(filialAddress)}
          />
        </Flex>
      ),
    },
  ];

  return (
    <Card
      title={(
        <Flex justify="space-between">
          <span>Точки доставки</span>
          <Button
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => showPostFilialAddressModal()}
          >
            Добавить
          </Button>
        </Flex>
      )}
    >
      <Table
        dataSource={getFilialAddressesData}
        columns={columns}
        loading={loading}
        showSorterTooltip={false}
      />
    </Card>
  );
};

export default FilialAddressesTable;