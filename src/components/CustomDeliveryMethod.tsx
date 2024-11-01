import { Tag } from "antd";
import React, { FC } from "react";

const CustomDeliveryMethod: FC = ( {
  method,
}: {
  method: string
}) => {
  let methodColor = "";
  let methodText = "";

  // pickup and delivery
  switch (method) {
    case "pickup":
      methodColor = "cyan";
      methodText = "Самовывоз"
      break;
    case "delivery":
      methodColor = "purple";
      methodText = "Доставка"
      break;
    default:
      methodColor = "black";
      break;
  }
  return (
    <Tag color={methodColor}>
      {methodText}
    </Tag>
  );
};

export default CustomDeliveryMethod;

