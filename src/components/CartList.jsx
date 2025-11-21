import React from "react";

export default function CartList({ cart, setCart }) {
  const updateQty = (id, qty) => {
    const newCart = cart.map(i => i._id === id ? { ...i, quantity: qty } : i);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const removeItem = (id) => {
    const newCart = cart.filter(i => i._id !== id);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  if (!cart || cart.length === 0) return <p>Your cart is empty.</p>;

  return (
    <div className="space-y-3">
      {cart.map(item => (
        <div key={item._id} className="flex items-center justify-between bg-white p-3 rounded shadow">
          <div className="flex items-center space-x-3">
            <img src={(item.images && item.images[0]) || item.image || "https://via.placeholder.com/80"} alt={item.name} className="w-16 h-12 object-cover rounded"/>
            <div>
              <div className="font-semibold">{item.name}</div>
              <div className="text-sm text-gray-500">₹{item.price}</div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <input type="number" min="1" value={item.quantity || 1} onChange={(e) => updateQty(item._id, Number(e.target.value))} className="w-20 border p-1 rounded" />
            <button onClick={() => removeItem(item._id)} className="text-red-600">Remove</button>
          </div>
        </div>
      ))}
    </div>
  );
}
