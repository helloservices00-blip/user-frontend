import React from "react";

export default function Profile() {
  // You can replace this with actual profile info later
  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      <p>Welcome! This is your profile page.</p>

      {/* Placeholder user info */}
      <div className="mt-6 border p-4 rounded shadow">
        <p><strong>Name:</strong> John Doe</p>
        <p><strong>Email:</strong> john@example.com</p>
        <p><strong>Address:</strong> 123 Main Street, City, Country</p>
      </div>
    </div>
  );
}
