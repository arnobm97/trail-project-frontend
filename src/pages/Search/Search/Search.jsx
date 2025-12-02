import React, { useState, useEffect } from "react";
import {
  FaMapMarkerAlt,
  FaSearch,
  FaSortAmountDown,
  FaDollarSign,
} from "react-icons/fa";

const Search = ({ onSearch }) => {
  const [location, setLocation] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setLocation({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        }),
      (err) => console.error("Location error:", err)
    );
  }, []);

  const handleSearch = () => {
    onSearch({ location });
  };

  return (
    <div className="w-full max-w-10xl mx-auto p-6 bg-white rounded-2xl shadow-lg flex flex-col md:flex-row flex-wrap gap-4 items-center mt-8">
      {/* Area Search */}
      <div className="relative w-full md:w-[30%]">
        <input
          type="text"
          placeholder="Search Area"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 pr-12"
        />
        <button
          onClick={handleSearch}
          className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-blue-600 transition"
        >
          <FaSearch size={18} />
        </button>
      </div>

      {/* Search Nearby Button */}
      <button
        onClick={handleSearch}
        className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition w-full md:w-auto"
      >
        <FaMapMarkerAlt />
        Nearby
      </button>
    </div>
  );
};

export default Search;
