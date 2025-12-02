import React, { useState, useEffect } from "react";
import Cover from "../../shared/Cover/Cover";
import wholespaceImg from "../../../assets/home/project photo/a.jpg";
import useMenu from "../../../Hooks/useMenu";
import Search from "../../Search/Search/Search";
import { Link } from "react-router-dom";
import RentCard2 from "../../../Components/RentCard/RentCard";

const WholeSpace = () => {
  const [menu] = useMenu();
  const [filteredWholeSpaces, setFilteredWholeSpaces] = useState([]);

  // 🔹 Initially show all whole spaces
  useEffect(() => {
    const wholeSpaceList = menu.filter(
      (item) => item.category === "wholespace"
    );
    setFilteredWholeSpaces(wholeSpaceList);
  }, [menu]);

  // 🔍 Handle search and filtering logic
  const handleSearch = ({ location, priceSort, minPrice, maxPrice }) => {
    let wholeSpaceList = menu.filter((item) => item.category === "wholespace");

    // 🔹 Location filter (case-insensitive)
    if (location && typeof location === "string" && location.trim()) {
      wholeSpaceList = wholeSpaceList.filter((item) =>
        item.location?.toLowerCase().includes(location.toLowerCase())
      );
    }

    // 🔹 Price range filter
    if (minPrice) {
      wholeSpaceList = wholeSpaceList.filter(
        (item) => Number(item.price) >= Number(minPrice)
      );
    }
    if (maxPrice) {
      wholeSpaceList = wholeSpaceList.filter(
        (item) => Number(item.price) <= Number(maxPrice)
      );
    }

    // 🔹 Sorting logic
    if (priceSort === "lowToHigh") {
      wholeSpaceList = [...wholeSpaceList].sort(
        (a, b) => Number(a.price) - Number(b.price)
      );
    } else if (priceSort === "highToLow") {
      wholeSpaceList = [...wholeSpaceList].sort(
        (a, b) => Number(b.price) - Number(a.price)
      );
    }

    setFilteredWholeSpaces(wholeSpaceList);
  };

  return (
    <div className="bg-gradient-to-br from-green-400 to-blue-600 min-h-screen pb-10">
      <Cover img={wholespaceImg} title="Whole Space" />

      {/* 🔍 Search Component */}
      <Search onSearch={handleSearch} />

      {/* 🏢 Whole Space Grid */}
      <div className="grid md:grid-cols-2 gap-10 p-10">
        {filteredWholeSpaces.length > 0 ? (
          filteredWholeSpaces.map((item) => (
            <Link to={`/card/${item._id}`} key={item._id}>
              <RentCard2 item={item} />
            </Link>
          ))
        ) : (
          <p className="text-white text-center col-span-2 text-xl font-semibold mt-10">
            No whole spaces found for this area.
          </p>
        )}
      </div>
    </div>
  );
};

export default WholeSpace;
