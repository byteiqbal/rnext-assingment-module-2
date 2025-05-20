import { useState } from "react";
import { receipe } from "../data/receipe";
import { MinusIcon, PlusIcon } from "../icons";

// MenuItem Component
function MenuItem({ item, receipeAdd, receipeAdded }) {
  const itemId = item.id;
  const isAdded = receipeAdded.includes(itemId);

  const handleClick = () => {
    if (!isAdded) {
      receipeAdd([...receipeAdded, itemId]);
    } else {
      receipeAdd(receipeAdded.filter((id) => id !== itemId));
    }
  };

  return (
    <div className="bg-gray-700 bg-opacity-30 rounded-md p-3 mb-3 flex justify-between items-center hover:bg-opacity-40 transition-all duration-300">
      <div className="flex items-center">
        <div className="w-12 h-12 flex items-center justify-center mr-3">
          <img src={item.img} alt={item.title} className="w-10 h-10" />
        </div>
        <div>
          <h3 className="font-medium">{item.title}</h3>
          <p className="text-xs text-gray-400">BDT {item.price}</p>
        </div>
      </div>
      <button
        onClick={handleClick}
        className="w-8 h-8 bg-gray-800 hover:bg-primary rounded-full flex items-center justify-center transition-colors duration-300"
      >
        {isAdded ? <MinusIcon /> : <PlusIcon />}
      </button>
    </div>
  );
}

// Main CreateOrder Component
export default function CreateOrder({ onPlaceOrder }) {
  const [receipeAdded, setReceipeAdded] = useState([]);
  const [customerName, setCustomerName] = useState("");

  const total = receipe
    .filter((item) => receipeAdded.includes(item.id))
    .reduce((sum, item) => sum + item.price, 0);

  const handlePlaceOrder = () => {
    if (!customerName || receipeAdded.length === 0) {
      alert("Please enter a customer name and select at least one item.");
    } else {
      const newOrder = {
        id: Date.now(),
        name: customerName,
        itemCount: receipeAdded.length,
        totalAmount: total,
        status: "PENDING",
      };

      onPlaceOrder(newOrder);
      setReceipeAdded([]);
      setCustomerName("");
    }
  };

  return (
    <div className="bg-cardbg rounded-lg p-6 h-[calc(100vh_-_130px)] text-white">
      <h2 className="text-xl font-bold mb-1">CREATE ORDER</h2>
      <p className="text-gray-400 text-sm mb-4">
        Accurately fulfill customer orders based on a precise understanding of
        their requirements.
      </p>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Customer Name</label>
        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className="w-full bg-gray-700 bg-opacity-50 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Choose Items</label>
        <div className="items-container">
          {receipe.map((item) => (
            <MenuItem
              key={item.id}
              item={item}
              receipeAdd={setReceipeAdded}
              receipeAdded={receipeAdded}
            />
          ))}
        </div>
      </div>

      <button
        onClick={handlePlaceOrder}
        className="w-full bg-primary hover:bg-opacity-90 text-white font-medium py-3 rounded-full transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
      >
        Place Order (BDT {total})
      </button>
    </div>
  );
}
