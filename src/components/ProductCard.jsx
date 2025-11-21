import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const img = (product.images && product.images[0]) || product.image || "https://via.placeholder.com/400x300?text=No+Image";
  return (
    <div className="bg-white p-3 rounded shadow">
      <img src={img} alt={product.name} className="w-full h-40 object-cover rounded"/>
      <h3 className="font-semibold mt-2">{product.name}</h3>
      <p className="text-green-600 mt-1">₹{product.price}</p>
      <div className="mt-2 flex justify-between items-center">
        <Link to={`/product/${product._id}`} className="text-blue-600">View</Link>
        <span className="text-sm text-gray-500">{product.category || ""}</span>
      </div>
    </div>
  );
}
