import {
  Modal,
  notification,
} from "antd";
import React, {
  FC,
  useState,
} from "react";
import CustomDeleteMaskText from "../../components/CustomDeleteMaskText";
import { useDeleteBrandById } from "../../tanstack/useBrands";
import BrandsList from "./BrandsList";
import PatchBrandForm from "./forms/PatchBrandForm";
import PostBrandForm from "./forms/PostBrandForm";

const BrandsModule: FC = () => {
  const [ api, contextHolder ] = notification.useNotification();

  const [ selectedBrand, setSelectedBrand ] = useState({});

  const [ isPostBrandModalOpen, setIsPostBrandModalOpen ] = useState(false);
  const showPostBrandModal = () => setIsPostBrandModalOpen(true);
  const hidePostBrandModal = () => setIsPostBrandModalOpen(false);

  const [isPatchBrandModalOpen, setIsPatchBrandModalOpen] = useState(false);
  const showPatchBrandModal = () => setIsPatchBrandModalOpen(true);
  const hidePatchBrandModal = () => setIsPatchBrandModalOpen(false);

  const [ isDeleteBrandModalOpen, setIsDeleteBrandModalOpen ] = useState(false);
  const showDeleteBrandModal = () => setIsDeleteBrandModalOpen(true);
  const hideDeleteBrandModal = () => setIsDeleteBrandModalOpen(false);

  const {
    isPending: isDeleteBrandPending,
    mutateAsync: deleteBrand,
  } = useDeleteBrandById(api);

  const handleDeleteBrand = async () => {
    await deleteBrand(selectedBrand.key);
    hideDeleteBrandModal();
  };

  return (
    <>
      {contextHolder}
      <BrandsList
        api={api}
        setSelectedBrand={setSelectedBrand}
        showPostBrandModal={showPostBrandModal}
        showPatchBrandModal={showPatchBrandModal}
        showDeleteBrandModal={showDeleteBrandModal}
      />
      {/* post brands page */}
      <Modal
        title="Добавить бренд"
        open={isPostBrandModalOpen}
        centered
        onCancel={hidePostBrandModal}
        footer={null}
      >
        <PostBrandForm
          api={api}
          hidePostBrandModal={hidePostBrandModal}
        />
      </Modal>
      {/* patch brands page */}
      <Modal
        title="Редактировать бренд"
        open={isPatchBrandModalOpen}
        centered
        onCancel={hidePatchBrandModal}
        footer={null}
      >
        <PatchBrandForm
          api={api}
          selectedBrand={selectedBrand}
          hidePatchBrandModal={hidePatchBrandModal}
        />
      </Modal>
      {/* delete brands modal */}
      <Modal
        title="Удалить бренд"
        open={isDeleteBrandModalOpen}
        centered
        onCancel={hideDeleteBrandModal}
        confirmLoading={isDeleteBrandPending}
        onOk={handleDeleteBrand}
        okText="Удалить"
        cancelText="Отмена"
      >
        <CustomDeleteMaskText>
          {selectedBrand.label}
        </CustomDeleteMaskText>
      </Modal>
    </>
  );
};

export default BrandsModule;

