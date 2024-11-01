import {
  Modal,
  notification,
} from "antd";
import React, {
  FC,
  useState,
} from "react";
import CustomDeleteMaskText from "../../components/CustomDeleteMaskText";
import { useDeleteCharacteristicById } from "../../tanstack/useCharacteristics";
import CharacteristicsList from "./CharacteristicsList";
import PatchCharacteristicForm from "./forms/PatchCharacteristicForm";
import PostCharacteristicForm from "./forms/PostCharacteristicForm";

const CharacteristicsModule: FC = () => {
  const [ api, contextHolder ] = notification.useNotification();

  const [ selectedCharacteristic, setSelectedCharacteristic ] = useState({});

  const [ isPostCharacteristicModalOpen, setIsPostCharacteristicModalOpen ] = useState(false);
  const showPostCharacteristicModal = () => setIsPostCharacteristicModalOpen(true);
  const hidePostCharacteristicModal = () => setIsPostCharacteristicModalOpen(false);

  const [isPatchCharacteristicModalOpen, setIsPatchCharacteristicModalOpen] = useState(false);
  const showPatchCharacteristicModal = () => setIsPatchCharacteristicModalOpen(true);
  const hidePatchCharacteristicModal = () => setIsPatchCharacteristicModalOpen(false);

  const [ isDeleteCharacteristicModalOpen, setIsDeleteCharacteristicModalOpen ] = useState(false);
  const showDeleteCharacteristicModal = () => setIsDeleteCharacteristicModalOpen(true);
  const hideDeleteCharacteristicModal = () => setIsDeleteCharacteristicModalOpen(false);

  const {
    isPending: isDeleteCharacteristicPending,
    mutateAsync: deleteCharacteristic,
  } = useDeleteCharacteristicById(api);

  const handleDeleteCharacteristic = async () => {
    await deleteCharacteristic(selectedCharacteristic.key);
    hideDeleteCharacteristicModal();
  };

  return (
    <>
      {contextHolder}
      <CharacteristicsList
        api={api}
        setSelectedCharacteristic={setSelectedCharacteristic}
        showPostCharacteristicModal={showPostCharacteristicModal}
        showPatchCharacteristicModal={showPatchCharacteristicModal}
        showDeleteCharacteristicModal={showDeleteCharacteristicModal}
      />
      {/* post characteristics page */}
      <Modal
        title="Добавить характеристику"
        open={isPostCharacteristicModalOpen}
        centered
        onCancel={hidePostCharacteristicModal}
        footer={null}
      >
        <PostCharacteristicForm
          api={api}
          hidePostCharacteristicModal={hidePostCharacteristicModal}
        />
      </Modal>
      {/* patch characteristics page */}
      <Modal
        title="Редактировать характеристику"
        open={isPatchCharacteristicModalOpen}
        centered
        onCancel={hidePatchCharacteristicModal}
        footer={null}
      >
        <PatchCharacteristicForm
          api={api}
          selectedCharacteristic={selectedCharacteristic}
          hidePatchCharacteristicModal={hidePatchCharacteristicModal}
        />
      </Modal>
      {/* delete characteristics modal */}
      <Modal
        title="Удалить характеристику"
        open={isDeleteCharacteristicModalOpen}
        centered
        onCancel={hideDeleteCharacteristicModal}
        confirmLoading={isDeleteCharacteristicPending}
        onOk={handleDeleteCharacteristic}
        okText="Удалить"
        cancelText="Отмена"
      >
        <CustomDeleteMaskText>
          {selectedCharacteristic.label}
        </CustomDeleteMaskText>
      </Modal>
    </>
  );
};

export default CharacteristicsModule;