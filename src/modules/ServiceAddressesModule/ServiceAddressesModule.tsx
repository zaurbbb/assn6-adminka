import {
  Modal,
  notification,
} from "antd";
import React, {
  FC,
  useState,
} from "react";
import CustomDeleteMaskText from "../../components/CustomDeleteMaskText";
import { useDeleteServiceAddressById } from "../../tanstack/useServiceAddresses";
import ServiceAddressesTable from "./ServiceAddressesTable";
import PatchServiceAddressForm from "./forms/PatchServiceAddressForm";
import PostServiceAddressForm from "./forms/PostServiceAddressForm";

const ServiceAddressesModule: FC = () => {
  const [ api, contextHolder ] = notification.useNotification();

  const [ selectedServiceAddress, setSelectedServiceAddress ] = useState({});

  const [ isPostServiceAddressModalOpen, setIsPostServiceAddressModalOpen ] = useState(false);
  const showPostServiceAddressModal = () => setIsPostServiceAddressModalOpen(true);
  const hidePostServiceAddressModal = () => setIsPostServiceAddressModalOpen(false);

  const [isPatchServiceAddressModalOpen, setIsPatchServiceAddressModalOpen] = useState(false);
  const showPatchServiceAddressModal = () => setIsPatchServiceAddressModalOpen(true);
  const hidePatchServiceAddressModal = () => setIsPatchServiceAddressModalOpen(false);

  const [ isDeleteServiceAddressModalOpen, setIsDeleteServiceAddressModalOpen ] = useState(false);
  const showDeleteServiceAddressModal = () => setIsDeleteServiceAddressModalOpen(true);
  const hideDeleteServiceAddressModal = () => setIsDeleteServiceAddressModalOpen(false);

  const {
    isPending: isDeleteServiceAddressPending,
    mutateAsync: deleteServiceAddress,
  } = useDeleteServiceAddressById(api);

  const handleDeleteServiceAddress = async () => {
    await deleteServiceAddress(selectedServiceAddress.Id);
    hideDeleteServiceAddressModal();
  };

  return (
    <>
      {contextHolder}
      <ServiceAddressesTable
        api={api}
        setSelectedServiceAddress={setSelectedServiceAddress}
        showPostServiceAddressModal={showPostServiceAddressModal}
        showPatchServiceAddressModal={showPatchServiceAddressModal}
        showDeleteServiceAddressModal={showDeleteServiceAddressModal}
      />
      {/* post service address page */}
      <Modal
        title="Добавить адрес"
        open={isPostServiceAddressModalOpen}
        centered
        onCancel={hidePostServiceAddressModal}
        footer={null}
      >
        <PostServiceAddressForm
          api={api}
          hidePostServiceAddressModal={hidePostServiceAddressModal}
        />
      </Modal>
      {/* patch service address page */}
      <Modal
        title="Редактировать адрес"
        open={isPatchServiceAddressModalOpen}
        centered
        onCancel={hidePatchServiceAddressModal}
        footer={null}
      >
        <PatchServiceAddressForm
          api={api}
          selectedServiceAddress={selectedServiceAddress}
          hidePatchServiceAddressModal={hidePatchServiceAddressModal}
        />
      </Modal>
      {/* delete service address modal */}
      <Modal
        title="Удалить адрес"
        open={isDeleteServiceAddressModalOpen}
        centered
        onCancel={hideDeleteServiceAddressModal}
        confirmLoading={isDeleteServiceAddressPending}
        onOk={handleDeleteServiceAddress}
        okText="Удалить"
        cancelText="Отмена"
      >
        <CustomDeleteMaskText>
          {selectedServiceAddress.Address}
        </CustomDeleteMaskText>
      </Modal>
    </>
  );
};

export default ServiceAddressesModule;

