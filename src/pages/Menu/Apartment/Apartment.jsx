import React, { useState, useEffect } from "react";
import Cover from "../../shared/Cover/Cover";
import apartmentImg from "../../../assets/home/ap.jpg";
import useMenu from "../../../Hooks/useMenu";
import Search from "../../Search/Search/Search";
import { Link } from "react-router-dom";
import RentCard2 from "../../../Components/RentCard/RentCard";

const Apartment = () => {
  const [menu] = useMenu();
  const [filteredApartments, setFilteredApartments] = useState([]);

  // 🔹 Initially show all apartments
  useEffect(() => {
    const apartmentList = menu.filter((item) => item.category === "apartment");
    setFilteredApartments(apartmentList);
  }, [menu]);

  // 🔍 Handle search and filtering logic
  const handleSearch = ({ location, priceSort, minPrice, maxPrice }) => {
    let apartmentList = menu.filter((item) => item.category === "apartment");

    // 🔹 Location filter (case-insensitive)
    if (location && typeof location === "string" && location.trim()) {
      apartmentList = apartmentList.filter((item) =>
        item.location?.toLowerCase().includes(location.toLowerCase())
      );
    }

    // 🔹 Price range filter
    if (minPrice) {
      apartmentList = apartmentList.filter(
        (item) => Number(item.price) >= Number(minPrice)
      );
    }
    if (maxPrice) {
      apartmentList = apartmentList.filter(
        (item) => Number(item.price) <= Number(maxPrice)
      );
    }

    // 🔹 Sorting logic
    if (priceSort === "lowToHigh") {
      apartmentList = [...apartmentList].sort(
        (a, b) => Number(a.price) - Number(b.price)
      );
    } else if (priceSort === "highToLow") {
      apartmentList = [...apartmentList].sort(
        (a, b) => Number(b.price) - Number(a.price)
      );
    }

    setFilteredApartments(apartmentList);
  };

  return (
    <div className="bg-gradient-to-br from-green-400 to-blue-600 min-h-screen pb-10">
      {/* 🏠 Header Cover */}
      <Cover img={apartmentImg} title="Apartment" />

      {/* 🔍 Search Component */}
      <Search onSearch={handleSearch} />

      {/* 🏢 Apartment Grid */}
      <div className="grid md:grid-cols-3 gap-10 p-10">
        {filteredApartments.length > 0 ? (
          filteredApartments.map((item) => (
            <Link to={`/card/${item._id}`} key={item._id}>
              <RentCard2 item={item} />
            </Link>
          ))
        ) : (
          <p className="text-white text-center col-span-3 text-xl font-semibold mt-10">
            No apartments found for this area.
          </p>
        )}
      </div>
    </div>
  );
};

export default Apartment;
