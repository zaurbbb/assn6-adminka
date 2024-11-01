import {
  Modal,
  notification,
} from "antd";
import React, {
  FC,
  useState,
} from "react";
import CustomDeleteMaskText from "../../components/CustomDeleteMaskText";
import { useDeleteServiceItemById } from "../../tanstack/useServiceItems";
import ServiceItemsTable from "./ServiceItemsTable";
import PatchServiceItemForm from "./forms/PatchServiceItemForm";
import PostServiceItemForm from "./forms/PostServiceItemForm";

const ServiceItemsModule: FC = () => {
  const [ api, contextHolder ] = notification.useNotification();

  const [ selectedServiceItem, setSelectedServiceItem ] = useState({});

  const [ isPostServiceItemModalOpen, setIsPostServiceItemModalOpen ] = useState(false);
  const showPostServiceItemModal = () => setIsPostServiceItemModalOpen(true);
  const hidePostServiceItemModal = () => setIsPostServiceItemModalOpen(false);

  const [isPatchServiceItemModalOpen, setIsPatchServiceItemModalOpen] = useState(false);
  const showPatchServiceItemModal = () => setIsPatchServiceItemModalOpen(true);
  const hidePatchServiceItemModal = () => setIsPatchServiceItemModalOpen(false);

  const [ isDeleteServiceItemModalOpen, setIsDeleteServiceItemModalOpen ] = useState(false);
  const showDeleteServiceItemModal = () => setIsDeleteServiceItemModalOpen(true);
  const hideDeleteServiceItemModal = () => setIsDeleteServiceItemModalOpen(false);

  const {
    isPending: isDeleteServiceItemPending,
    mutateAsync: deleteServiceItem,
  } = useDeleteServiceItemById(api);

  const handleDeleteServiceItem = async () => {
    await deleteServiceItem(selectedServiceItem.id);
    hideDeleteServiceItemModal();
  };

  return (
    <>
      {contextHolder}
      <ServiceItemsTable
        api={api}
        setSelectedServiceItem={setSelectedServiceItem}
        showPostServiceItemModal={showPostServiceItemModal}
        showPatchServiceItemModal={showPatchServiceItemModal}
        showDeleteServiceItemModal={showDeleteServiceItemModal}
      />
      {/* post service item page */}
      <Modal
        title="Добавить услугу"
        open={isPostServiceItemModalOpen}
        centered
        onCancel={hidePostServiceItemModal}
        footer={null}
      >
        <PostServiceItemForm
          api={api}
          hidePostServiceItemModal={hidePostServiceItemModal}
        />
      </Modal>
      {/* patch service item page */}
      <Modal
        title="Редактировать услугу"
        open={isPatchServiceItemModalOpen}
        centered
        onCancel={hidePatchServiceItemModal}
        footer={null}
      >
        <PatchServiceItemForm
          api={api}
          selectedServiceItem={selectedServiceItem}
          hidePatchServiceItemModal={hidePatchServiceItemModal}
        />
      </Modal>
      {/* delete service item modal */}
      <Modal
        title="Удалить услугу"
        open={isDeleteServiceItemModalOpen}
        centered
        onCancel={hideDeleteServiceItemModal}
        confirmLoading={isDeleteServiceItemPending}
        onOk={handleDeleteServiceItem}
        okText="Удалить"
        cancelText="Отмена"
      >
        <CustomDeleteMaskText>
          {selectedServiceItem.title}
        </CustomDeleteMaskText>
      </Modal>
    </>
  );
};

export default ServiceItemsModule;

