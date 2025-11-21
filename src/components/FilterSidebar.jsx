import React, { useState } from "react";

export default function FilterSidebar({ onFilter }) {
  const [category, setCategory] = useState("");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [sort, setSort] = useState("");

  const applyFilter = () => {
    onFilter({ category, min, max, sort });
  };

  return (
    <div className="w-full md:w-60 bg-white shadow p-4 rounded h-fit">
      <h3 className="font-bold text-lg mb-3">Filters</h3>

      {/* CATEGORY */}
      <div className="mb-4">
        <label className="font-semibold">Category</label>
        <select
          className="border p-2 w-full rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All</option>
          <option value="electronics">Electronics</option>
          <option value="fashion">Fashion</option>
          <option value="mobiles">Mobiles</option>
          <option value="grocery">Grocery</option>
          <option value="sports">Sports</option>
        </select>
      </div>

      {/* PRICE RANGE */}
      <div className="mb-4">
        <label className="font-semibold">Price Range</label>
        <div className="flex space-x-2 mt-2">
          <input
            type="number"
            placeholder="Min"
            className="border p-2 w-full rounded"
            onChange={(e) => setMin(e.target.value)}
          />
          <input
            type="number"
            placeholder="Max"
            className="border p-2 w-full rounded"
            onChange={(e) => setMax(e.target.value)}
          />
        </div>
      </div>

      {/* SORT */}
      <div className="mb-4">
        <label className="font-semibold">Sort By</label>
        <select
          className="border p-2 w-full rounded mt-2"
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Default</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
          <option value="new">Newest</option>
        </select>
      </div>

      <button
        onClick={applyFilter}
        className="w-full bg-blue-600 text-white p-2 rounded"
      >
        Apply Filter
      </button>
    </div>
  );
}
