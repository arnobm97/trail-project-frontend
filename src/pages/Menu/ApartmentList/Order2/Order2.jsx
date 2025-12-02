import React from 'react';
import RentCard from '../components/RentCard';

const properties = [
  {
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    location: "Gulshan, Dhaka",
    price: "12,000",
    rentTag: "RENT",
    propertyType: "APARTMENT/FLATS",
    perMonthRate: "60",
    bedrooms: 3,
    baths: 3,
    size: 1650,
    ownerName: "Mr. Rahman",
    ownerRole: "Property Owner",
    postedTime: "2025-08-05 10:00:00"
  },
  {
    image: "https://images.unsplash.com/photo-1600607688374-2c0b5e1e07a4",
    location: "Sagor Para, Rajshahi",
    price: "5,000",
    rentTag: "RENT",
    propertyType: "APARTMENT/FLATS",
    perMonthRate: "25",
    bedrooms: 3,
    baths: 4,
    size: 2000,
    ownerName: "Md Ashaduzzman",
    ownerRole: "Property Owner",
    postedTime: "2025-08-05 02:43:17"
  },
  {
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914",
    location: "Uttara, Dhaka",
    price: "8,000",
    rentTag: "RENT",
    propertyType: "STUDIO",
    perMonthRate: "35",
    bedrooms: 1,
    baths: 1,
    size: 800,
    ownerName: "Ms. Laila",
    ownerRole: "Agent",
    postedTime: "2025-08-04 17:15:00"
  }
];

const Order2 = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Available Properties</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property, index) => (
          <RentCard key={index} {...property} />
        ))}
      </div>
    </div>
  );
};

export default Order2;
