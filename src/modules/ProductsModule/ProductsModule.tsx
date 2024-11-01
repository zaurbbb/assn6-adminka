import {
  Modal,
  notification,
} from "antd";
import React, {
  FC,
  useState,
} from "react";
import CustomDeleteMaskText from "../../components/CustomDeleteMaskText";
import { useDeleteProductById } from "../../tanstack/useProducts";
import PatchProductForm from "./forms/PatchProductForm";
import PostDiscountForm from "./forms/PostDiscountForm";
import PostProductForm from "./forms/PostProductForm";
import ProductsTable from "./ProductsTable";

const ProductsModule: FC = () => {
  const [ api, contextHolder ] = notification.useNotification();

  const [ selectedProduct, setSelectedProduct ] = useState({});

  const [ isPostProductModalOpen, setIsPostProductModalOpen ] = useState(false);
  const showPostProductModal = () => setIsPostProductModalOpen(true);
  const hidePostProductModal = () => setIsPostProductModalOpen(false);

  const [ isPatchProductModalOpen, setIsPatchProductModalOpen ] = useState(false);
  const showPatchProductModal = () => setIsPatchProductModalOpen(true);
  const hidePatchProductModal = () => setIsPatchProductModalOpen(false);

  const {
    isPending: isDeleteProductPending,
    mutate: deleteProduct,
  } = useDeleteProductById(api);

  const [ isDeleteProductModalOpen, setIsDeleteProductModalOpen ] = useState(false);
  const showDeleteProductModal = () => setIsDeleteProductModalOpen(true);
  const hideDeleteProductModal = () => setIsDeleteProductModalOpen(false);
  const handleDeleteProduct = async () => {
    await deleteProduct(selectedProduct.id);
    hideDeleteProductModal();
  }

  return (
    <>
      {contextHolder}
      <ProductsTable
        api={api}
        setSelectedProduct={setSelectedProduct}
        showPostProductModal={showPostProductModal}
        showPatchProductModal={showPatchProductModal}
        showDeleteProductModal={showDeleteProductModal}
      />
      {/* post discount modal */}
      <Modal
        title="Добавить скидку"
        open={isPostProductModalOpen}
        centered
        onCancel={hidePostProductModal}
        footer={null}
        width={900}
      >
        <PostProductForm
          api={api}
          selectedProduct={selectedProduct}
          hidePostProductModal={hidePostProductModal}
        />
      </Modal>
      {/* patch Product modal */}
      <Modal
        title="Редактировать товар"
        open={isPatchProductModalOpen}
        centered
        onCancel={hidePatchProductModal}
        footer={null}
        width={900}
      >
        <PatchProductForm
          api={api}
          selectedProduct={selectedProduct}
          hidePatchProductModal={hidePatchProductModal}
        />
      </Modal>
      {/* delete product modal */}
      <Modal
        title="Удалить товар"
        open={isDeleteProductModalOpen}
        centered
        onCancel={hideDeleteProductModal}
        confirmLoading={isDeleteProductPending}
        onOk={handleDeleteProduct}
        okText="Удалить"
        cancelText="Отмена"
      >
        <CustomDeleteMaskText>
          Товар {selectedProduct.name}
        </CustomDeleteMaskText>
      </Modal>
    </>
  );
};

export default ProductsModule;

