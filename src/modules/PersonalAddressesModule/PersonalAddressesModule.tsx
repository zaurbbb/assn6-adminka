import {
  Modal,
  notification,
} from "antd";
import React, {
  FC,
  useState,
} from "react";
import CustomDeleteMaskText from "../../components/CustomDeleteMaskText";
import { useDeletePersonalAddressById } from "../../tanstack/usePersonalAddresses";
import PersonalAddressesTable from "./PersonalAddressesTable";
import PatchPersonalAddressForm from "./forms/PatchPersonalAddressForm";
import PostPersonalAddressForm from "./forms/PostPersonalAddressForm";

const PersonalAddressesModule: FC = () => {
  const [ api, contextHolder ] = notification.useNotification();

  const [ selectedPersonalAddress, setSelectedPersonalAddress ] = useState({});

  const [ isPostPersonalAddressModalOpen, setIsPostPersonalAddressModalOpen ] = useState(false);
  const showPostPersonalAddressModal = () => setIsPostPersonalAddressModalOpen(true);
  const hidePostPersonalAddressModal = () => setIsPostPersonalAddressModalOpen(false);

  const [isPatchPersonalAddressModalOpen, setIsPatchPersonalAddressModalOpen] = useState(false);
  const showPatchPersonalAddressModal = () => setIsPatchPersonalAddressModalOpen(true);
  const hidePatchPersonalAddressModal = () => setIsPatchPersonalAddressModalOpen(false);

  const [ isDeletePersonalAddressModalOpen, setIsDeletePersonalAddressModalOpen ] = useState(false);
  const showDeletePersonalAddressModal = () => setIsDeletePersonalAddressModalOpen(true);
  const hideDeletePersonalAddressModal = () => setIsDeletePersonalAddressModalOpen(false);

  const {
    isPending: isDeletePersonalAddressPending,
    mutateAsync: deletePersonalAddress,
  } = useDeletePersonalAddressById(api);

  const handleDeletePersonalAddress = async () => {
    await deletePersonalAddress(selectedPersonalAddress.id);
    hideDeletePersonalAddressModal();
  };

  return (
    <>
      {contextHolder}
      <PersonalAddressesTable
        api={api}
        setSelectedPersonalAddress={setSelectedPersonalAddress}
        showPostPersonalAddressModal={showPostPersonalAddressModal}
        showPatchPersonalAddressModal={showPatchPersonalAddressModal}
        showDeletePersonalAddressModal={showDeletePersonalAddressModal}
      />
      {/* post personal address page */}
      <Modal
        title="Добавить адрес"
        open={isPostPersonalAddressModalOpen}
        centered
        onCancel={hidePostPersonalAddressModal}
        footer={null}
      >
        <PostPersonalAddressForm
          api={api}
          hidePostPersonalAddressModal={hidePostPersonalAddressModal}
        />
      </Modal>
      {/* patch personal address page */}
      <Modal
        title="Редактировать адрес"
        open={isPatchPersonalAddressModalOpen}
        centered
        onCancel={hidePatchPersonalAddressModal}
        footer={null}
        width={700}
      >
        <PatchPersonalAddressForm
          api={api}
          selectedPersonalAddress={selectedPersonalAddress}
          hidePatchPersonalAddressModal={hidePatchPersonalAddressModal}
        />
      </Modal>
      {/* delete personal address modal */}
      <Modal
        title="Удалить адрес"
        open={isDeletePersonalAddressModalOpen}
        centered
        onCancel={hideDeletePersonalAddressModal}
        confirmLoading={isDeletePersonalAddressPending}
        onOk={handleDeletePersonalAddress}
        okText="Удалить"
        cancelText="Отмена"
      >
        <CustomDeleteMaskText>
          {selectedPersonalAddress.Address}
        </CustomDeleteMaskText>
      </Modal>
    </>
  );
};

export default PersonalAddressesModule;

