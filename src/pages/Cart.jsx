import React, { useEffect, useState } from "react";

export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(stored);
  }, []);

  // Update quantity
  const updateQty = (id, qty) => {
    const updated = cart.map((item) =>
      item._id === id ? { ...item, quantity: qty } : item
    );
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  // Remove item
  const removeItem = (id) => {
    const updated = cart.filter((item) => item._id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  // Calculate total price
  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  if (cart.length === 0)
    return <div className="p-4 text-center text-gray-600">Your cart is empty</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between p-4 border rounded"
          >
            <div className="flex items-center gap-4">
              <img
                src={
                  item?.images?.[0] ||
                  item?.image ||
                  "https://via.placeholder.com/100x100"
                }
                className="w-20 h-20 rounded object-cover"
              />
              <div>
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-green-600 font-bold">₹{item.price}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  updateQty(item._id, Math.max(1, (item.quantity || 1) - 1))
                }
                className="px-3 py-1 bg-gray-300 rounded"
              >
                -
              </button>

              <span className="px-3">{item.quantity}</span>

              <button
                onClick={() =>
                  updateQty(item._id, (item.quantity || 1) + 1)
                }
                className="px-3 py-1 bg-gray-300 rounded"
              >
                +
              </button>

              <button
                onClick={() => removeItem(item._id)}
                className="ml-4 px-4 py-2 bg-red-500 text-white rounded"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-right text-xl font-bold">
        Total: ₹{total}
      </div>
    </div>
  );
}
