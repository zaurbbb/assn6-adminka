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
import { useGetPersonalAddresses } from "../../tanstack/usePersonalAddresses";
import { formattedAddress } from "../../utils/formattedAddress";


const PersonalAddressesTable: React.FC = ({
  api,
  setSelectedPersonalAddress,
  showPostPersonalAddressModal,
  showPatchPersonalAddressModal,
  showDeletePersonalAddressModal,
}) => {
  const {
    data: getPersonalAddressesData,
    isLoading: isGetPersonalAddressesLoading,
    isRefetching: isRefetchingPersonalAddresses,
  } = useGetPersonalAddresses(api);
  const loading = isGetPersonalAddressesLoading || isRefetchingPersonalAddresses;

  const handlePatchPersonalAddress = async (selectedPersonalAddress) => {
    setSelectedPersonalAddress(selectedPersonalAddress);
    showPatchPersonalAddressModal();
  };
  const handleDeletePersonalAddress = async (selectedPersonalAddress) => {
    setSelectedPersonalAddress(selectedPersonalAddress);
    showDeletePersonalAddressModal();
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
      title: "Пользователь",
      dataIndex: "user",
      key: "user",
      width: "5%",
    },
    {
      title: "Адрес",
      dataIndex: "",
      key: "",
      render: (personalAddress) => formattedAddress(
        personalAddress.city.name,
        personalAddress.region,
        personalAddress.street,
        personalAddress.street_num,
        personalAddress.apartment,
      ),
    },
    {
      title: "",
      dataIndex: "",
      key: "x",
      render: (personalAddress) => (
        <Flex
          justify="flex-end"
          gap="small"
        >
          <Button
            icon={<EditOutlined />}
            type="dashed"
            onClick={() => handlePatchPersonalAddress(personalAddress)}
          />
          {/*<Button*/}
          {/*  danger*/}
          {/*  icon={<DeleteOutlined />}*/}
          {/*  onClick={() => handleDeletePersonalAddress(personalAddress)}*/}
          {/*/>*/}
        </Flex>
      ),
    },
  ];

  return (
    <Card
      title={(
        <Flex justify="space-between">
          <span>Адреса пользователей</span>
          {/*<Button*/}
          {/*  icon={<PlusOutlined />}*/}
          {/*  type="primary"*/}
          {/*  onClick={() => showPostPersonalAddressModal()}*/}
          {/*>*/}
          {/*  Добавить*/}
          {/*</Button>*/}
        </Flex>
      )}
    >
      <Table
        dataSource={getPersonalAddressesData}
        columns={columns}
        loading={loading}
        showSorterTooltip={false}
      />
    </Card>
  );
};

export default PersonalAddressesTable;