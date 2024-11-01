import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  CollapseProps,
  Flex,
  List,
  Typography,
} from "antd";
import React, { CSSProperties } from "react";
import { Link } from "react-router-dom";
import CustomCardTitle from "../../components/CustomCardTitle";
import { useGetServices } from "../../tanstack/useServices";


const ServicesList: React.FC = ({
  api,
  setSelectedService,
  showPostServiceModal,
  showPatchServiceModal,
  showDeleteServiceModal,
}) => {
  const {
    data: getServicesData,
    isLoading: isGetServicesLoading,
    isRefetching: isRefetchingServices,
  } = useGetServices(api);
  const loading = isGetServicesLoading || isRefetchingServices;

  const handlePostServices = async (selectedService) => {
    setSelectedService(selectedService);
    showPostServiceModal();
  };
  const handlePatchService = async (selectedService) => {
    setSelectedService(selectedService);
    showPatchServiceModal();
  };
  const handleDeleteService = async (selectedService) => {
    setSelectedService(selectedService);
    showDeleteServiceModal();
  };

  const items: CollapseProps['items'] = getServicesData?.map((item) => ({
    key: item.id,
    label: item.name,
  })) || [];

  const paragraphStyles: CSSProperties = {
    width: "100%",
    marginBottom: "0",
  };

  return (
    <Card
      title={(
        <CustomCardTitle
          title="Сервисы"
          showModalAction={showPostServiceModal}
        />
      )}
    >
      <List
        itemLayout="horizontal"
        loading={loading}
        dataSource={items}
        bordered={false}
        size="small"
        renderItem={(item) => (
          <List.Item>
            <Typography.Paragraph style={paragraphStyles}>
              {item.label}
            </Typography.Paragraph>
            <Flex
              justify="flex-end"
              align="center"
              gap="small"
            >
              <Link to={`/services/${item.key}/subServices`}>
                <Button>
                  Подсервисы
                </Button>
              </Link>
              <Link to={`/services/${item.key}/staff`}>
                <Button>
                  Специалисты
                </Button>
              </Link>
              <Button
                icon={<EditOutlined />}
                type="dashed"
                onClick={() => handlePatchService(item)}
              />
              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleDeleteService(item)}
              />
            </Flex>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default ServicesList;