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
import CustomCardTitle from "../../components/CustomCardTitle";
import { useGetCountries } from "../../tanstack/useCountries";


const CountriesTable: React.FC = ({
  api,
  setSelectedCountry,
  showPostCountryModal,
  showPatchCountryModal,
  showDeleteCountryModal,
}) => {
  const {
    data: getCountriesData,
    isLoading: isGetCountriesLoading,
    isRefetching: isRefetchingCountries,
  } = useGetCountries(api);
  const loading = isGetCountriesLoading || isRefetchingCountries;

  const handlePatchCountry = async (selectedCountry) => {
    setSelectedCountry(selectedCountry);
    showPatchCountryModal();
  };
  const handleDeleteCountry = async (selectedCountry) => {
    setSelectedCountry(selectedCountry);
    showDeleteCountryModal();
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
      title: '',
      dataIndex: '',
      key: 'x',
      width: "75%",
      render: (item) => (
        <Flex justify="flex-end" gap="small">
          <Button
            icon={<EditOutlined />}
            type="dashed"
            onClick={() => handlePatchCountry(item)}
          />
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteCountry(item)}
          />
        </Flex>
      ),
    },
  ];

  return (
    <Card
      title={(
        <CustomCardTitle
          title="Страны"
          showModalAction={showPostCountryModal}
        />
      )}
    >
      <Table
        dataSource={getCountriesData}
        columns={columns}
        // style={tableStyles}
        loading={loading}
        showSorterTooltip={false}
      />
    </Card>
  );
};

export default CountriesTable;