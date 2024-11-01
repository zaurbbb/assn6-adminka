import { Typography } from "antd";
import React, {
  FC,
  ReactNode,
} from "react";

interface CustomMaskTextProps {
  children: ReactNode;
}

const CustomDeleteMaskText: FC<CustomMaskTextProps> = ({
  children,
}) => {
  return (
    <Typography.Paragraph>
      Вы уверены, что хотите удалить <Typography.Text mark>«{children}»</Typography.Text>?

      <br/>
      <br/>

      <Typography.Text type="danger">
        Это действие нельзя будет отменить.
      </Typography.Text>
    </Typography.Paragraph>
  );
};

export default CustomDeleteMaskText;

