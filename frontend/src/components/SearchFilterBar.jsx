// Fully static inputs — no state/handlers wired yet.
// Phase 2 wires these to useState (search, category, price range) and,

import { useState } from "react";

// later, Phase 4 debounces the search input.
export default function SearchFilterBar({input,onChange , onSelect}) {
  

  return (
    <div className="mb-6 flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 sm:flex-row sm:items-center">
      <input
        type="text"
        placeholder="Search products..."
        className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
        name="search"
        onChange={onChange}
        value={input.search}
      />

      <select className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none" name="catagory" value={input.catagory} onChange={onSelect}>
        <option value="">All Categories</option>
        <option value="electronics">Electronics</option>
        <option value="jewelery">Jewelery</option>
        <option value="men's clothing">Men's Clothing</option>
        <option value="women's clothing">Women's Clothing</option>
        <option value="accessories">Accessories</option>
      </select>

      <div className="flex items-center gap-2">
        <input
          type="number"
          placeholder="Min $"
          className="w-20 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
          onChange={onChange}
          name="min"
        />

        <span className="text-gray-400">-</span>
        <input
          type="number"
          placeholder="Max $"
          className="w-20 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
          onChange={onChange}
          name="max"
        />
      </div>
    </div>
  );
}
