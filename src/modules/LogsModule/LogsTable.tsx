import { EditOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Flex,
  List,
  Typography,
  Table,
} from "antd";
import React from "react";
import CustomCardTitle from "../../components/CustomCardTitle";
import CustomStatus from "../../components/CustomStatus.tsx";
import { useTableSearch } from "../../hooks/useTableSearch";
import { useGetLogs } from "../../tanstack/useLogs";
import { useGetOrders } from "../../tanstack/useOrders";

const LogsTable: React.FC = ({
  api,
}) => {
  const {
    data: getLogsData,
    isLoading: isGetLogsLoading,
    isRefetching: isRefetchingLogs,
  } = useGetLogs(api);
  const dataSources = getLogsData?.map((item) => {
    return {
      title: item,
    };
  });
  console.log(getLogsData);
  const loading = isGetLogsLoading || isRefetchingLogs;


  console.log("dataSources", dataSources);
  return (
    <Card title={<CustomCardTitle title="История" />}>
      <List
        loading={loading}
        dataSource={getLogsData}
        renderItem={(item) => (
          <List.Item>
            <Typography.Text code>{item}</Typography.Text>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default LogsTable;