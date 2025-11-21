import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../api/api.js";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeCat, setActiveCat] = useState("All");

  // -------- CATEGORY & SUBCATEGORY MODULES --------
  const categories = [
    {
      name: "Restaurants",
      image: "https://via.placeholder.com/100?text=Food",
      sub: ["Biryani", "Snacks", "Cold Drinks"],
    },
    {
      name: "Grocery",
      image: "https://via.placeholder.com/100?text=Grocery",
      sub: ["Vegetables", "Fruits", "Dairy"],
    },
    {
      name: "Fashion",
      image: "https://via.placeholder.com/100?text=Fashion",
      sub: ["Men", "Women", "Kids"],
    },
  ];

  // -------------- FETCH PRODUCTS FROM BACKEND --------------
  useEffect(() => {
    getProducts()
      .then((res) => {
        const data = res.data || [];
        setProducts(data);
        setFiltered(data);
      })
      .catch(() => {});
  }, []);

  // -------------- FILTER LOGIC --------------
  const filterNow = (cat, sub = null) => {
    setActiveCat(sub || cat);

    let list = products;

    if (sub) {
      list = list.filter((p) => p.subcategory === sub);
    } else if (cat !== "All") {
      list = list.filter((p) => p.category === cat);
    }

    setFiltered(list);
  };

  return (
    <div className="max-w-7xl mx-auto p-4">

      {/* ---------------- CATEGORY CARDS ---------------- */}
      <h2 className="text-xl font-bold mb-3">Shop by Category</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="border p-4 rounded-xl shadow-sm hover:shadow-lg transition"
          >
            <div className="flex flex-col items-center">
              <img
                src={cat.image}
                className="w-20 h-20 object-cover rounded-full"
                alt={cat.name}
              />

              <h3 className="text-lg font-bold mt-2">{cat.name}</h3>

              <button
                onClick={() => filterNow(cat.name)}
                className="mt-2 px-3 py-1 bg-blue-500 text-white rounded-full text-sm"
              >
                View All
              </button>
            </div>

            {/* SUBCATEGORIES */}
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {cat.sub.map((s) => (
                <button
                  key={s}
                  onClick={() => filterNow(cat.name, s)}
                  className="px-3 py-1 rounded-full bg-gray-200 hover:bg-gray-300 text-xs"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ---------------- PRODUCT GRID ---------------- */}
      <h2 className="text-xl font-bold mb-3">
        Showing: {activeCat === "All" ? "All Products" : activeCat}
      </h2>

      {filtered.length === 0 ? (
        <div className="text-gray-500 text-center">No products found</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((p) => {
            const img =
              (p.images && p.images[0]) ||
              p.image ||
              "https://via.placeholder.com/300";

            return (
              <Link
                to={`/product/${p._id}`}
                key={p._id}
                className="border rounded p-3 hover:shadow transition"
              >
                <img
                  src={img}
                  alt={p.name}
                  className="w-full h-40 object-cover rounded"
                />
                <h3 className="mt-2 font-semibold truncate">{p.name}</h3>
                <p className="text-green-600 font-bold">₹{p.price}</p>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
