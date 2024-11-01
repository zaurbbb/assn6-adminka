import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SendOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Collapse,
  CollapseProps,
  Flex,
  List,
  Row,
  Space,
  Typography,
} from "antd";
import React, { CSSProperties } from "react";
import { Link } from "react-router-dom";
import CustomCardTitle from "../../components/CustomCardTitle";
import { useGetCategories } from "../../tanstack/useCategories";


const CategoriesList: React.FC = ({
  api,
  setSelectedCategory,
  showPostCategoryModal,
  showPatchCategoryModal,
  showDeleteCategoryModal,
}) => {
  const {
    data: getCategoryData,
    isLoading: isGetCategoryLoading,
    isRefetching: isRefetchingCategories,
  } = useGetCategories(api);
  const loading = isGetCategoryLoading || isRefetchingCategories;

  const handlePatchCategory = async (selectedCategory) => {
    setSelectedCategory(selectedCategory);
    showPatchCategoryModal();
  };
  const handleDeleteCategory = async (selectedCategory) => {
    setSelectedCategory(selectedCategory);
    showDeleteCategoryModal();
  };

  const items: CollapseProps['items'] = getCategoryData?.map((item) => ({
    key: item.id,
    name: item.name,
  })) || [];

  const paragraphStyles: CSSProperties = {
    width: "100%",
    marginBottom: "0",
  };

  return (
    <Card
      title={(
        <CustomCardTitle
          title="Категории"
          showModalAction={showPostCategoryModal}
        />
      )}
      loading={loading}
    >
      <List
        itemLayout="horizontal"
        loading={loading}
        dataSource={items}
        bordered={false}
        size="small"
        renderItem={(item) => (
          <List.Item>
            <Typography.Paragraph style={paragraphStyles}>{item.name}</Typography.Paragraph>
            <Flex
              justify="flex-end"
              align="center"
              gap="small"
            >
              <Button
                icon={<EditOutlined />}
                type="dashed"
                onClick={() => handlePatchCategory(item)}
              />
              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleDeleteCategory(item)}
              />
            </Flex>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default CategoriesList;