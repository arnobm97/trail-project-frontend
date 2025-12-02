import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useMenu from "../../../Hooks/useMenu";

const CardDetails = () => {
  const { id } = useParams();
  const [menu] = useMenu();
  const [card, setCard] = useState(null);
  const [activeTab, setActiveTab] = useState("images");
  const [slideIndex, setSlideIndex] = useState(0);
  const [ownerEmail, setOwnerEmail] = useState("");

  useEffect(() => {
    if (menu.length > 0) {
      const selectedCard = menu.find((item) => item._id === id);
      setCard(selectedCard);

      // Generate random email based on owner name
      if (selectedCard?.ownerName) {
        const generatedEmail = generateOwnerEmail(selectedCard.ownerName);
        setOwnerEmail(generatedEmail);
      }
    }
  }, [menu, id]);

  // Function to generate random email similar to owner name
  const generateOwnerEmail = (ownerName) => {
    if (!ownerName) return "owner@example.com";

    // Clean and format the owner name
    const cleanName = ownerName.toLowerCase().replace(/\s+/g, "");

    // Common email domains
    const domains = [
      "gmail.com",
      "yahoo.com",
      "outlook.com",
      "hotmail.com",
      "protonmail.com",
      "icloud.com",
    ];

    // Common name separators
    const separators = [".", "_", ""];

    // Generate random variations
    const randomSeparator =
      separators[Math.floor(Math.random() * separators.length)];
    const randomDomain = domains[Math.floor(Math.random() * domains.length)];

    // Sometimes add numbers
    const addNumber = Math.random() > 0.5;
    const randomNumber = addNumber ? Math.floor(Math.random() * 100) : "";

    // Create email variations
    const emailVariations = [
      `${cleanName}${randomNumber}@${randomDomain}`,
      `${cleanName
        .split("")
        .join(randomSeparator)}${randomNumber}@${randomDomain}`,
      `${cleanName.substring(0, 5)}${randomNumber}@${randomDomain}`,
      `${cleanName}${
        ownerName.split(" ")[1]?.charAt(0) || "x"
      }${randomNumber}@${randomDomain}`,
    ];

    return emailVariations[Math.floor(Math.random() * emailVariations.length)];
  };

  // Function to handle mail owner button click
  const handleMailOwner = () => {
    if (!ownerEmail) {
      alert("Owner email not available");
      return;
    }

    const subject = encodeURIComponent(
      `Inquiry about your property: ${card?.title}`
    );
    const body = encodeURIComponent(
      `Dear ${card?.ownerName},

I came across your property listing "${card?.title}" on Rental Hub and I'm very interested.

Property Details:
- Property: ${card?.title}
- Location: ${card?.location}
- Price: BDT ${card?.price}
- Type: ${card?.propertyType}

Could you please provide me with more information about:
1. Property availability
2. Viewing schedule
3. Any additional terms and conditions
4. Required documents for rental

Looking forward to your response.

Best regards,
[Your Name]
[Your Phone Number]`
    );

    // Open default mail client
    window.location.href = `mailto:${ownerEmail}?subject=${subject}&body=${body}`;

    // Optional: Log the email action (for analytics)
    console.log(
      `Mail button clicked for property: ${card?.title}, Email: ${ownerEmail}`
    );
  };

  if (!card) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading property details...</p>
        </div>
      </div>
    );
  }

  const {
    title,
    location,
    price,
    bedrooms,
    baths,
    size,
    propertyType,
    ownerName,
    ownerRole,
    postedTime,
    rentTag,
    perMonthRate,
  } = card;

  // IMAGE MAPPING
  const getImagesForProperty = (propertyId) => {
    const imageMap = {
      "642c155b2c4774f05c36eeaa": ["/1.jpeg", "/2.jpeg", "/3.jpeg"],
      "642c155b2c4774f05c36eeb9": ["/4.jpeg", "/5.jpeg", "/6.jpeg"],
      "642c155b2c4774f05c36ee7c": ["/7.jpeg", "/8.jpeg", "/9.jpeg"],
      "642c155b2c4774f05c36ee88": ["/10.jpeg", "/11.jpeg", "/12.jpeg"],
      "642c155b2c4774f05c36eea3": ["/13.jpeg", "/14.jpeg", "/15.jpeg"],
      "642c155b2c4774f05c36eea2": ["/16.jpeg", "/17.jpeg", "/18.jpeg"],
      "642c155b2c4774f05c36eea1": ["/19.jpeg", "/1.jpeg", "/2.jpeg"],
    };

    return imageMap[propertyId] || ["/1.jpeg", "/2.jpeg", "/3.jpeg"];
  };

  const images = getImagesForProperty(id);

  const nextSlide = () => {
    setSlideIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setSlideIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // VIDEO MAPPING
  const getVideoForProperty = (propertyId) => {
    const videoMap = {
      "642c155b2c4774f05c36eeaa": "/video1 (1).mp4",
      "642c155b2c4774f05c36eeb9": "/video1 (2).mp4",
      "642c155b2c4774f05c36ee7c": "/video1 (3).mp4",
      "642c155b2c4774f05c36ee88": "/video4.mp4",
      "642c155b2c4774f05c36eea3": "/video1 (2).mp4",
      "642c155b2c4774f05c36eea2": "/video1 (2).mp4",
      "642c155b2c4774f05c36eea1": "/video1 (3).mp4",
      "642c155b2c4774f05c36eea4": "/video1 (3).mp4",
      "642c155b2c4774f05c36eea6": "/video4.mp4",
      "642c155b2c4774f05c36eea5": "/video4.mp4",
    };
    return videoMap[propertyId] || "/video1 (1).mp4";
  };

  const videoSrc = getVideoForProperty(id);

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-2 mt-20 text-gray-800">{title}</h1>
      <p className="text-gray-600 mb-6 text-lg">{location}</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Images/Video */}
        <div className="lg:col-span-2">
          {/* TAB BUTTONS */}
          <div className="flex mb-6">
            <button
              className={`px-6 py-3 font-medium rounded-l-lg ${
                activeTab === "images"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => setActiveTab("images")}
            >
              <i className="fas fa-images mr-2"></i>
              Images
            </button>
            <button
              className={`px-6 py-3 font-medium rounded-r-lg ${
                activeTab === "videos"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => setActiveTab("videos")}
            >
              <i className="fas fa-video mr-2"></i>
              Videos
            </button>
          </div>

          {/* IMAGE SLIDER */}
          {activeTab === "images" ? (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative w-full h-96">
                <img
                  src={images[slideIndex]}
                  alt={`${title} - Image ${slideIndex + 1}`}
                  className="w-full h-full object-cover"
                />

                {/* Navigation Buttons */}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
                >
                  <i className="fas fa-chevron-left"></i>
                </button>

                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
                >
                  <i className="fas fa-chevron-right"></i>
                </button>

                {/* Slide Indicator */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setSlideIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === slideIndex ? "bg-blue-500" : "bg-white/70"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* THUMBNAILS */}
              <div className="p-4 grid grid-cols-5 gap-3">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSlideIndex(index)}
                    className={`overflow-hidden rounded-lg border-2 transition-all duration-200 ${
                      index === slideIndex
                        ? "border-blue-500 transform scale-105 shadow-md"
                        : "border-transparent hover:border-gray-300 hover:shadow"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            // VIDEO SECTION
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <video
                src={videoSrc}
                controls
                className="w-full h-96 object-cover"
                poster={images[0]}
              >
                Your browser does not support the video tag.
              </video>
            </div>
          )}
        </div>

        {/* Right Column - Details & Contact */}
        <div className="space-y-6">
          {/* Price Card */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-center mb-6">
              <div className="text-3xl font-bold text-blue-600">
                BDT {price}
              </div>
              <div className="text-gray-500 mt-1">{perMonthRate}</div>
            </div>

            {/* Property Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {bedrooms}
                </div>
                <div className="text-sm text-gray-600">Bedrooms</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{baths}</div>
                <div className="text-sm text-gray-600">Bathrooms</div>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{size}</div>
                <div className="text-sm text-gray-600">Sq. Ft</div>
              </div>
            </div>

            {/* Contact Buttons */}
            <div className="space-y-3">
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg font-medium transition duration-200 flex items-center justify-center">
                <i className="fas fa-calendar-check mr-2"></i>
                Schedule a Visit
              </button>

              <button
                onClick={handleMailOwner}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-medium transition duration-200 flex items-center justify-center"
              >
                <i className="fas fa-envelope mr-2"></i>
                Mail {ownerName}
              </button>

              <div className="text-center text-sm text-gray-500 mt-2">
                <i className="fas fa-info-circle mr-1"></i>
                Email will be sent to: {ownerEmail}
              </div>
            </div>

            {/* Share Options */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="font-medium mb-3 text-gray-700">
                Share this property
              </h4>
              <div className="flex space-x-3">
                <button className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center hover:bg-blue-200 transition">
                  <i className="fab fa-facebook-f"></i>
                </button>
                <button className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center hover:bg-green-200 transition">
                  <i className="fab fa-whatsapp"></i>
                </button>
                <button className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center hover:bg-red-200 transition">
                  <i className="fas fa-link"></i>
                </button>
              </div>
            </div>
          </div>

          {/* Owner Info Card */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              Property Owner
            </h3>
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <i className="fas fa-user text-blue-600 text-xl"></i>
              </div>
              <div>
                <div className="font-semibold text-gray-800">{ownerName}</div>
                <div className="text-sm text-gray-500">{ownerRole}</div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start">
                <i className="fas fa-envelope text-gray-400 mr-3 mt-1 w-5"></i>
                <div>
                  <div className="text-sm text-gray-500">Email</div>
                  <div className="text-gray-700 font-medium break-all">
                    {ownerEmail}
                  </div>
                </div>
              </div>

              <div className="flex items-start">
                <i className="fas fa-clock text-gray-400 mr-3 mt-1 w-5"></i>
                <div>
                  <div className="text-sm text-gray-500">Posted On</div>
                  <div className="text-gray-700">{postedTime}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Property Summary */}
      <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">
          Property Summary
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-700 mb-3">
              Basic Information
            </h3>
            <div className="space-y-3 mr-10">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Property For:</span>
                <span className="font-medium text-green-600 ">{rentTag}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Posted On:</span>
                <span className="font-medium text-gray-800">{postedTime}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Per Month Rate:</span>
                <span className="font-medium text-blue-600">
                  {perMonthRate}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Bedrooms:</span>
                <span className="font-medium text-gray-800">{bedrooms}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700 mb-3">
              Property Details
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Location:</span>
                <span className="font-medium text-gray-800">{location}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Property Size:</span>
                <span className="font-medium text-gray-800">{size} sqft</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Owner Name:</span>
                <span className="font-medium text-gray-800 ">{ownerName}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Bathrooms:</span>
                <span className="font-medium text-gray-800">{baths}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Owner Role:</span>
                <span className="font-medium text-gray-800">{ownerRole}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Font Awesome for icons */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />
    </div>
  );
};

export default CardDetails;
