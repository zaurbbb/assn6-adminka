import {
  Modal,
  notification,
} from "antd";
import React, {
  FC,
  useState,
} from "react";
import CustomDeleteMaskText from "../../components/CustomDeleteMaskText";
import { useDeleteSubServiceById } from "../../tanstack/useSubServices";
import PatchSubServiceForm from "./forms/PatchSubServiceForm";
import PostSubServiceForm from "./forms/PostSubServiceForm";
import SubServicesList from "./SubServicesList";

const SubServicesModule: FC = () => {
  const [ api, contextHolder ] = notification.useNotification();

  const [ selectedSubService, setSelectedSubService ] = useState({});

  const [ isPostSubServiceModalOpen, setIsPostSubServiceModalOpen ] = useState(false);
  const showPostSubServiceModal = () => setIsPostSubServiceModalOpen(true);
  const hidePostSubServiceModal = () => setIsPostSubServiceModalOpen(false);

  const [isPatchSubServiceModalOpen, setIsPatchSubServiceModalOpen] = useState(false);
  const showPatchSubServiceModal = () => setIsPatchSubServiceModalOpen(true);
  const hidePatchSubServiceModal = () => setIsPatchSubServiceModalOpen(false);

  const [ isDeleteSubServiceModalOpen, setIsDeleteSubServiceModalOpen ] = useState(false);
  const showDeleteSubServiceModal = () => setIsDeleteSubServiceModalOpen(true);
  const hideDeleteSubServiceModal = () => setIsDeleteSubServiceModalOpen(false);

  const {
    isPending: isDeleteSubServicePending,
    mutateAsync: deleteSubService,
  } = useDeleteSubServiceById(api);

  const handleDeleteSubService = async () => {
    await deleteSubService(selectedSubService.key);
    hideDeleteSubServiceModal();
  };

  return (
    <>
      {contextHolder}
      <SubServicesList
        api={api}
        setSelectedSubService={setSelectedSubService}
        showPostSubServiceModal={showPostSubServiceModal}
        showPatchSubServiceModal={showPatchSubServiceModal}
        showDeleteSubServiceModal={showDeleteSubServiceModal}
      />
      {/* post Services page */}
      <Modal
        title="Добавить подсервис"
        open={isPostSubServiceModalOpen}
        centered
        onCancel={hidePostSubServiceModal}
        footer={null}
      >
        <PostSubServiceForm
          api={api}
          hidePostSubServiceModal={hidePostSubServiceModal}
        />
      </Modal>
      {/* patch Services page */}
      <Modal
        title="Редактировать подсервис"
        open={isPatchSubServiceModalOpen}
        centered
        onCancel={hidePatchSubServiceModal}
        footer={null}
      >
        <PatchSubServiceForm
          api={api}
          selectedSubService={selectedSubService}
          hidePatchSubServiceModal={hidePatchSubServiceModal}
        />
      </Modal>
      {/* delete Services modal */}
      <Modal
        title="Удалить подсервис"
        open={isDeleteSubServiceModalOpen}
        centered
        onCancel={hideDeleteSubServiceModal}
        confirmLoading={isDeleteSubServicePending}
        onOk={handleDeleteSubService}
        okText="Удалить"
        cancelText="Отмена"
      >
        <CustomDeleteMaskText>
          {selectedSubService.label}
        </CustomDeleteMaskText>
      </Modal>
    </>
  );
};

export default SubServicesModule;

