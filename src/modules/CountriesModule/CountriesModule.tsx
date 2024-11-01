import {
  Modal,
  notification,
} from "antd";
import React, {
  FC,
  useState,
} from "react";
import CustomDeleteMaskText from "../../components/CustomDeleteMaskText";
import { useDeleteCountryById } from "../../tanstack/useCountries";
import CountriesTable from "./CountriesTable";
import PatchCountryForm from "./forms/PatchCountryForm";
import PostCountryForm from "./forms/PostCountryForm";

const CountriesModule: FC = () => {
  const [ api, contextHolder ] = notification.useNotification();

  const [ selectedCountry, setSelectedCountry ] = useState({});

  const [ isPostCountryModalOpen, setIsPostCountryModalOpen ] = useState(false);
  const showPostCountryModal = () => setIsPostCountryModalOpen(true);
  const hidePostCountryModal = () => setIsPostCountryModalOpen(false);

  const [isPatchCountryModalOpen, setIsPatchCountryModalOpen] = useState(false);
  const showPatchCountryModal = () => setIsPatchCountryModalOpen(true);
  const hidePatchCountryModal = () => setIsPatchCountryModalOpen(false);

  const [ isDeleteCountryModalOpen, setIsDeleteCountryModalOpen ] = useState(false);
  const showDeleteCountryModal = () => setIsDeleteCountryModalOpen(true);
  const hideDeleteCountryModal = () => setIsDeleteCountryModalOpen(false);

  const {
    isPending: isDeleteCountryPending,
    mutateAsync: deleteCountry,
  } = useDeleteCountryById(api);

  const handleDeleteCountry = async () => {
    await deleteCountry(selectedCountry.id);
    hideDeleteCountryModal();
  };

  return (
    <>
      {contextHolder}
      <CountriesTable
        api={api}
        setSelectedCountry={setSelectedCountry}
        showPostCountryModal={showPostCountryModal}
        showPatchCountryModal={showPatchCountryModal}
        showDeleteCountryModal={showDeleteCountryModal}
      />
      {/* post country page */}
      <Modal
        title="Добавить страну"
        open={isPostCountryModalOpen}
        centered
        onCancel={hidePostCountryModal}
        footer={null}
      >
        <PostCountryForm
          api={api}
          hidePostCountryModal={hidePostCountryModal}
        />
      </Modal>
      {/* patch country page */}
      <Modal
        title="Редактировать страну"
        open={isPatchCountryModalOpen}
        centered
        onCancel={hidePatchCountryModal}
        footer={null}
      >
        <PatchCountryForm
          api={api}
          selectedCountry={selectedCountry}
          hidePatchCountryModal={hidePatchCountryModal}
        />
      </Modal>
      {/* delete country modal */}
      <Modal
        title="Удалить страну"
        open={isDeleteCountryModalOpen}
        centered
        onCancel={hideDeleteCountryModal}
        confirmLoading={isDeleteCountryPending}
        onOk={handleDeleteCountry}
        okText="Удалить"
        cancelText="Отмена"
      >
        <CustomDeleteMaskText>
          {selectedCountry.name}
        </CustomDeleteMaskText>
      </Modal>
    </>
  );
};

export default CountriesModule;

