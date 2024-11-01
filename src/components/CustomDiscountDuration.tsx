import React, { FC } from "react";
import { Typography } from "antd";
import { formattedDateTime } from "../utils/formattedDate";
import { formattedPrice } from "../utils/formattedPrice";

const CustomDiscountDuration: FC = ({
  object,
}) => {
  if (!object) {
    return;
  }

  return (
    <Typography.Paragraph>
      {formattedPrice(object.discount)}
      <br />
      Действует: {formattedDateTime(object.start_date)} - {formattedDateTime(object.end_date)}
    </Typography.Paragraph>
  );
};

export default CustomDiscountDuration;

