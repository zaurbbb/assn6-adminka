import {
  Modal,
  notification,
} from "antd";
import React, {
  FC,
  useState,
} from "react";
import CustomDeleteMaskText from "../../components/CustomDeleteMaskText";
import { useDeleteContactById } from "../../tanstack/useContacts";
import ContactsTable from "./ContactsTable";
import PatchContactForm from "./forms/PatchContactForm";

const ContactsModule: FC = () => {
  const [ api, contextHolder ] = notification.useNotification();

  const [ selectedContact, setSelectedContact ] = useState({});

  const [isPatchContactModalOpen, setIsPatchContactModalOpen] = useState(false);
  const showPatchContactModal = () => setIsPatchContactModalOpen(true);
  const hidePatchContactModal = () => setIsPatchContactModalOpen(false);

  return (
    <>
      {contextHolder}
      <ContactsTable
        api={api}
        setSelectedContact={setSelectedContact}
        showPatchContactModal={showPatchContactModal}
      />
      {/* patch contact page */}
      <Modal
        title="Редактировать контакт"
        open={isPatchContactModalOpen}
        centered
        onCancel={hidePatchContactModal}
        footer={null}
      >
        <PatchContactForm
          api={api}
          selectedContact={selectedContact}
          hidePatchContactModal={hidePatchContactModal}
        />
      </Modal>
    </>
  );
};

export default ContactsModule;

