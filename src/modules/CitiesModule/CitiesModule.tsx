import {
  Modal,
  notification,
} from "antd";
import React, {
  FC,
  useState,
} from "react";
import CustomDeleteMaskText from "../../components/CustomDeleteMaskText";
import { useDeleteCityById } from "../../tanstack/useCities";
import CitiesTable from "./CitiesTable";
import PatchCityForm from "./forms/PatchCityForm";
import PostCityForm from "./forms/PostCityForm";

const CitiesModule: FC = () => {
  const [ api, contextHolder ] = notification.useNotification();

  const [ selectedCity, setSelectedCity ] = useState({});

  const [ isPostCityModalOpen, setIsPostCityModalOpen ] = useState(false);
  const showPostCityModal = () => setIsPostCityModalOpen(true);
  const hidePostCityModal = () => setIsPostCityModalOpen(false);

  const [isPatchCityModalOpen, setIsPatchCityModalOpen] = useState(false);
  const showPatchCityModal = () => setIsPatchCityModalOpen(true);
  const hidePatchCityModal = () => setIsPatchCityModalOpen(false);

  const [ isDeleteCityModalOpen, setIsDeleteCityModalOpen ] = useState(false);
  const showDeleteCityModal = () => setIsDeleteCityModalOpen(true);
  const hideDeleteCityModal = () => setIsDeleteCityModalOpen(false);

  const {
    isPending: isDeleteCityPending,
    mutateAsync: deleteCity,
  } = useDeleteCityById(api);

  const handleDeleteCity = async () => {
    await deleteCity(selectedCity.id);
    hideDeleteCityModal();
  };

  return (
    <>
      {contextHolder}
      <CitiesTable
        api={api}
        setSelectedCity={setSelectedCity}
        showPostCityModal={showPostCityModal}
        showPatchCityModal={showPatchCityModal}
        showDeleteCityModal={showDeleteCityModal}
      />
      {/* post city page */}
      <Modal
        title="Добавить город"
        open={isPostCityModalOpen}
        centered
        onCancel={hidePostCityModal}
        footer={null}
      >
        <PostCityForm
          api={api}
          hidePostCityModal={hidePostCityModal}
        />
      </Modal>
      {/* patch city page */}
      <Modal
        title="Редактировать город"
        open={isPatchCityModalOpen}
        centered
        onCancel={hidePatchCityModal}
        footer={null}
      >
        <PatchCityForm
          api={api}
          selectedCity={selectedCity}
          hidePatchCityModal={hidePatchCityModal}
        />
      </Modal>
      {/* delete city modal */}
      <Modal
        title="Удалить город"
        open={isDeleteCityModalOpen}
        centered
        onCancel={hideDeleteCityModal}
        confirmLoading={isDeleteCityPending}
        onOk={handleDeleteCity}
        okText="Удалить"
        cancelText="Отмена"
      >
        <CustomDeleteMaskText>
          {selectedCity.name}
        </CustomDeleteMaskText>
      </Modal>
    </>
  );
};

export default CitiesModule;

