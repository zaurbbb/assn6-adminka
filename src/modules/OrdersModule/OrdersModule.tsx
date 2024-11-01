import {
  Modal,
  notification,
} from "antd";
import React, {
  FC,
  useState,
} from "react";
import OrderDetailsTable from "./forms/OrderDetailsTable";
import PatchOrderForm from "./forms/PatchOrderForm";
import OrdersTable from "./OrdersTable";

const OrdersModule: FC = () => {
  const [ api, contextHolder ] = notification.useNotification();

  const [ selectedOrder, setSelectedOrder ] = useState({});

  const [isOrderDetailsModalOpen, setIsOrderDetailsModalOpen] = useState(false);
  const showOrderDetailsModal = () => setIsOrderDetailsModalOpen(true);
  const hideOrderDetailsModal = () => setIsOrderDetailsModalOpen(false);

  const [isPatchOrderModalOpen, setIsPatchOrderModalOpen] = useState(false);
  const showPatchOrderModal = () => setIsPatchOrderModalOpen(true);
  const hidePatchOrderModal = () => setIsPatchOrderModalOpen(false);

  return (
    <>
      {contextHolder}
      <OrdersTable
        api={api}
        setSelectedOrder={setSelectedOrder}
        showOrderDetailsModal={showOrderDetailsModal}
        showPatchOrderModal={showPatchOrderModal}
      />
      {/* get order details */}
      <Modal
        title="Детали заказа"
        open={isOrderDetailsModalOpen}
        centered
        onCancel={hideOrderDetailsModal}
        footer={null}
        width={1000}
      >
        <OrderDetailsTable
          api={api}
          selectedOrder={selectedOrder}
          hideOrderDetailsModal={hideOrderDetailsModal}
        />
      </Modal>
      {/* patch order page */}
      <Modal
        title={`Редактировать заказ ${selectedOrder.id}`}
        open={isPatchOrderModalOpen}
        centered
        onCancel={hidePatchOrderModal}
        footer={null}
        width={600}
      >
        <PatchOrderForm
          api={api}
          selectedOrder={selectedOrder}
          hidePatchOrderModal={hidePatchOrderModal}
        />
      </Modal>
    </>
  );
};

export default OrdersModule;

