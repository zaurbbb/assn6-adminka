import {
  Modal,
  notification,
} from "antd";
import React, {
  FC,
  useState,
} from "react";
import CustomDeleteMaskText from "../../components/CustomDeleteMaskText";
import { useDeleteServiceById } from "../../tanstack/useServices";
import PatchServiceForm from "./forms/PatchServiceForm";
import PostServiceForm from "./forms/PostServiceForm";
import ServicesList from "./ServicesList";

const ServicesModule: FC = () => {
  const [ api, contextHolder ] = notification.useNotification();

  const [ selectedService, setSelectedService ] = useState({});

  const [ isPostServiceModalOpen, setIsPostServiceModalOpen ] = useState(false);
  const showPostServiceModal = () => setIsPostServiceModalOpen(true);
  const hidePostServiceModal = () => setIsPostServiceModalOpen(false);

  const [isPatchServiceModalOpen, setIsPatchServicesModalOpen] = useState(false);
  const showPatchServiceModal = () => setIsPatchServicesModalOpen(true);
  const hidePatchServiceModal = () => setIsPatchServicesModalOpen(false);

  const [ isDeleteServiceModalOpen, setIsDeleteServiceModalOpen ] = useState(false);
  const showDeleteServiceModal = () => setIsDeleteServiceModalOpen(true);
  const hideDeleteServiceModal = () => setIsDeleteServiceModalOpen(false);

  const {
    isPending: isDeleteServicePending,
    mutateAsync: deleteService,
  } = useDeleteServiceById(api);

  const handleDeleteService = async () => {
    await deleteService(selectedService.key);
    hideDeleteServiceModal();
  };

  return (
    <>
      {contextHolder}
      <ServicesList
        api={api}
        setSelectedService={setSelectedService}
        showPostServiceModal={showPostServiceModal}
        showPatchServiceModal={showPatchServiceModal}
        showDeleteServiceModal={showDeleteServiceModal}
      />
      {/* post Services page */}
      <Modal
        title="Добавить сервис"
        open={isPostServiceModalOpen}
        centered
        onCancel={hidePostServiceModal}
        footer={null}
      >
        <PostServiceForm
          api={api}
          hidePostServiceModal={hidePostServiceModal}
        />
      </Modal>
      {/* patch Services page */}
      <Modal
        title="Редактировать сервис"
        open={isPatchServiceModalOpen}
        centered
        onCancel={hidePatchServiceModal}
        footer={null}
      >
        <PatchServiceForm
          api={api}
          selectedService={selectedService}
          hidePatchServiceModal={hidePatchServiceModal}
        />
      </Modal>
      {/* delete Services modal */}
      <Modal
        title="Удалить сервис"
        open={isDeleteServiceModalOpen}
        centered
        onCancel={hideDeleteServiceModal}
        confirmLoading={isDeleteServicePending}
        onOk={handleDeleteService}
        okText="Удалить"
        cancelText="Отмена"
      >
        <CustomDeleteMaskText>
          {selectedService.label}
        </CustomDeleteMaskText>
      </Modal>
    </>
  );
};

export default ServicesModule;

