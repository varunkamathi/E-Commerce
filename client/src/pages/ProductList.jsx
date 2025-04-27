import React, { useState, useEffect } from "react";
import Cart from "../components/Cart";
import Navbar from "../components/Navbar";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const addToCart = (product) => {
   // setIsCartOpen(true);
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const handleMoreClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const increaseQty = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (productId) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  return (
    <div className="relative">
          <Navbar cartItemCount={cart.reduce((acc, item) => acc + item.quantity, 0)} openCart={() => setIsCartOpen(true)} />
      <div className="max-w-7xl mx-auto px-4 py-6">

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <img
                src={product.images?.[0]}
                alt={product.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{product.title}</h2>
                <p className="text-green-600 font-bold mt-2">${product.price}</p>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => addToCart(product)}
                    className="flex-1 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => handleMoreClick(product)}
                    className="flex-1 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                  >
                    More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Cart
        isCartOpen={isCartOpen}
        closeCart={closeCart}
        cart={cart}
        increaseQty={increaseQty}
        decreaseQty={decreaseQty}
        removeFromCart={removeFromCart}
      />

      {selectedProduct && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-2/3 lg:w-1/2 relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-700 hover:text-black text-2xl"
            >
              &times;
            </button>
            <div className="flex flex-col md:flex-row items-center">
              <img
                src={selectedProduct.images?.[0]}
                alt={selectedProduct.title}
                className="w-40 h-40 object-contain mb-4 md:mb-0 md:mr-6"
              />
              <div>
                <h2 className="text-2xl font-bold">{selectedProduct.title}</h2>
                <p className="text-gray-700 mt-2">{selectedProduct.category?.name}</p>
                <p className="text-2xl text-green-600 mt-4">${selectedProduct.price}</p>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">Description:</h3>
              <p className="text-gray-600">{selectedProduct.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
