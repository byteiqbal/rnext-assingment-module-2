import { useState } from "react";
import { FilterIcon } from "../icons";
function OrderList({ item, onDeleteOrder, onDeliverOrder }) {
  return (
    <tr className="border-t border-gray-700">
      <td className="py-3">{item.id}</td>
      <td className="py-3">{item.name}</td>
      <td className="py-3">{item.itemCount}</td>
      <td className="py-3">{item.totalAmount}</td>
      <td className="py-3">
        <span
          className={
            item.status == "DELIVERED" ? "text-green-400" : "text-red-500"
          }
        >
          {item.status}
        </span>
      </td>
      <td className="py-3">
        <button
          onClick={() => onDeleteOrder(item.id)}
          className="bg-gray-800 hover:bg-red-600 text-xs px-3 py-1 rounded-full mr-1 transition-colors duration-300"
        >
          Delete
        </button>
        {item.status === "PENDING" && (
          <button
            onClick={() => onDeliverOrder(item.id)}
            className="bg-gray-800 hover:bg-green-600 text-xs px-3 py-1 rounded-full transition-colors duration-300"
          >
            DELIVER
          </button>
        )}
      </td>
    </tr>
  );
}

export default function OrderDeatils({
  orders,
  onDeleteOrder,
  onDeliverOrder,
}) {
  const [filterStatus, setfilterStatus] = useState("all");

  const totalOrders = orders.length;
  const pendingOrders = orders.filter(
    (order) => order.status === "PENDING"
  ).length;
  const deliveredOrders = orders.filter(
    (order) => order.status === "DELIVERED"
  ).length;

  const filteredOrders =
    filterStatus === "All"
      ? [...orders]
      : orders.filter((order) => order.status === filterStatus.toUpperCase());

  const allOrders = filteredOrders.map((order) => (
    <OrderList
      key={order.id}
      item={order}
      onDeleteOrder={onDeleteOrder}
      onDeliverOrder={onDeliverOrder}
    />
  ));

  return (
    <>
      <div>
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-cardbg rounded-lg p-4 relative overflow-hidden">
            <div className="text-5xl font-bold text-yellow-500 mb-2">
              {totalOrders ? totalOrders : 0}
            </div>
            <div className="bg-yellow-800 bg-opacity-50 text-yellow-200 text-xs font-medium px-3 py-1 rounded-full inline-block">
              Total Order
            </div>
          </div>
          <div className="bg-cardbg rounded-lg p-4 relative overflow-hidden">
            <div className="text-5xl font-bold text-red-500 mb-2">
              {pendingOrders}
            </div>
            <div className="bg-red-800 bg-opacity-50 text-red-200 text-xs font-medium px-3 py-1 rounded-full inline-block">
              Pending
            </div>
          </div>

          <div className="bg-cardbg rounded-lg p-4 relative overflow-hidden">
            <div className="text-5xl font-bold text-green-500 mb-2">
              {deliveredOrders}
            </div>
            <div className="bg-green-800 bg-opacity-50 text-green-200 text-xs font-medium px-3 py-1 rounded-full inline-block">
              Delivered
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="flex justify-between">
          <h2 className="text-xl font-bold mb-4">Order Reports</h2>

          <div className="flex gap-4 items-center">
            <FilterIcon />

            <select
              value={filterStatus}
              onChange={(e) => setfilterStatus(e.target.value)}
              className="appearance-none bg-zinc-900 accent-orange-600 border-none outline-none rounded-sm"
            >
              <option>All</option>
              <option>Pending</option>
              <option>Delivered</option>
            </select>
          </div>
        </div>
        <div className="bg-cardbg rounded-lg p-4">
          <div className="reports-container">
            <table className="min-w-full">
              <thead>
                <tr className="text-left text-sm">
                  <th className="pb-3 font-medium">ID</th>
                  <th className="pb-3 font-medium">Customer Name</th>
                  <th className="pb-3 font-medium">Items</th>
                  <th className="pb-3 font-medium">Amount</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm">{allOrders}</tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
