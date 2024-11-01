import {
  Table,
  Typography,
} from "antd";
import React from "react";
import { formattedAddress } from "../../../utils/formattedAddress";
import { formattedDiscount } from "../../../utils/formattedDiscount";
import { formattedPrice } from "../../../utils/formattedPrice";

const OrdersTable: React.FC = ({
  selectedOrder,
}) => {
  const products = selectedOrder?.items;
  const orderDetails = products.map((product) => ({
    key: product.id,
    ...product,
  }));
  // const address = formattedAddress(cityName, region, street, street_num, apartment);

  const columns = [
    {
      title: 'Название',
      dataIndex: 'product_name',
      key: 'product_name',
      width: "10%",
    },
    {
      title: 'Категория',
      dataIndex: "product_category",
      key: "product_category",
      width: "8%",
    },
    {
      title: "Количество",
      dataIndex: "quantity",
      key: "quantity",
      width: "5%",
    },
    {
      title: "Цена",
      dataIndex: "product_price",
      key: "product_price",
      width: "8%",
    },
  ];

  return (
    <>
      {/*<Typography.Paragraph>Адрес: <Typography.Text mark>{address}</Typography.Text></Typography.Paragraph>*/}
      {/*<Typography.Paragraph>Почта: <Typography.Text mark>{email}</Typography.Text></Typography.Paragraph>*/}
      <Table
        dataSource={orderDetails}
        columns={columns}
        showSorterTooltip={false}
      />
    </>
  );
};

export default OrdersTable;