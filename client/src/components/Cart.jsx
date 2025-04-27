import React from "react";
import { useNavigate } from "react-router-dom"; // <-- Import useNavigate

const Cart = ({ isCartOpen, closeCart, cart, increaseQty, decreaseQty, removeFromCart, placeOrder }) => {
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const navigate = useNavigate(); // Initialize the navigation hook

  const handleBuy = () => {
    if (cart.length === 0) {
      console.error("Cart is empty!");
      return;
    }
  
    const newOrder = {
      items: cart,
      date: new Date().toLocaleString(),
    };
  
    // Get existing orders from localStorage
    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
  
    // Add new order
    const updatedOrders = [...existingOrders, newOrder];
  
    // Save back to localStorage
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  
    // Clear the cart (you might want to pass clearCart function as prop, or you can just reload the page)
    // For now you can just navigate
    navigate("/my-order");
  };
  return (
    <div
      className={`fixed top-0 right-0 h-full bg-white w-80 shadow-lg transform ${
        isCartOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 z-50`}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-semibold">My Cart</h2>
        <button onClick={closeCart} className="text-2xl font-bold text-gray-700 hover:text-black">
          &times;
        </button>
      </div>

      <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-200px)]">
        {cart.length === 0 ? (
          <p className="text-gray-500 text-center mt-10">Your cart is empty.</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="flex items-center border-b pb-4">
              <img src={item.images?.[0]} alt={item.title} className="w-16 h-16 object-cover rounded" />
              <div className="ml-4 flex-1">
                <h3 className="text-sm font-semibold">{item.title}</h3>
                <p className="text-green-600 font-bold">${item.price}</p>

                <div className="flex items-center mt-2">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="px-2 py-1 bg-red-400 text-white rounded hover:bg-red-500"
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    onClick={() => increaseQty(item.id)}
                    className="px-2 py-1 bg-green-400 text-white rounded hover:bg-green-500"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="text-gray-400 hover:text-red-600 ml-2 text-lg"
              >
                &times;
              </button>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t">
        <div className="flex justify-between mb-4">
          <span className="font-semibold">Total:</span>
          <span className="font-bold">${totalPrice.toFixed(2)}</span>
        </div>
        <button
          onClick={handleBuy} // Trigger the handleBuy function when clicked
          className="w-full py-2 bg-yellow-400 text-black rounded-2xl font-semibold hover:bg-amber-200"
        >
          Buy
        </button>
      </div>
    </div>
  );
};

export default Cart;
