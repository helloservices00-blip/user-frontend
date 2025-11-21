import React, { useEffect, useState } from "react";
import { getProducts } from "../api/api.js";
import { useParams } from "react-router-dom";

export default function CategoryPage() {
  const { name } = useParams();
  const [list, setList] = useState([]);

  useEffect(() => {
    getProducts().then(res => {
      const filtered = res.data.filter(
        (p) => p.category?.toLowerCase() === name.toLowerCase()
      );
      setList(filtered);
    });
  }, [name]);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{name}</h1>

      {list.length === 0 && <p>No products found.</p>}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {list.map((p) => (
          <div key={p._id} className="border p-3 rounded shadow">
            <img
              src={p.images?.[0] || p.image}
              alt={p.name}
              className="h-32 w-full object-cover"
            />
            <p className="mt-2 font-semibold">{p.name}</p>
            <p className="text-green-700">₹{p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
