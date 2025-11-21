import React, { useEffect, useState } from "react";
import { getProductsByCategory, getCategories } from "../api/api.js";
import { useParams, Link } from "react-router-dom";

export default function CategoryProducts() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    getCategories().then(res => {
      const found = res.data.find(c => c._id === id);
      setCategory(found);
    });

    getProductsByCategory(id).then(res => setProducts(res.data));
  }, [id]);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold">
        {category ? category.name : "Category"}
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {products.map(p => (
          <Link
            key={p._id}
            to={`/product/${p._id}`}
            className="p-3 bg-white shadow rounded"
          >
            <img
              src={(p.images && p.images[0]) || p.image}
              className="w-full h-40 object-cover rounded"
            />
            <p className="font-semibold mt-2">{p.name}</p>
            <p className="text-green-600">₹{p.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
