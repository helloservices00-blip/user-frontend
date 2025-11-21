import React, { useEffect, useState, useContext } from "react";
import { createOrder } from "../api/api.js";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

export default function Checkout() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart") || "[]"));
  }, []);

  const total = cart.reduce((acc, i) => acc + (i.price * (i.quantity || 1)), 0);

  const handlePlaceOrder = async () => {
    if (!user) {
      alert("Please login to place order");
      navigate("/login");
      return;
    }

    try {
      // backend expects products array: [{product: id, quantity}]
      const productsPayload = cart.map(item => ({ product: item._id, quantity: item.quantity || 1, vendor: item.vendor?._id }));
      await createOrder({ products: productsPayload });
      localStorage.removeItem("cart");
      alert("Order placed");
      navigate("/orders");
    } catch (err) {
      console.error(err);
      alert("Order failed");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <div className="bg-white p-4 rounded shadow">
        <div className="mb-4">
          <div className="flex justify-between">
            <div>Items</div>
            <div>₹{total}</div>
          </div>
        </div>
        <button onClick={handlePlaceOrder} className="w-full bg-blue-600 text-white p-3 rounded">Place Order</button>
      </div>
    </div>
  );
}
