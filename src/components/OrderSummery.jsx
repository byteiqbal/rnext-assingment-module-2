import { useState } from "react";
import CreateOrder from "./CreateOrder";
import OrderDeatils from "./OrderDeatils";
export default function OrderSummery() {
  const [orders, setOrders] = useState([]);
  const handlePlaceOrder = (newOrder) => {
    setOrders([...orders, newOrder]);
  };

  const handleDeleteOrder = (id) => {
    setOrders(orders.filter((order) => order.id !== id));
  };

  const handleDeliverOrder = (id) => {
    const updatedOrders = orders.map((order) =>
      order.id === id ? { ...order, status: "DELIVERED" } : order
    );
    setOrders(updatedOrders);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 flex-grow">
      <CreateOrder onPlaceOrder={handlePlaceOrder} />

      <div className="md:col-span-2 h-[calc(100vh_-_130px)]">
        <OrderDeatils
          orders={orders}
          onDeleteOrder={handleDeleteOrder}
          onDeliverOrder={handleDeliverOrder}
        />
      </div>
    </div>
  );
}
