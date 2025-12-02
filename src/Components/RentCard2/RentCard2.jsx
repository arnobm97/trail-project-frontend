import React from "react";
import { MapPin } from "lucide-react";

const RentCard = ({ item = {} }) => {
  const {
    image,
    title,
    location,
    price,
    rentTag,
    propertyType,
    perMonthRate,
    bedrooms,
    baths,
    size,
    ownerName,
    ownerRole,
    postedTime,
  } = item || {};
  <RentCard item={property} />;
  return (
    <div className="border rounded-xl shadow-md bg-white overflow-hidden mt-20">
      <div className="relative">
        <img src={image} alt="Property" className="h-56 w-full object-cover" />
        <span className="absolute top-3 left-3 bg-green-600 text-white text-sm px-3 py-1 rounded-full shadow-md">
          ৳ {price} /TOTAL
        </span>
      </div>

      <div className="p-4 space-y-2">
        <div className="flex justify-between items-start">
          <h2 className="text-lg font-semibold text-gray-800 leading-tight">
            {size} sqft, {bedrooms} Beds at {location}
          </h2>
          <span className="bg-sky-200 text-sky-800 text-xs px-2 py-1 rounded font-medium">
            {rentTag}
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs text-gray-600">
          <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-[10px] font-semibold uppercase">
            {propertyType}
          </span>
          <span>৳ {perMonthRate} /monthly</span>
          <span className="flex items-center gap-1">
            <MapPin size={12} />
            {location}
          </span>
        </div>

        <div className="grid grid-cols-3 text-center text-sm py-2 text-gray-700">
          <div>
            <p className="font-bold">{bedrooms.toString().padStart(2, "0")}</p>
            <p className="text-xs text-gray-500">Bedrooms</p>
          </div>
          <div>
            <p className="font-bold">{baths.toString().padStart(2, "0")}</p>
            <p className="text-xs text-gray-500">Baths</p>
          </div>
          <div>
            <p className="font-bold">{size}</p>
            <p className="text-xs text-gray-500">Size</p>
          </div>
        </div>

        <div className="border-t pt-2 text-sm text-gray-600 flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-semibold text-xs">
            bd
          </div>
          <div>
            <p className="font-semibold">{ownerName}</p>
            <p className="text-xs text-gray-400">
              {ownerRole} | {postedTime}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentCard;
