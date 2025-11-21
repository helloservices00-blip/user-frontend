import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // Load cart on page load
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(saved);
  }, []);

  // Save updated cart to localStorage
  const updateCart = (updated) => {
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const increaseQty = (id) => {
    const updated = cart.map((item) =>
      item.id === id ? { ...item, qty: (item.qty || 1) + 1 } : item
    );
    updateCart(updated);
  };

  const decreaseQty = (id) => {
    const updated = cart
      .map((item) =>
        item.id === id ? { ...item, qty: Math.max((item.qty || 1) - 1, 1) } : item
      )
      .filter((item) => item.qty > 0);

    updateCart(updated);
  };

  const removeItem = (id) => {
    const updated = cart.filter((item) => item.id !== id);
    updateCart(updated);
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.qty || 1),
    0
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-xl">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">

          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 border rounded-xl shadow-sm"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div>
                  <h2 className="text-xl font-semibold">{item.name}</h2>
                  <p className="text-gray-600">₹{item.price}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Quantity Buttons */}
                <button
                  onClick={() => decreaseQty(item.id)}
                  className="px-3 py-1 bg-gray-300 rounded-md"
                >
                  -
                </button>

                <span className="text-lg font-bold">{item.qty || 1}</span>

                <button
                  onClick={() => increaseQty(item.id)}
                  className="px-3 py-1 bg-gray-300 rounded-md"
                >
                  +
                </button>

                {/* Remove Button */}
                <button
                  onClick={() => removeItem(item.id)}
                  className="ml-4 text-red-600 font-semibold"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* Cart Total */}
          <div className="text-right text-2xl font-bold mt-4">
            Total: ₹{total}
          </div>

          {/* Checkout Button */}
          <div className="text-right mt-4">
            <button
              onClick={() => navigate("/checkout")}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
