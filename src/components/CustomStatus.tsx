import { Tag } from "antd";
import React, { FC } from "react";

const CustomStatus: FC = ( {
  status,
}: {
  status: string
}) => {
  let statusColor = "";
  let statusText = "";
  switch (status) {
    case "created":
      statusColor = "cyan";
      statusText = "Сформирован"
      break;
    case "processing":
      statusColor = "orange";
      statusText = "В обработке"
      break;
    case "shipped":
      statusColor = "blue";
      statusText = "Отправлен"
      break;
    case "delivered":
      statusColor = "green";
      statusText = "Доставлен"
      break;
    case "canceled":
      statusColor = "red";
      statusText = "Отменен"
      break;
    default:
      statusColor = "black";
      break;
  }
  return (
    <Tag color={statusColor}>
      {statusText}
    </Tag>
  );
};

export default CustomStatus;

