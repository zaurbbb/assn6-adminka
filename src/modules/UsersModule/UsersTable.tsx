import {
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Flex,
  Row,
  Table,
} from "antd";
import React, { CSSProperties } from "react";
import CustomCardTitle from "../../components/CustomCardTitle";
import { useTableSearch } from "../../hooks/useTableSearch";
import { useGetUsers } from "../../tanstack/useUsers";
import { formattedAddress } from "../../utils/formattedAddress";
import { formattedDate } from "../../utils/formattedDate";
import { onTableFilter } from "../../utils/onTableFilter";
import { rolesOptions } from "../../utils/rolesOptions";


const UsersModule: React.FC = ({
  api,
  setSelectedUser,
  showPatchUserModal,
  showDeleteUserModal,
}) => {
  const {
    data: getUsersData,
    isLoading: isGetUsersLoading,
    isRefetching: isRefetchingUsers,
  } = useGetUsers(api);

  const loading = isGetUsersLoading || isRefetchingUsers;

  const tableStyles: CSSProperties = {
    width: "100%",
  };

  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    showDeleteUserModal();
  };

  const handlePatchUser = (user) => {
    setSelectedUser(user);
    showPatchUserModal();
  }

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
      title: "Имя",
      dataIndex: "username",
      key: "username",
      width: "10%",
    },
    {
      title: "Почта",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Телефон",
      dataIndex: "phone_number",
      key: "phone_number",
    },
    {
      title: "Роль",
      dataIndex: "role",
      key: "role",
    },
    {
      title: '',
      dataIndex: '',
      key: 'x',
      render: (user) => (
        <Flex gap="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => handlePatchUser(user)}
          />
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteUser(user)}
          />
        </Flex>
      ),
    },
  ];

  return (
    <Card
      title={"Пользователи"}
    >
      <Row
        gutter={[ 16, 16 ]}
        style={{ marginTop: "16px" }}
      >
        <Col span={24}>
          <Table
            scroll={{ x: 1000 }}
            dataSource={getUsersData}
            columns={columns}
            style={tableStyles}
            loading={loading}
            showSorterTooltip={false}
          />
        </Col>
      </Row>

    </Card>
  );
};

export default UsersModule;