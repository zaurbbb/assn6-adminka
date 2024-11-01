import {
  Modal,
  notification,
} from "antd";
import React, {
  FC,
  useState,
} from "react";
import CustomDeleteMaskText from "../../components/CustomDeleteMaskText";
import { useDeleteStaffById } from "../../tanstack/useStaff";
import PatchStaffForm from "./forms/PatchStaffForm";
import PatchWorkTimeForm from "./forms/PatchWorkTimeForm";
import PostStaffForm from "./forms/PostStaffForm";
import StaffTable from "./StaffTable";

const StaffModule: FC = () => {
  const [ api, contextHolder ] = notification.useNotification();

  const [ selectedStaff, setSelectedStaff ] = useState({});

  const [ isPatchWorkTime, setIsPatchWorkTime ] = useState(false);
  const showPatchWorkTimeModal = () => setIsPatchWorkTime(true);
  const hidePatchWorkTimeModal = () => setIsPatchWorkTime(false);

  const [ isPostStaffModalOpen, setIsPostStaffModalOpen ] = useState(false);
  const showPostStaffModal = () => setIsPostStaffModalOpen(true);
  const hidePostStaffModal = () => setIsPostStaffModalOpen(false);

  const [ isPatchStaffModalOpen, setIsPatchStaffModalOpen ] = useState(false);
  const showPatchStaffModal = () => setIsPatchStaffModalOpen(true);
  const hidePatchStaffModal = () => setIsPatchStaffModalOpen(false);

  const [ isDeleteStaffModalOpen, setIsDeleteStaffModalOpen ] = useState(false);
  const showDeleteStaffModal = () => setIsDeleteStaffModalOpen(true);
  const hideDeleteStaffModal = () => setIsDeleteStaffModalOpen(false);

  const {
    isPending: isDeleteStaffPending,
    mutateAsync: deleteStaff,
  } = useDeleteStaffById(api);

  const handleDeleteStaff = async () => {
    await deleteStaff(selectedStaff.Id);
    hideDeleteStaffModal();
  };

  return (
    <>
      {contextHolder}
      <StaffTable
        api={api}
        setSelectedStaff={setSelectedStaff}
        showPatchWorkTimeModal={showPatchWorkTimeModal}
        showPostStaffModal={showPostStaffModal}
        showPatchStaffModal={showPatchStaffModal}
        showDeleteStaffModal={showDeleteStaffModal}
      />
      {/* patch work time modal */}
      <Modal
        title={`Обновить расписание ${selectedStaff.FullName}`}
        open={isPatchWorkTime}
        centered
        onCancel={hidePatchWorkTimeModal}
        footer={null}
        width={700}
      >
        <PatchWorkTimeForm
          api={api}
          selectedStaff={selectedStaff}
          hidePatchWorkTimeModal={hidePatchWorkTimeModal}
        />
      </Modal>
      {/* post staff modal */}
      <Modal
        title="Добавить специалиста"
        open={isPostStaffModalOpen}
        centered
        onCancel={hidePostStaffModal}
        footer={null}
        width={700}
      >
        <PostStaffForm
          api={api}
          hidePostStaffModal={hidePostStaffModal}
        />
      </Modal>
      {/* patch staff modal */}
      <Modal
        title="Редактировать специалиста"
        open={isPatchStaffModalOpen}
        centered
        onCancel={hidePatchStaffModal}
        footer={null}
        width={700}
      >
        <PatchStaffForm
          api={api}
          selectedStaff={selectedStaff}
          hidePatchStaffModal={hidePatchStaffModal}
        />
      </Modal>
      {/* delete staff modal */}
      <Modal
        title="Удалить город"
        open={isDeleteStaffModalOpen}
        centered
        onCancel={hideDeleteStaffModal}
        confirmLoading={isDeleteStaffPending}
        onOk={handleDeleteStaff}
        okText="Удалить"
        cancelText="Отмена"
      >
        <CustomDeleteMaskText>
          {selectedStaff.FullName}
        </CustomDeleteMaskText>
      </Modal>
    </>
  );
};

export default StaffModule;

