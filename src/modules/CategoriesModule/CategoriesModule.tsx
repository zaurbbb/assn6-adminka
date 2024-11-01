import {
  Modal,
  notification,
} from "antd";
import React, {
  FC,
  useState,
} from "react";
import CustomDeleteMaskText from "../../components/CustomDeleteMaskText";
import { useDeleteCategoryById } from "../../tanstack/useCategories";
import CategoriesList from "./CategoriesList";
import PatchCategoryForm from "./forms/PatchCategoryForm";
import PostCategoryForm from "./forms/PostCategoryForm";

const CategoriesModule: FC = () => {
  const [ api, contextHolder ] = notification.useNotification();

  const [ selectedCategory, setSelectedCategory ] = useState({});

  const [ isPostCategoryModalOpen, setIsPostCategoryModalOpen ] = useState(false);
  const showPostCategoryModal = () => setIsPostCategoryModalOpen(true);
  const hidePostCategoryModal = () => setIsPostCategoryModalOpen(false);

  const [isPatchCategoryModalOpen, setIsPatchCategoryModalOpen] = useState(false);
  const showPatchCategoryModal = () => setIsPatchCategoryModalOpen(true);
  const hidePatchCategoryModal = () => setIsPatchCategoryModalOpen(false);

  const [ isDeleteCategoryModalOpen, setIsDeleteCategoryModalOpen ] = useState(false);
  const showDeleteCategoryModal = () => setIsDeleteCategoryModalOpen(true);
  const hideDeleteCategoryModal = () => setIsDeleteCategoryModalOpen(false);

  const {
    isPending: isDeleteCategoryPending,
    mutateAsync: deleteCategory,
  } = useDeleteCategoryById(api);

  const handleDeleteCategory = async () => {
    await deleteCategory(selectedCategory.key);
    hideDeleteCategoryModal();
  };

  return (
    <>
      {contextHolder}
      <CategoriesList
        api={api}
        setSelectedCategory={setSelectedCategory}
        showPostCategoryModal={showPostCategoryModal}
        showPatchCategoryModal={showPatchCategoryModal}
        showDeleteCategoryModal={showDeleteCategoryModal}
      />
      {/* post category page */}
      <Modal
        title="Добавить категорию"
        open={isPostCategoryModalOpen}
        centered
        onCancel={hidePostCategoryModal}
        footer={null}
      >
        <PostCategoryForm
          api={api}
          hidePostCategoryModal={hidePostCategoryModal}
        />
      </Modal>
      {/* patch category page */}
      <Modal
        title="Редактировать категорию"
        open={isPatchCategoryModalOpen}
        centered
        onCancel={hidePatchCategoryModal}
        footer={null}
      >
        <PatchCategoryForm
          api={api}
          selectedCategory={selectedCategory}
          hidePatchCategoryModal={hidePatchCategoryModal}
        />
      </Modal>
      {/* delete category modal */}
      <Modal
        title="Удалить категорию"
        open={isDeleteCategoryModalOpen}
        centered
        onCancel={hideDeleteCategoryModal}
        confirmLoading={isDeleteCategoryPending}
        onOk={handleDeleteCategory}
        okText="Удалить"
        cancelText="Отмена"
      >
        <CustomDeleteMaskText>
          {selectedCategory.name}
        </CustomDeleteMaskText>
      </Modal>
    </>
  );
};

export default CategoriesModule;

