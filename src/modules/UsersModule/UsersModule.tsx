import {
  Modal,
  notification,
  Typography,
} from "antd";
import React, {
  FC,
  useState,
} from "react";
import CustomDeleteMaskText from "../../components/CustomDeleteMaskText";
import { useDeleteUserById } from "../../tanstack/useUsers";
import PatchUserForm from "./forms/PatchUserForm";
import UsersTable from "./UsersTable";

const UsersModule: FC = () => {
  const [ api, contextHolder ] = notification.useNotification();

  const [ selectedUser, setSelectedUser ] = useState({});

  const [ isPatchUserModalOpen, setIsPatchUserModalOpen ] = useState(false);
  const showPatchUserModal = () => setIsPatchUserModalOpen(true);
  const hidePatchUserModal = () => setIsPatchUserModalOpen(false);

  const [ isDeleteUserModalOpen, setIsDeleteUserModalOpen ] = useState(false);
  const showDeleteUserModal = (id) => setIsDeleteUserModalOpen(true);
  const hideDeleteUserModal = () => setIsDeleteUserModalOpen(false);

  const {
    isPending: isDeleteUserLoading,
    mutateAsync: deleteUser,
  } = useDeleteUserById(api);

  const handlePatchUser = async (selectedUser) => {
    setSelectedUser(selectedUser);
    showPatchUserModal();
  }

  const handleDeleteUser = async () => {
    await deleteUser(selectedUser.id);
    hideDeleteUserModal();
  }

  return (
    <>
      {contextHolder}
      <UsersTable
        api={api}
        setSelectedUser={setSelectedUser}
        showPatchUserModal={showPatchUserModal}
        showDeleteUserModal={showDeleteUserModal}
      />
      <Modal
        title="Редактировать пользователя"
        open={isPatchUserModalOpen}
        centered
        onOk={handlePatchUser}
        onCancel={hidePatchUserModal}
        footer={null}
      >
        <PatchUserForm
          api={api}
          selectedUser={selectedUser}
          hidePatchUserModal={hidePatchUserModal}
        />
      </Modal>
      <Modal
        title="Удалить пользователя"
        open={isDeleteUserModalOpen}
        centered
        onOk={handleDeleteUser}
        confirmLoading={isDeleteUserLoading}
        onCancel={hideDeleteUserModal}
        okText="Подтвердить"
        cancelText="Отмена"
      >
        <CustomDeleteMaskText>
          {selectedUser.username}
        </CustomDeleteMaskText>
      </Modal>
    </>
  );
};

export default UsersModule;

