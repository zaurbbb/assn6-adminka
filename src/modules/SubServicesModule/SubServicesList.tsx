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
import {
  Link,
  useParams,
} from "react-router-dom";
import CustomCardTitle from "../../components/CustomCardTitle";
import { useGetSubServices } from "../../tanstack/useSubServices";


const SubServicesList: React.FC = ({
  api,
  setSelectedSubService,
  showPostSubServiceModal,
  showPatchSubServiceModal,
  showDeleteSubServiceModal,
}) => {
  const { serviceId } = useParams();
  const {
    data: getSubServicesData,
    isLoading: isGetSubServicesLoading,
    // refetch: refetchSubServices,
    isRefetching: isRefetchingSubServices,
  } = useGetSubServices(api, serviceId);
  const loading = isGetSubServicesLoading || isRefetchingSubServices;

  const handlePatchSubService = async (selectedService) => {
    setSelectedSubService(selectedService);
    showPatchSubServiceModal();
  };
  const handleDeleteService = async (selectedService) => {
    setSelectedSubService(selectedService);
    showDeleteSubServiceModal();
  };

  const items: CollapseProps['items'] = getSubServicesData?.map((item) => ({
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
          title="Подсервисы"
          showModalAction={showPostSubServiceModal}
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
              <Link to={`/services/${serviceId}/subServices/${item.key}/serviceItems`}>
                <Button>
                  Услуги
                </Button>
              </Link>
              <Button
                icon={<EditOutlined />}
                type="dashed"
                onClick={() => handlePatchSubService(item)}
              />
              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleDeleteService(item)}
              />
            </Flex>
          </List.Item>
        )}
      ></List>
    </Card>
  );
};

export default SubServicesList;