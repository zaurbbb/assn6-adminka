import {
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Flex,
  Image,
  Pagination,
  Table,
} from "antd";
import React, {
  CSSProperties,
  useEffect,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import CustomCardTitle from "../../components/CustomCardTitle";
import CustomDiscountAction from "../../components/CustomDiscountAction";
import CustomPagination from "../../components/CustomPagination";
import CustomTextEllipsis from "../../components/CustomTextEllipsis";
import { useTableSearch } from "../../hooks/useTableSearch";
import { useGetProducts } from "../../tanstack/useProducts";
import {
  formatDateRange,
  formattedDateTime,
} from "../../utils/formattedDate";
import { formattedPrice } from "../../utils/formattedPrice";

const ProductsTable: React.FC = ({
  api,
  setSelectedProduct,
  showPatchProductModal,
  showPostProductModal,
  showDeleteProductModal,
}) => {
  const {
    data: getProductsData,
    isLoading: isGetProductsLoading,
    isRefetching: isRefetchingProducts,
  } = useGetProducts(api);

  const dataSources = getProductsData?.data || getProductsData;

  const loading = isGetProductsLoading || isRefetchingProducts;

  const handlePatchProduct = async (selectedProduct) => {
    setSelectedProduct(selectedProduct);
    showPatchProductModal();
  };

  // const handlePostDiscount = async (selectedProduct) => {
  //   setSelectedProduct(selectedProduct);
  //   showPostProductModal();
  // };

  const handleDeleteProduct = async (selectedProduct) => {
    setSelectedProduct(selectedProduct);
    showDeleteProductModal();
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      fixed: 'left',
      width: 30,
      defaultSortOrder: "descend",
      sorter: (a, b) => a.id - b.id,
      showSorterTooltip: false,
    },
    {
      title: 'Изображение',
      dataIndex: 'image_url',
      key: 'image_url',
      width: 70,
      render: (image) => (
        <div style={{ textAlign: "center" }}>
          <Image
            src={image}
            alt="product"
            style={{
              height: "80px",
              margin: "0 auto",
            }}
          />
        </div>
      ),
    },
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
      width: 120,
      // ...getColumnSearchProps('name'),
      // render: (name) => <CustomTextEllipsis>{name}</CustomTextEllipsis>,
    },
    {
      title: 'Описание',
      dataIndex: 'description',
      key: 'description',
      width: 120,
      // render: (description) => <CustomTextEllipsis>{description}</CustomTextEllipsis>,
    },
    {
      title: 'Категория',
      dataIndex: 'category',
      key: 'category',
      width: 120,
      // render: (ingredients) => <CustomTextEllipsis>{ingredients}</CustomTextEllipsis>,
    },
    {
      title: 'Цена (тг)',
      dataIndex: 'price',
      key: 'price',
      width: 50,
    },
    {
      title: 'Кол-во (шт.)',
      dataIndex: 'quantity',
      key: 'quantity',
      width: 70,
    },
    {
      title: '',
      dataIndex: '',
      key: 'x',
      width: 70,
      render: (user) => (
        <Flex gap="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => handlePatchProduct(user)}
          />
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteProduct(user)}
          />
        </Flex>
      ),
    },
  ];

  const tableStyles: CSSProperties = {
    overflowX: "auto",
  };

  return (
    <Card
      title={(
        <CustomCardTitle
          title="Атрибуты"
          showModalAction={showPostProductModal}
        />
      )}
    >
    <Table
        dataSource={dataSources}
        columns={columns}
        loading={loading}
        showSorterTooltip={false}
        scroll={{ x: 1000 }}
        style={tableStyles}
        pagination={false}
        bordered
      />
    </Card>
  );
};

export default ProductsTable;