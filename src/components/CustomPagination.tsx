import { Pagination } from "antd";
import React, { FC } from "react";

const CustomPagination: FC = ({
  query,
  handleQueryChange,
  total,
}) => {
  return (
    <Pagination
      align="center"
      defaultCurrent={1}
      current={query.page}
      total={total * query.limit}
      onChange={handleQueryChange}
    />
  );
};

export default CustomPagination;

