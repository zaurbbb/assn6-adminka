import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Button,
  Flex,
} from "antd";
import React, { FC } from "react";

const CustomDiscountAction: FC = ({
  product,
  handlePostDiscount,
  handleDeleteDiscount,
}) => {
  const discount = product?.discount?.discount;
  return (
    <Flex
      justify="space-between"
      align="center"
    >
      {discount && `${discount}%`}
      {discount && (
        <Button
          icon={<DeleteOutlined />}
          danger
          onClick={() => handleDeleteDiscount(product)}
        />
      )}
      {!discount && (
        <Button
          icon={<PlusOutlined />}
          onClick={() => handlePostDiscount(product)}
        />
      )}
    </Flex>
  );
};

export default CustomDiscountAction;

