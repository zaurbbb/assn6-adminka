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
import {
  Link,
  useParams,
} from "react-router-dom";
import CustomCardTitle from "../../components/CustomCardTitle";
import { useGetCharacteristics } from "../../tanstack/useCharacteristics";


const CharacteristicsList: React.FC = ({
  api,
  setSelectedCharacteristic,
  showPostCharacteristicModal,
  showPatchCharacteristicModal,
  showDeleteCharacteristicModal,
}) => {
  const {
    characteristicId,
    subCategoryId,
  } = useParams();
  const {
    data: getCharacteristicData,
    isLoading: isGetCharacteristicLoading,
    isRefetching: isRefetchingCharacteristics,
  } = useGetCharacteristics(api, subCategoryId);
  const loading = isGetCharacteristicLoading || isRefetchingCharacteristics;

  const handlePatchCharacteristic = async (selectedCharacteristic) => {
    setSelectedCharacteristic(selectedCharacteristic);
    showPatchCharacteristicModal();
  };
  const handleDeleteCharacteristic = async (selectedCharacteristic) => {
    setSelectedCharacteristic(selectedCharacteristic);
    showDeleteCharacteristicModal();
  };

  const items: CollapseProps['items'] = getCharacteristicData?.map((item) => ({
    key: item.id,
    label: item.name,
    subcategory_id: item.subcategory_id,
  })) || [];

  const paragraphStyles: CSSProperties = {
    width: "100%",
    marginBottom: "0",
  };

  return (
    <Card
      title={(
        <CustomCardTitle
          title="Характеристики"
          showModalAction={showPostCharacteristicModal}
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
              <Link to={`/characteristics/${item.key}/attributes`}>
                <Button>
                  Атрибуты
                </Button>
              </Link>
              <Button
                icon={<EditOutlined />}
                type="dashed"
                onClick={() => handlePatchCharacteristic(item)}
              />
              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleDeleteCharacteristic(item)}
              />
            </Flex>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default CharacteristicsList;