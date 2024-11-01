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
import CustomCardTitle from "../../components/CustomCardTitle";
import { useGetCities } from "../../tanstack/useCities";


const CitiesTable: React.FC = ({
  api,
  setSelectedCity,
  showPostCityModal,
  showPatchCityModal,
  showDeleteCityModal,
}) => {
  const {
    data: getCitiesData,
    isLoading: isGetCitiesLoading,
    isRefetching: isRefetchingCities,
  } = useGetCities(api);
  const loading = isGetCitiesLoading || isRefetchingCities;

  const handlePatchCity = async (selectedCity) => {
    setSelectedCity(selectedCity);
    showPatchCityModal();
  };
  const handleDeleteCity = async (selectedCity) => {
    setSelectedCity(selectedCity);
    showDeleteCityModal();
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
      dataIndex: "name",
      key: "name",
      width: "20%",
    },
    {
      title: "Срок доставки (в днях)",
      dataIndex: "delivery_duration_days",
      key: "delivery_duration_days",
      width: "20%",
    },
    {
      title: '',
      dataIndex: '',
      key: 'x',
      width: "55%",
      render: (item) => (
        <Flex
          justify="flex-end"
          gap="small"
        >
          <Button
            icon={<EditOutlined />}
            type="dashed"
            onClick={() => handlePatchCity(item)}
          />
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteCity(item)}
          />
        </Flex>
      ),
    },
  ];

  return (
    <Card
      title={(
        <CustomCardTitle
          title="Города"
          showModalAction={showPostCityModal}
        />
      )}
    >
      <Table
        dataSource={getCitiesData}
        columns={columns}
        loading={loading}
        showSorterTooltip={false}
      />
    </Card>
  );
};

export default CitiesTable;