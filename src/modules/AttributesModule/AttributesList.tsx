import {
  DeleteOutlined,
  EditOutlined,
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
import { useParams } from "react-router-dom";
import CustomCardTitle from "../../components/CustomCardTitle";
import { useGetAttributes } from "../../tanstack/useAttributes";

const AttributesList: React.FC = ({
  api,
  setSelectedAttribute,
  showPostAttributeModal,
  showPatchAttributeModal,
  showDeleteAttributeModal,
}) => {
  const { characteristicId } = useParams();
  const {
    data: getAttributeData,
    isLoading: isGetAttributeLoading,
    isRefetching: isRefetchingAttributes,
  } = useGetAttributes(api, characteristicId);
  const loading = isGetAttributeLoading || isRefetchingAttributes;

  const handlePatchAttribute = async (selectedAttribute) => {
    setSelectedAttribute(selectedAttribute);
    showPatchAttributeModal();
  };
  const handleDeleteAttribute = async (selectedAttribute) => {
    setSelectedAttribute(selectedAttribute);
    showDeleteAttributeModal();
  };

  const items: CollapseProps['items'] = getAttributeData?.map((item) => ({
    key: item.id,
    label: item.name,
    characteristic_id: item.characteristic_id,
  })) || [];

  const paragraphStyles: CSSProperties = {
    width: "100%",
    marginBottom: "0",
  };

  return (
    <Card
      title={(
        <CustomCardTitle
          title="Атрибуты"
          showModalAction={showPostAttributeModal}
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
              <Button
                icon={<EditOutlined />}
                type="dashed"
                onClick={() => handlePatchAttribute(item)}
              />
              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleDeleteAttribute(item)}
              />
            </Flex>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default AttributesList;
