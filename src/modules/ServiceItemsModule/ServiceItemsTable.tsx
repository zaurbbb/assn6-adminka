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
import { useParams } from "react-router-dom";
import CustomCardTitle from "../../components/CustomCardTitle";
import { useGetServiceItems } from "../../tanstack/useServiceItems";


const ServiceItemsTable: React.FC = ({
  api,
  setSelectedServiceItem,
  showPostServiceItemModal,
  showPatchServiceItemModal,
  showDeleteServiceItemModal,
}) => {
  const { subServiceId } = useParams();
  const {
    data: getServiceItemsData,
    isLoading: isGetServiceItemsLoading,
    isRefetching: isRefetchingServiceItems,
  } = useGetServiceItems(api, subServiceId);

  const loading = isGetServiceItemsLoading || isRefetchingServiceItems;

  const handlePatchServiceItem = async (selectedServiceItem) => {
    setSelectedServiceItem(selectedServiceItem);
    showPatchServiceItemModal();
  };
  const handleDeleteServiceItem = async (selectedServiceItem) => {
    setSelectedServiceItem(selectedServiceItem);
    showDeleteServiceItemModal();
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
      title: "Название",
      dataIndex: "title",
      key: "title",
      width: "15%",
    },
    {
      title: "Длительность (мин)",
      dataIndex: "duration",
      key: "duration",
      width: "15%",
    },
    {
      title: "Описание",
      dataIndex: "description",
      key: "description",
      width: "35%",
    },
    {
      title: "Цена (kzt)",
      dataIndex: "price",
      key: "price",
      width: "8%",
    },
    {
      title: '',
      dataIndex: '',
      key: 'x',
      width: "22%",
      render: (item) => (
        <Flex
          justify="flex-end"
          gap="small"
        >
          <Button
            icon={<EditOutlined />}
            type="dashed"
            onClick={() => handlePatchServiceItem(item)}
          />
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteServiceItem(item)}
          />
        </Flex>
      ),
    },
  ];

  return (
    <Card
      title={(
        <CustomCardTitle
          title="Услуги"
          showModalAction={showPostServiceItemModal}
        />
      )}
    >
      <Table
        dataSource={getServiceItemsData}
        columns={columns}
        loading={loading}
        showSorterTooltip={false}
      />
    </Card>
  );
};

export default ServiceItemsTable;