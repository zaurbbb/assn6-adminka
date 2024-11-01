import {
  Modal,
  notification,
} from "antd";
import React, {
  FC,
  useState,
} from "react";
import CustomDeleteMaskText from "../../components/CustomDeleteMaskText";
import { useDeleteProfileSectionById } from "../../tanstack/useProfileSections";
import PatchProfileSectionForm from "./forms/PatchProfileSectionForm";
import PostProfileSectionForm from "./forms/PostProfileSectionForm";
import PostSubProfileSectionForm from "./forms/PostSubProfileSectionForm";
import ProfileSectionsList from "./ProfileSectionsList";

const ProfileSectionsModule: FC = () => {
  const [ api, contextHolder ] = notification.useNotification();

  const [ selectedProfileSection, setSelectedProfileSection ] = useState({});
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

  const [ isPostProfileSectionModalOpen, setIsPostProfileSectionModalOpen ] = useState(false);
  const showPostProfileSectionModal = () => setIsPostProfileSectionModalOpen(true);
  const hidePostProfileSectionModal = () => setIsPostProfileSectionModalOpen(false);

  const [ isPostSubProfileSectionModalOpen, setIsPostSubProfileSectionModalOpen ] = useState(false);
  const showPostSubProfileSectionModal = () => setIsPostSubProfileSectionModalOpen(true);
  const hidePostSubProfileSectionModal = () => setIsPostSubProfileSectionModalOpen(false);

  const [isPatchProfileSectionModalOpen, setIsPatchProfileSectionModalOpen] = useState(false);
  const showPatchProfileSectionModal = () => setIsPatchProfileSectionModalOpen(true);
  const hidePatchProfileSectionModal = () => setIsPatchProfileSectionModalOpen(false);

  const [ isDeleteProfileSectionModalOpen, setIsDeleteProfileSectionModalOpen ] = useState(false);
  const showDeleteProfileSectionModal = () => setIsDeleteProfileSectionModalOpen(true);
  const hideDeleteProfileSectionModal = () => setIsDeleteProfileSectionModalOpen(false);

  const {
    isPending: isDeleteProfileSectionPending,
    mutateAsync: deleteProfileSection,
  } = useDeleteProfileSectionById(api);

  const handleDeleteProfileSection = async () => {
    await deleteProfileSection(selectedProfileSection.Id);
    hideDeleteProfileSectionModal();
  };

  return (
    <>
      {contextHolder}
      <ProfileSectionsList
        api={api}
        setSelectedProfileSection={setSelectedProfileSection}
        showPostProfileSectionModal={showPostProfileSectionModal}
        showPostSubProfileSectionModal={showPostSubProfileSectionModal}
        showPatchProfileSectionModal={showPatchProfileSectionModal}
        showDeleteProfileSectionModal={showDeleteProfileSectionModal}
      />
      {/* post profile section page */}
      <Modal
        title="Добавить страницу"
        open={isPostProfileSectionModalOpen}
        centered
        onCancel={hidePostProfileSectionModal}
        footer={null}
      >
        <PostProfileSectionForm
          api={api}
          hidePostProfileSectionModal={hidePostProfileSectionModal}
        />
      </Modal>
      {/* post subprofile section page */}
      <Modal
        title="Добавить подстраницу"
        open={isPostSubProfileSectionModalOpen}
        centered
        onCancel={hidePostSubProfileSectionModal}
        width={1000}
        footer={null}
      >
        <PostSubProfileSectionForm
          api={api}
          selectedProfileSection={selectedProfileSection}
          hidePostSubProfileSectionModal={hidePostSubProfileSectionModal}
        />
      </Modal>
      {/* patch profile section page */}
      <Modal
        title="Редактировать страницу"
        open={isPatchProfileSectionModalOpen}
        centered
        onCancel={hidePatchProfileSectionModal}
        width={1000}
        footer={null}
      >
        <PatchProfileSectionForm
          api={api}
          selectedProfileSection={selectedProfileSection}
          hidePatchProfileSectionModal={hidePatchProfileSectionModal}
        />
      </Modal>
      {/* delete profile section modal */}
      <Modal
        title="Удалить страницу"
        open={isDeleteProfileSectionModalOpen}
        centered
        onCancel={hideDeleteProfileSectionModal}
        confirmLoading={isDeleteProfileSectionPending}
        onOk={handleDeleteProfileSection}
        okText="Удалить"
        cancelText="Отмена"
      >
        <CustomDeleteMaskText>
          {selectedProfileSection.Name}
        </CustomDeleteMaskText>
      </Modal>
    </>
  );
};

export default ProfileSectionsModule;

