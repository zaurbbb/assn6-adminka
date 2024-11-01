import {
  Modal,
  notification,
} from "antd";
import React, {
  FC,
  useState,
} from "react";
import CustomDeleteMaskText from "../../components/CustomDeleteMaskText";
import { useDeleteAppointmentById } from "../../tanstack/useAppointments";
// import { formattedDateTime } from "../../utils/date";
import AppointmentsTable from "./AppointmentsTable";
import PatchAppointmentsForm from "./forms/PatchAppointmentsForm";

const AppointmentsModule: FC = () => {
  const [ api, contextHolder ] = notification.useNotification();

  const [ selectedAppointment, setSelectedAppointment ] = useState({});
  const handleSelectedAppointment = (appointment: any) => {
    setSelectedAppointment(appointment);
  }
  // const [ isPostAppointmentModalOpen, setIsPostAppointmentModalOpen ] = useState(false);
  // const showPostAppointmentModal = () => setIsPostAppointmentModalOpen(true)
  // const hidePostAppointmentModal = () => setIsPostAppointmentModalOpen(false)

  const [ isPatchAppointmentModalOpen, setIsPatchAppointmentModalOpen ] = useState(false);
  const showPatchAppointmentModal = () => setIsPatchAppointmentModalOpen(true);
  const hidePatchAppointmentModal = () => setIsPatchAppointmentModalOpen(false);

  const [ isDeleteAppointmentModalOpen, setIsDeleteAppointmentModalOpen ] = useState(false);
  const showDeleteAppointmentModal = () => setIsDeleteAppointmentModalOpen(true);
  const hideDeleteAppointmentModal = () => setIsDeleteAppointmentModalOpen(false);

  const {
    isPending: isDeleteAppointmentPending,
    mutateAsync: deleteAppointment,
  } = useDeleteAppointmentById(api);

  const handleDeleteAppointment = async () => {
    await deleteAppointment(selectedAppointment.Id);
    hideDeleteAppointmentModal();
  };


  return (
    <>
      {contextHolder}
      <AppointmentsTable
        api={api}
        setSelectedAppointment={setSelectedAppointment}
        showPatchAppointmentModal={showPatchAppointmentModal}
        showDeleteAppointmentModal={showDeleteAppointmentModal}
      />
      <Modal
        title="Редактировать запись"
        open={isPatchAppointmentModalOpen}
        centered
        onClose={() => {
          hidePatchAppointmentModal();
        }}
        onCancel={() => {
          hidePatchAppointmentModal();
          handleSelectedAppointment({});
        }}
        footer={null}
        width={600}
      >
        <PatchAppointmentsForm
          api={api}
          selectedAppointment={selectedAppointment}
          handleSelectedAppointment={handleSelectedAppointment}
          hidePatchAppointmentModal={hidePatchAppointmentModal}
        />
      </Modal>
      {/* delete appointment modal */}
      <Modal
        title="Удалить запись"
        open={isDeleteAppointmentModalOpen}
        centered
        onCancel={hideDeleteAppointmentModal}
        confirmLoading={isDeleteAppointmentPending}
        onOk={handleDeleteAppointment}
        okText="Удалить"
        cancelText="Отмена"
      >
        <CustomDeleteMaskText>
          {selectedAppointment.Id && (
            <>
              Запись клиента "{selectedAppointment.FullName}" по услуге "{selectedAppointment.ServiceItemDomain.Title}"
            </>
          )}
        </CustomDeleteMaskText>
      </Modal>
    </>
  );
};

export default AppointmentsModule;

