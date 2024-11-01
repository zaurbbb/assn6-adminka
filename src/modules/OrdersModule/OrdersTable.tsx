import { EditOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Flex,
  Table,
} from "antd";
import React from "react";
import CustomCardTitle from "../../components/CustomCardTitle";
import CustomDeliveryMethod from "../../components/CustomDeliveryMethod";
import CustomStatus from "../../components/CustomStatus.tsx";
import { useTableSearch } from "../../hooks/useTableSearch";
import { useGetOrders } from "../../tanstack/useOrders";
import { deliveryMethodOptions } from "../../utils/deliveryMethodOptions";
import { formattedPrice } from "../../utils/formattedPrice";
import { onTableFilter } from "../../utils/onTableFilter";
import { statusOptions } from "../../utils/statusOptions";

const OrdersTable: React.FC = ({
  api,
  setSelectedOrder,
  showOrderDetailsModal,
  showPatchOrderModal,
}) => {
  const { getColumnSearchProps } = useTableSearch();
  const {
    data: getOrdersData,
    isLoading: isGetOrdersLoading,
    isRefetching: isRefetchingOrders,
  } = useGetOrders(api);
  const loading = isGetOrdersLoading || isRefetchingOrders;

  const handleShowOrderDetails = async (selectedOrder) => {
    setSelectedOrder(selectedOrder);
    showOrderDetailsModal();
  }
  const handlePatchOrder = async (selectedOrder) => {
    setSelectedOrder(selectedOrder);
    showPatchOrderModal();
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "3%",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Пользователь",
      dataIndex: "user",
      key: "user",
      width: "10%",
      render: (user) => user.username,
    },
    {
      title: "Итоговая сумма",
      dataIndex: "total_price",
      key: "total_price",
      width: "10%",
    },
    {
      title: "Статус",
      dataIndex: "status",
      key: "status",
      width: "10%",
      // filters: statusOptions,
      // onFilter: (value, record) => onTableFilter(value, record, "status"),
      render: (status) => <CustomStatus status={status} />,
    },
    // {
    //   title: "Номер телефона",
    //   dataIndex: "user",
    //   key: "user",
    //   width: "10%",
    //   render: (user) => user.phone,
    // },
    // {
    //   title: "Итоговая цена без скидки",
    //   dataIndex: "total_price",
    //   key: "total_price",
    //   width: "10%",
    //   render: (total_price) => formattedPrice(total_price),
    // },
    // {
    //   title: "Итоговая цена со скидкой",
    //   dataIndex: "discounted_price",
    //   key: "discounted_price",
    //   width: "10%",
    //   render: (discounted_price) => formattedPrice(discounted_price),
    // },
    // {
    //   title: "Город",
    //   dataIndex: "city",
    //   key: "city",
    //   width: "8%",
    //   render: (city) => city.name,
    // },

    // {
    //   title: "Способ доставки",
    //   dataIndex: "delivery_method",
    //   key: "delivery_method",
    //   width: "5%",
    //   filters: deliveryMethodOptions,
    //   onFilter: (value, record) => onTableFilter(value, record, "delivery_method"),
    //   render: (delivery_method) => <CustomDeliveryMethod method={delivery_method} />,
    // },
    {
      title: '',
      dataIndex: '',
      key: 'x',
      width: "10%",
      render: (item) => (
        <Flex
          justify="flex-end"
          gap="small"
        >
          <Button onClick={() => handleShowOrderDetails(item)}>
            Детали заказа
          </Button>
          <Button
            icon={<EditOutlined />}
            type="dashed"
            onClick={() => handlePatchOrder(item)}
          />
        </Flex>
      ),
    },
  ];

  return (
    <Card title={<CustomCardTitle title="Заказы" />}>
      <Table
        dataSource={getOrdersData}
        columns={columns}
        loading={loading}
        showSorterTooltip={false}
      />
    </Card>
  );
};

export default OrdersTable;