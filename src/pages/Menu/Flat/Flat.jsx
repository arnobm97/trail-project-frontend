import React, { useState, useEffect } from "react";
import Cover from "../../shared/Cover/Cover";
import useMenu from "../../../Hooks/useMenu";
import Search from "../../Search/Search/Search";
import { Link } from "react-router-dom";
import RentCard2 from "../../../Components/RentCard/RentCard";
import flatCover from "../../../assets/home/project photo/f1.jpg";

const Flat = () => {
  const [menu] = useMenu();
  const [filteredFlats, setFilteredFlats] = useState([]);

  // 🔹 Initially show all flats
  useEffect(() => {
    const flatList = menu.filter((item) => item.category === "flat");
    setFilteredFlats(flatList);
  }, [menu]);

  // 🔍 Handle search and filtering logic
  const handleSearch = ({ location, priceSort, minPrice, maxPrice }) => {
    let flatList = menu.filter((item) => item.category === "flat");

    // 🔹 Location filter (case-insensitive)
    if (location && typeof location === "string" && location.trim()) {
      flatList = flatList.filter((item) =>
        item.location?.toLowerCase().includes(location.toLowerCase())
      );
    }

    // 🔹 Price range filter
    if (minPrice) {
      flatList = flatList.filter(
        (item) => Number(item.price) >= Number(minPrice)
      );
    }
    if (maxPrice) {
      flatList = flatList.filter(
        (item) => Number(item.price) <= Number(maxPrice)
      );
    }

    // 🔹 Sorting logic
    if (priceSort === "lowToHigh") {
      flatList = [...flatList].sort(
        (a, b) => Number(a.price) - Number(b.price)
      );
    } else if (priceSort === "highToLow") {
      flatList = [...flatList].sort(
        (a, b) => Number(b.price) - Number(a.price)
      );
    }

    setFilteredFlats(flatList);
  };

  return (
    <div className="bg-gradient-to-br from-green-400 to-blue-600 min-h-screen pb-10">
      <Cover img={flatCover} title="Get Flat" />

      {/* 🔍 Search Component */}
      <Search onSearch={handleSearch} />

      {/* 🏢 Flat Grid */}
      <div className="grid md:grid-cols-3 gap-10 p-10">
        {filteredFlats.length > 0 ? (
          filteredFlats.map((item) => (
            <Link to={`/card/${item._id}`} key={item._id}>
              <RentCard2 item={item} />
            </Link>
          ))
        ) : (
          <p className="text-white text-center col-span-3 text-xl font-semibold mt-10">
            No flats found for this area.
          </p>
        )}
      </div>
    </div>
  );
};

export default Flat;
