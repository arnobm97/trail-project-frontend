import React, { useState, useEffect } from "react";
import Cover from "../../shared/Cover/Cover";
import bachelorImg from "../../../assets/home/project photo/be.jpg";
import useMenu from "../../../Hooks/useMenu";
import Search from "../../Search/Search/Search";
import { Link } from "react-router-dom";
import RentCard2 from "../../../Components/RentCard/RentCard";

const Bachelor = () => {
  const [menu] = useMenu();
  const [filteredBachelor, setFilteredBachelor] = useState([]);

  // 🔹 Initially show all bachelor properties
  useEffect(() => {
    const bachelorList = menu.filter((item) => item.category === "bachelor");
    setFilteredBachelor(bachelorList);
  }, [menu]);

  // 🔍 Handle search and filtering logic
  const handleSearch = ({ location, priceSort, minPrice, maxPrice }) => {
    let bachelorList = menu.filter((item) => item.category === "bachelor");

    // 🔹 Location filter (case-insensitive)
    if (location && typeof location === "string" && location.trim()) {
      bachelorList = bachelorList.filter((item) =>
        item.location?.toLowerCase().includes(location.toLowerCase())
      );
    }

    // 🔹 Price range filter
    if (minPrice) {
      bachelorList = bachelorList.filter(
        (item) => Number(item.price) >= Number(minPrice)
      );
    }
    if (maxPrice) {
      bachelorList = bachelorList.filter(
        (item) => Number(item.price) <= Number(maxPrice)
      );
    }

    // 🔹 Sorting logic
    if (priceSort === "lowToHigh") {
      bachelorList = [...bachelorList].sort(
        (a, b) => Number(a.price) - Number(b.price)
      );
    } else if (priceSort === "highToLow") {
      bachelorList = [...bachelorList].sort(
        (a, b) => Number(b.price) - Number(a.price)
      );
    }

    setFilteredBachelor(bachelorList);
  };

  return (
    <div className="bg-gradient-to-br from-green-400 to-blue-600 min-h-screen pb-10">
      <Cover img={bachelorImg} title="Bachelor" />

      {/* 🔍 Search Component */}
      <Search onSearch={handleSearch} />

      {/* 🏠 Bachelor Grid */}
      <div className="grid md:grid-cols-3 gap-10 p-10">
        {filteredBachelor.length > 0 ? (
          filteredBachelor.map((item) => (
            <Link to={`/card/${item._id}`} key={item._id}>
              <RentCard2 item={item} />
            </Link>
          ))
        ) : (
          <p className="text-white text-center col-span-3 text-xl font-semibold mt-10">
            No bachelor properties found for this area.
          </p>
        )}
      </div>
    </div>
  );
};

export default Bachelor;
