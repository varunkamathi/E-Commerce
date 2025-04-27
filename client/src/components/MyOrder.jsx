import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyOrder = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
  }, []);

  const handleCancelOrder = (indexToRemove) => {
    const updatedOrders = orders.filter((_, index) => index !== indexToRemove);
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <button
          onClick={() => navigate("/home")}
          className="absolute top-6 left-6 text-blue-500 hover:text-blue-700 font-bold"
        >
          &larr; Back to Home
        </button>
        <h2 className="text-center mt-10 text-gray-500">No orders placed yet.</h2>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4 relative">
      <button
        onClick={() => navigate("/home")}
        className="absolute top-6 left-6 text-teal-500 hover:text-teal-700 font-bold"
      >
        &larr; Back to Home
      </button>

      <h1 className="text-3xl font-bold mb-8 text-center">My Orders</h1>

      {orders.map((order, index) => (
        <div key={index} className="border p-4 mb-6 rounded-lg shadow-md">
          <div className="flex justify-between mb-4 items-center">
            <div>
              <span className="text-gray-600">Order #{index + 1}</span><br />
              <span className="text-gray-600">{order.date}</span>
            </div>
            <button
              onClick={() => handleCancelOrder(index)}
              className="px-4 py-2 bg-red-400 text-white rounded hover:bg-red-500"
            >
              Cancel Order
            </button>
          </div>

          {order.items.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b py-2">
              <div className="flex items-center">
                <img
                  src={item.images?.[0]}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="ml-4">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-green-600 font-bold">${item.price}</p>
                </div>
              </div>
              <span className="font-bold">Qty: {item.quantity}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MyOrder;
