import React, { useEffect, useState } from "react";
import { getOrders } from "../api/api.js";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders().then(res => setOrders(res.data)).catch(() => {});
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>
      {orders.length === 0 ? <p>No orders yet.</p> : (
        <div className="space-y-3">
          {orders.map(order => (
            <div key={order._id} className="bg-white p-4 rounded shadow">
              <div className="flex justify-between">
                <div>
                  <div className="font-semibold">Order: {order._id}</div>
                  <div className="text-sm text-gray-500">Placed: {new Date(order.createdAt).toLocaleString()}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">₹{order.total}</div>
                  <div className="text-sm">{order.status}</div>
                </div>
              </div>
              <div className="mt-3">
                <div className="text-sm font-semibold">Items:</div>
                <ul className="mt-1">
                  {order.products && order.products.map(p => (
                    <li key={p.product._id} className="text-sm">{p.product.name} x {p.quantity}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
