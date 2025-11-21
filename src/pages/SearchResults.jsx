import React from "react";
import { useLocation } from "react-router-dom";

export default function SearchResults() {
  const { search } = useLocation();
  const query = new URLSearchParams(search).get("q");

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Search Results</h1>
      {query ? <p>Showing results for: <strong>{query}</strong></p> : <p>No search query provided.</p>}
    </div>
  );
}
