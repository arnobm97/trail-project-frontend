import React, { useState, useEffect } from "react";
import Cover from "../../shared/Cover/Cover";
import singleRoom from "../../../assets/home/project photo/sin.jpg";
import useMenu from "../../../Hooks/useMenu";
import Search from "../../Search/Search/Search";
import { Link } from "react-router-dom";
import RentCard2 from "../../../Components/RentCard/RentCard";

const SingleRoom = () => {
  const [menu] = useMenu();
  const [filteredSingleRooms, setFilteredSingleRooms] = useState([]);

  // 🔹 Initially show all single rooms
  useEffect(() => {
    const singleRoomList = menu.filter(
      (item) => item.category === "singleroom"
    );
    setFilteredSingleRooms(singleRoomList);
  }, [menu]);

  // 🔍 Handle search and filtering logic
  const handleSearch = ({ location, priceSort, minPrice, maxPrice }) => {
    let singleRoomList = menu.filter((item) => item.category === "singleroom");

    // 🔹 Location filter (case-insensitive)
    if (location && typeof location === "string" && location.trim()) {
      singleRoomList = singleRoomList.filter((item) =>
        item.location?.toLowerCase().includes(location.toLowerCase())
      );
    }

    // 🔹 Price range filter
    if (minPrice) {
      singleRoomList = singleRoomList.filter(
        (item) => Number(item.price) >= Number(minPrice)
      );
    }
    if (maxPrice) {
      singleRoomList = singleRoomList.filter(
        (item) => Number(item.price) <= Number(maxPrice)
      );
    }

    // 🔹 Sorting logic
    if (priceSort === "lowToHigh") {
      singleRoomList = [...singleRoomList].sort(
        (a, b) => Number(a.price) - Number(b.price)
      );
    } else if (priceSort === "highToLow") {
      singleRoomList = [...singleRoomList].sort(
        (a, b) => Number(b.price) - Number(a.price)
      );
    }

    setFilteredSingleRooms(singleRoomList);
  };

  return (
    <div className="bg-gradient-to-br from-green-400 to-blue-600 min-h-screen pb-10">
      <Cover img={singleRoom} title="Single Room" />

      {/* 🔍 Search Component */}
      <Search onSearch={handleSearch} />

      {/* 🛏️ Single Room Grid */}
      <div className="grid md:grid-cols-3 gap-10 p-10">
        {filteredSingleRooms.length > 0 ? (
          filteredSingleRooms.map((item) => (
            <Link to={`/card/${item._id}`} key={item._id}>
              <RentCard2 item={item} />
            </Link>
          ))
        ) : (
          <p className="text-white text-center col-span-3 text-xl font-semibold mt-10">
            No single rooms found for this area.
          </p>
        )}
      </div>
    </div>
  );
};

export default SingleRoom;
