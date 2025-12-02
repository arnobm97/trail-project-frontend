import React, { useState, useEffect } from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useMenu from "../../../Hooks/useMenu";
import { Link } from "react-router-dom";
import RentCard2 from "../../../Components/RentCard/RentCard";

const PopularMenu = () => {
  const [menu] = useMenu();
  const [filteredApartments, setFilteredApartments] = useState([]);

  // 🔹 Initially show all apartments
  useEffect(() => {
    const apartmentList = menu.filter((item) => item.category === "apartment");
    setFilteredApartments(apartmentList);
  }, [menu]);

  // 🔍 Handle search and filtering logic

  return (
    <div className="bg-gradient-to-br mt-16 from-green-400 to-blue-600 min-h-screen pb-10">
      {/* 🏠 Header Cover */}
      <SectionTitle
        heading={"from Our Menu"}
        subHeading={"Popular Menu"}
      ></SectionTitle>

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

export default PopularMenu;
