import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Flex,
  Typography,
} from "antd";
import React, {
  FC,
  ReactNode,
} from "react";

interface CustomCardTitleProps {
  title: ReactNode;
  showModalAction?: () => void;
}

const CustomCardTitle: FC<CustomCardTitleProps> = ({
  title,
  showModalAction,
}) => {
  return (
    <Flex justify="space-between">
      <span>{title}</span>
      {showModalAction && (
        <Button
          icon={<PlusOutlined />}
          type="primary"
          onClick={() => showModalAction()}
        >
          Добавить
        </Button>
      )}
    </Flex>
  );
};

export default CustomCardTitle;

