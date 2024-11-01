import {
  Tooltip,
  Typography,
} from "antd";
import React, {
  CSSProperties,
  FC,
  ReactNode,
} from "react";

interface CustomTextEllipsisProps {
  children: ReactNode;
}

const CustomTextEllipsis: FC<CustomTextEllipsisProps> = ({
  children,
}) => {
  const paragraphStyles: CSSProperties = {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  return (
    <Tooltip title={children}>
    <Typography.Paragraph style={paragraphStyles}>
      {children}
    </Typography.Paragraph>
    </Tooltip>
  );
};

export default CustomTextEllipsis;

