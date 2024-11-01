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
import CustomActions from "../../components/CustomActions";
import CustomCardTitle from "../../components/CustomCardTitle";
import { useGetContacts } from "../../tanstack/useContacts";


const ContactsTable: React.FC = ({
  api,
  setSelectedContact,
  showPatchContactModal,
}) => {
  const {
    data: getContactsData,
    isLoading: isGetContactsLoading,
    isRefetching: isRefetchingContacts,
  } = useGetContacts(api);
  const loading = isGetContactsLoading || isRefetchingContacts;

  const handlePatchContact = async (selectedContact) => {
    setSelectedContact(selectedContact);
    showPatchContactModal();
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
      width: "20%",
    },
    {
      title: "Ссылка",
      dataIndex: "value",
      key: "value",
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
            onClick={() => handlePatchContact(item)}
          />
        </Flex>
      ),
    },
  ];

  return (
    <Card
      title={<CustomCardTitle title="Контакты" />}
    >
      <Table
        dataSource={getContactsData}
        columns={columns}
        loading={loading}
        showSorterTooltip={false}
      />
    </Card>
  );
};

export default ContactsTable;