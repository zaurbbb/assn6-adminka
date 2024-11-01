import {
  Modal,
  notification,
} from "antd";
import React, {
  FC,
  useState,
} from "react";
import CustomDeleteMaskText from "../../components/CustomDeleteMaskText";
import { useDeleteFaqById } from "../../tanstack/useFaq";
import FaqList from "./FaqList";
import PatchFaqForm from "./forms/PatchFaqForm";
import PostFaqForm from "./forms/PostFaqForm";

const FaqModule: FC = () => {
  const [ api, contextHolder ] = notification.useNotification();

  const [ selectedFaq, setSelectedFaq ] = useState({});
  //
  // const [ isDeleteUserModalOpen, setIsDeleteUserModalOpen ] = useState(false);
  // const showDeleteUserModal = (id) =>
  //   setIsDeleteUserModalOpen(true);
  // const hideDeleteUserModal = () =>
  //   setIsDeleteUserModalOpen(false);
  //
  // const {
  //   isPending: isDeleteUserLoading,
  //   mutateAsync: deleteUser,
  // } = useDeleteUserById(api);
  //
  // const handleDeleteUser = async () => {
  //   await deleteUser(selectedUserId);
  //   hideDeleteUserModal();
  // }

  const [ isPostFaqModalOpen, setIsPostFaqModalOpen ] = useState(false);
  const showPostFaqModal = () => setIsPostFaqModalOpen(true);
  const hidePostFaqModal = () => setIsPostFaqModalOpen(false);

  const [isPatchFaqModalOpen, setIsPatchFaqModalOpen] = useState(false);
  const showPatchFaqModal = () => setIsPatchFaqModalOpen(true);
  const hidePatchFaqModal = () => setIsPatchFaqModalOpen(false);

  const [ isDeleteFaqModalOpen, setIsDeleteFaqModalOpen ] = useState(false);
  const showDeleteFaqModal = () => setIsDeleteFaqModalOpen(true);
  const hideDeleteFaqModal = () => setIsDeleteFaqModalOpen(false);

  const {
    isPending: isDeleteFaqPending,
    mutateAsync: deleteFaq,
  } = useDeleteFaqById(api);

  const handleDeleteFaq = async () => {
    await deleteFaq(selectedFaq.id);
    hideDeleteFaqModal();
  };

  return (
    <>
      {contextHolder}
      <FaqList
        api={api}
        setSelectedFaq={setSelectedFaq}
        showPostFaqModal={showPostFaqModal}
        showPatchFaqModal={showPatchFaqModal}
        showDeleteFaqModal={showDeleteFaqModal}
      />
      {/* post faq page */}
      <Modal
        title="Добавить страницу"
        open={isPostFaqModalOpen}
        centered
        onCancel={hidePostFaqModal}
        footer={null}
      >
        <PostFaqForm
          api={api}
          hidePostFaqModal={hidePostFaqModal}
        />
      </Modal>
      {/* patch faq page */}
      <Modal
        title="Редактировать страницу"
        open={isPatchFaqModalOpen}
        centered
        onCancel={hidePatchFaqModal}
        width={1000}
        footer={null}
      >
        <PatchFaqForm
          api={api}
          selectedFaq={selectedFaq}
          hidePatchFaqModal={hidePatchFaqModal}
        />
      </Modal>
      {/* delete faq modal */}
      <Modal
        title="Удалить страницу"
        open={isDeleteFaqModalOpen}
        centered
        onCancel={hideDeleteFaqModal}
        confirmLoading={isDeleteFaqPending}
        onOk={handleDeleteFaq}
        okText="Удалить"
        cancelText="Отмена"
      >
        <CustomDeleteMaskText>
          {selectedFaq.question}
        </CustomDeleteMaskText>
      </Modal>
    </>
  );
};

export default FaqModule;

