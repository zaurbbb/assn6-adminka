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
import { Link } from "react-router-dom";
import CustomCardTitle from "../../components/CustomCardTitle";
import { useGetBrands } from "../../tanstack/useBrands";


const BrandsList: React.FC = ({
  api,
  setSelectedBrand,
  showPostBrandModal,
  showPatchBrandModal,
  showDeleteBrandModal,
}) => {
  const {
    data: getBrandData,
    isLoading: isGetBrandLoading,
    isRefetching: isRefetchingBrands,
  } = useGetBrands(api);
  const loading = isGetBrandLoading || isRefetchingBrands;

  const handlePatchBrand = async (selectedBrand) => {
    setSelectedBrand(selectedBrand);
    showPatchBrandModal();
  };
  const handleDeleteBrand = async (selectedBrand) => {
    setSelectedBrand(selectedBrand);
    showDeleteBrandModal();
  };

  const items: CollapseProps['items'] = getBrandData?.map((item) => ({
    key: item.id,
    label: item.name,
    info: item.info,
  })) || [];

  const paragraphStyles: CSSProperties = {
    width: "100%",
    marginBottom: "0",
  };

  return (
    <Card
      title={(
        <CustomCardTitle
          title="Бренды"
          showModalAction={showPostBrandModal}
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
              <Link to={`/brands/${item.key}/products`}>
                <Button>
                  Товары
                </Button>
              </Link>
              <Button
                icon={<EditOutlined />}
                type="dashed"
                onClick={() => handlePatchBrand(item)}
              />
              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleDeleteBrand(item)}
              />
            </Flex>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default BrandsList;