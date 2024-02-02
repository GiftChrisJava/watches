import React from "react";

export default function WatchForm() {
  return (
    <form action="addWatch" className="mb-6">
      <div className="mb-4">
        <label className="block text-white mb-2" htmlFor="brand">
          Brand
        </label>
        <input
          className="shadow appearance-none w-1/3 border border-gray-600 bg-gray-700 rounded p-2 focus:outline-none"
          type="text"
          name="brand"
          id="brand"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-white mb-2" htmlFor="model">
          Model
        </label>
        <input
          type="text"
          name="model"
          id="model"
          className="shadow appearance-none w-1/3 border border-gray-600 bg-gray-700 rounded p-2 focus:outline-none"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="referenceNumber" className="block text-white mb-2">
          Reference Number
        </label>
        <input
          type="text"
          name="referenceNumber"
          id="referenceNumber"
          className="shadow appearance-none w-1/3 border border-gray-600 bg-gray-700 rounded p-2 focus:outline-none"
          required
        />
      </div>

      <button
        type="submit"
        className="bg-gray-600 hover:bg-gray-300 text-white hover:text-black font-bold py-2 px-3 rounded-md"
      >
        Add Watch
      </button>
    </form>
  );
}
