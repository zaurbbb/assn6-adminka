import {
  Modal,
  notification,
} from "antd";
import React, {
  FC,
  useState,
} from "react";
import CustomDeleteMaskText from "../../components/CustomDeleteMaskText";
import { useDeleteAttributeById } from "../../tanstack/useAttributes";
import AttributesList from "./AttributesList";
import PatchAttributeForm from "./forms/PatchAttributeForm";
import PostAttributeForm from "./forms/PostAttributeForm";

const AttributesModule: FC = () => {
  const [ api, contextHolder ] = notification.useNotification();

  const [ selectedAttribute, setSelectedAttribute ] = useState({});

  const [ isPostAttributeModalOpen, setIsPostAttributeModalOpen ] = useState(false);
  const showPostAttributeModal = () => setIsPostAttributeModalOpen(true);
  const hidePostAttributeModal = () => setIsPostAttributeModalOpen(false);

  const [isPatchAttributeModalOpen, setIsPatchAttributeModalOpen] = useState(false);
  const showPatchAttributeModal = () => setIsPatchAttributeModalOpen(true);
  const hidePatchAttributeModal = () => setIsPatchAttributeModalOpen(false);

  const [ isDeleteAttributeModalOpen, setIsDeleteAttributeModalOpen ] = useState(false);
  const showDeleteAttributeModal = () => setIsDeleteAttributeModalOpen(true);
  const hideDeleteAttributeModal = () => setIsDeleteAttributeModalOpen(false);

  const {
    isPending: isDeleteAttributePending,
    mutateAsync: deleteAttribute,
  } = useDeleteAttributeById(api);

  const handleDeleteAttribute = async () => {
    await deleteAttribute(selectedAttribute.key);
    hideDeleteAttributeModal();
  };

  return (
    <>
      {contextHolder}
      <AttributesList
        api={api}
        setSelectedAttribute={setSelectedAttribute}
        showPostAttributeModal={showPostAttributeModal}
        showPatchAttributeModal={showPatchAttributeModal}
        showDeleteAttributeModal={showDeleteAttributeModal}
      />
      {/* post attributes page */}
      <Modal
        title="Добавить атрибут"
        open={isPostAttributeModalOpen}
        centered
        onCancel={hidePostAttributeModal}
        footer={null}
      >
        <PostAttributeForm
          api={api}
          hidePostAttributeModal={hidePostAttributeModal}
        />
      </Modal>
      {/* patch attributes page */}
      <Modal
        title="Редактировать атрибут"
        open={isPatchAttributeModalOpen}
        centered
        onCancel={hidePatchAttributeModal}
        footer={null}
      >
        <PatchAttributeForm
          api={api}
          selectedAttribute={selectedAttribute}
          hidePatchAttributeModal={hidePatchAttributeModal}
        />
      </Modal>
      {/* delete attributes modal */}
      <Modal
        title="Удалить атрибут"
        open={isDeleteAttributeModalOpen}
        centered
        onCancel={hideDeleteAttributeModal}
        confirmLoading={isDeleteAttributePending}
        onOk={handleDeleteAttribute}
        okText="Удалить"
        cancelText="Отмена"
      >
        <CustomDeleteMaskText>
          {selectedAttribute.label}
        </CustomDeleteMaskText>
      </Modal>
    </>
  );
};

export default AttributesModule;
