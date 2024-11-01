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
  CollapseProps,
  Flex,
  List,
  Row,
  Space,
  Typography,
} from "antd";
import React, { CSSProperties } from "react";
import {
  Link,
  useParams,
} from "react-router-dom";
import { useGetSubCategories } from "../../tanstack/useSubCategories";


const SubCategoriesList: React.FC = ({
  api,
  setSelectedSubCategory,
  showPostSubCategoryModal,
  showPatchSubCategoryModal,
  showDeleteSubCategoryModal,
}) => {
  const { categoryId } = useParams();

  const {
    data: getSubCategoryData,
    isLoading: isGetSubCategoryLoading,
    isRefetching: isRefetchingSubCategory,
  } = useGetSubCategories(api, categoryId);
  const listLoading = isGetSubCategoryLoading || isRefetchingSubCategory;

  const handlePostSubCategory = async (selectedSubCategory) => {
    setSelectedSubCategory(selectedSubCategory);
    showPostSubCategoryModal();
  };
  const handlePatchSubCategory = async (selectedSubCategory) => {
    setSelectedSubCategory(selectedSubCategory);
    showPatchSubCategoryModal();
  };
  const handleDeleteSubCategory = async (selectedSubCategory) => {
    setSelectedSubCategory(selectedSubCategory);
    showDeleteSubCategoryModal();
  };

  const items: CollapseProps['items'] = getSubCategoryData?.map((item) => ({
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
        <Flex justify="space-between">
          <span>Подкатегории</span>
          <Button
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => showPostSubCategoryModal()}
          >
            Добавить
          </Button>
        </Flex>
      )}
    >
      <List
        itemLayout="horizontal"
        loading={listLoading}
        dataSource={items}
        bordered={false}
        size="small"
        renderItem={(item) => (
          <List.Item>
            <Typography.Paragraph style={paragraphStyles}>{item.label}</Typography.Paragraph>
            <Flex
              justify="flex-end"
              align="center"
              gap="small"
            >
              <Link to={`/categories/${categoryId}/subCategories/${item.key}/products`}>
                <Button>
                  Товары
                </Button>
              </Link>
              <Link to={`/categories/${categoryId}/subCategories/${item.key}/characteristics`}>
                <Button>
                  Харакретистики
                </Button>
              </Link>
              <Button
                icon={<EditOutlined />}
                type="dashed"
                onClick={() => handlePatchSubCategory(item)}
              />
              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleDeleteSubCategory(item)}
              />
            </Flex>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default SubCategoriesList;