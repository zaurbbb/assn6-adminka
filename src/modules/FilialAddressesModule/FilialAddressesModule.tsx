import {
  Modal,
  notification,
} from "antd";
import React, {
  FC,
  useState,
} from "react";
import CustomDeleteMaskText from "../../components/CustomDeleteMaskText";
import { useDeleteFilialAddressById } from "../../tanstack/useFilialAddresses";
import { formattedAddress } from "../../utils/formattedAddress";
import FilialAddressesTable from "./FilialAddressesTable";
import PatchFilialAddressForm from "./forms/PatchFilialAddressForm";
import PostFilialAddressForm from "./forms/PostFilialAddressForm";

const FilialAddressesModule: FC = () => {
  const [ api, contextHolder ] = notification.useNotification();

  const [ selectedFilialAddress, setSelectedFilialAddress ] = useState({});

  const [ isPostFilialAddressModalOpen, setIsPostFilialAddressModalOpen ] = useState(false);
  const showPostFilialAddressModal = () => setIsPostFilialAddressModalOpen(true);
  const hidePostFilialAddressModal = () => setIsPostFilialAddressModalOpen(false);

  const [isPatchFilialAddressModalOpen, setIsPatchFilialAddressModalOpen] = useState(false);
  const showPatchFilialAddressModal = () => setIsPatchFilialAddressModalOpen(true);
  const hidePatchFilialAddressModal = () => setIsPatchFilialAddressModalOpen(false);

  const [ isDeleteFilialAddressModalOpen, setIsDeleteFilialAddressModalOpen ] = useState(false);
  const showDeleteFilialAddressModal = () => setIsDeleteFilialAddressModalOpen(true);
  const hideDeleteFilialAddressModal = () => setIsDeleteFilialAddressModalOpen(false);

  const {
    isPending: isDeleteFilialAddressPending,
    mutateAsync: deleteFilialAddress,
  } = useDeleteFilialAddressById(api);

  const handleDeleteFilialAddress = async () => {
    await deleteFilialAddress(selectedFilialAddress.id);
    hideDeleteFilialAddressModal();
  };

  return (
    <>
      {contextHolder}
      <FilialAddressesTable
        api={api}
        setSelectedFilialAddress={setSelectedFilialAddress}
        showPostFilialAddressModal={showPostFilialAddressModal}
        showPatchFilialAddressModal={showPatchFilialAddressModal}
        showDeleteFilialAddressModal={showDeleteFilialAddressModal}
      />
      {/* post filial address page */}
      <Modal
        title="Добавить адрес"
        open={isPostFilialAddressModalOpen}
        centered
        onCancel={hidePostFilialAddressModal}
        footer={null}
      >
        <PostFilialAddressForm
          api={api}
          hidePostFilialAddressModal={hidePostFilialAddressModal}
        />
      </Modal>
      {/* patch filial address page */}
      <Modal
        title="Редактировать адрес"
        open={isPatchFilialAddressModalOpen}
        centered
        onCancel={hidePatchFilialAddressModal}
        footer={null}
        width={700}
      >
        <PatchFilialAddressForm
          api={api}
          selectedFilialAddress={selectedFilialAddress}
          hidePatchFilialAddressModal={hidePatchFilialAddressModal}
        />
      </Modal>
      {/* delete filial address modal */}
      <Modal
        title="Удалить адрес"
        open={isDeleteFilialAddressModalOpen}
        centered
        onCancel={hideDeleteFilialAddressModal}
        confirmLoading={isDeleteFilialAddressPending}
        onOk={handleDeleteFilialAddress}
        okText="Удалить"
        cancelText="Отмена"
      >
        <CustomDeleteMaskText>
          {formattedAddress(
            selectedFilialAddress.city?.name,
            selectedFilialAddress.region,
            selectedFilialAddress.street,
            selectedFilialAddress.street_num,
            selectedFilialAddress.apartment,
          )}
        </CustomDeleteMaskText>
      </Modal>
    </>
  );
};

export default FilialAddressesModule;

