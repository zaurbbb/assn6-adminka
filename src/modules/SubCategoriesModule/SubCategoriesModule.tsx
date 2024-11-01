import {
  Modal,
  notification,
} from "antd";
import React, {
  FC,
  useState,
} from "react";
import CustomDeleteMaskText from "../../components/CustomDeleteMaskText";
import { useDeleteSubCategoryById } from "../../tanstack/useSubCategories";
import PatchSubCategoryForm from "./forms/PatchSubCategoryForm";
import PostSubCategoryForm from "./forms/PostSubCategoryForm";
import SubCategoriesList from "./SubCategoriesList";

const SubCategoriesModule: FC = () => {
  const [ api, contextHolder ] = notification.useNotification();

  const [ selectedSubCategory, setSelectedSubCategory ] = useState({});

  const [ isPostSubCategoryModalOpen, setIsPostSubCategoryModalOpen ] = useState(false);
  const showPostSubCategoryModal = () => setIsPostSubCategoryModalOpen(true);
  const hidePostSubCategoryModal = () => setIsPostSubCategoryModalOpen(false);

  const [isPatchSubCategoryModalOpen, setIsPatchSubCategoryModalOpen] = useState(false);
  const showPatchSubCategoryModal = () => setIsPatchSubCategoryModalOpen(true);
  const hidePatchSubCategoryModal = () => setIsPatchSubCategoryModalOpen(false);

  const [ isDeleteSubCategoryModalOpen, setIsDeleteSubCategoryModalOpen ] = useState(false);
  const showDeleteSubCategoryModal = () => setIsDeleteSubCategoryModalOpen(true);
  const hideDeleteSubCategoryModal = () => setIsDeleteSubCategoryModalOpen(false);

  const {
    isPending: isDeleteSubCategoryPending,
    mutateAsync: deleteSubCategory,
  } = useDeleteSubCategoryById(api);

  const handleDeleteSubCategory = async () => {
    await deleteSubCategory(Number(selectedSubCategory.key));
    hideDeleteSubCategoryModal();
  };

  return (
    <>
      {contextHolder}
      <SubCategoriesList
        api={api}
        setSelectedSubCategory={setSelectedSubCategory}
        showPostSubCategoryModal={showPostSubCategoryModal}
        showPatchSubCategoryModal={showPatchSubCategoryModal}
        showDeleteSubCategoryModal={showDeleteSubCategoryModal}
      />
      {/* post Subcategory page */}
      <Modal
        title={<>Создать подкатегорию</>}
        open={isPostSubCategoryModalOpen}
        centered
        onCancel={hidePostSubCategoryModal}
        footer={null}
      >
        <PostSubCategoryForm
          api={api}
          hidePostSubCategoryModal={hidePostSubCategoryModal}
        />
      </Modal>
      {/* patch Subcategory page */}
      <Modal
        title="Редактировать подкатегорию"
        open={isPatchSubCategoryModalOpen}
        centered
        onCancel={hidePatchSubCategoryModal}
        footer={null}
      >
        <PatchSubCategoryForm
          api={api}
          selectedSubCategory={selectedSubCategory}
          hidePatchSubCategoryModal={hidePatchSubCategoryModal}
        />
      </Modal>
      {/* delete Subcategory modal */}
      <Modal
        title="Удалить подкатегорию"
        open={isDeleteSubCategoryModalOpen}
        centered
        onCancel={hideDeleteSubCategoryModal}
        confirmLoading={isDeleteSubCategoryPending}
        onOk={handleDeleteSubCategory}
        okText="Удалить"
        cancelText="Отмена"
      >
        <CustomDeleteMaskText>
          {selectedSubCategory.label}
        </CustomDeleteMaskText>
      </Modal>
    </>
  );
};

export default SubCategoriesModule;

