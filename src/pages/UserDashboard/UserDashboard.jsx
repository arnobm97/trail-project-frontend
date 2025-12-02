import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Clear user session from localStorage
        localStorage.removeItem("user-session");

        Swal.fire({
          title: "Logged out!",
          text: "You have been successfully logged out.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        navigate("/");
      }
    });
  };

  const [stats, setStats] = useState({
    totalBookings: 0,
    activeBookings: 0,
    savedProperties: 0,
    totalSpent: 0,
  });

  const [recentActivities, setRecentActivities] = useState([]);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    // Set active tab based on URL
    const path = location.pathname;
    if (path.includes("/bookings")) setActiveTab("bookings");
    else if (path.includes("/properties")) setActiveTab("properties");
    else if (path.includes("/favorites")) setActiveTab("favorites");
    else if (path.includes("/messages")) setActiveTab("messages");
    else if (path.includes("/payments")) setActiveTab("payments");
    else if (path.includes("/settings")) setActiveTab("settings");
    else setActiveTab("dashboard");

    // Load user profile from localStorage
    const userSession = localStorage.getItem("user-session");
    if (userSession) {
      setUserProfile(JSON.parse(userSession));
    }

    // Mock data for dashboard
    const fetchDashboardData = () => {
      setStats({
        totalBookings: 8,
        activeBookings: 2,
        savedProperties: 5,
        totalSpent: 3245.5,
      });

      setRecentActivities([
        {
          id: 1,
          user: "You",
          action: "Booked apartment",
          property: "Luxury Apartment Downtown",
          time: "2 hours ago",
          type: "booking",
        },
        {
          id: 2,
          user: "You",
          action: "Saved property",
          property: "Modern Studio in Manhattan",
          time: "1 day ago",
          type: "favorite",
        },
        {
          id: 3,
          user: "You",
          action: "Updated profile",
          property: "",
          time: "2 days ago",
          type: "profile",
        },
        {
          id: 4,
          user: "You",
          action: "Made payment",
          property: "Beach House Booking",
          time: "3 days ago",
          type: "payment",
        },
        {
          id: 5,
          user: "You",
          action: "Reviewed property",
          property: "Cozy Cabin",
          time: "1 week ago",
          type: "review",
        },
      ]);
    };

    fetchDashboardData();
  }, [location]);

  const menuItems = [
    {
      path: "/user/dashboard",
      label: "Dashboard",
      icon: "📊",
      key: "dashboard",
    },
    {
      path: "/user/bookings",
      label: "My Bookings",
      icon: "📅",
      key: "bookings",
    },
    {
      path: "/user/properties",
      label: "My Properties",
      icon: "🏠",
      key: "properties",
    },
    {
      path: "/user/favorites",
      label: "Favorites",
      icon: "❤️",
      key: "favorites",
    },
    {
      path: "/user/messages",
      label: "Messages",
      icon: "💬",
      key: "messages",
    },
    {
      path: "/user/payments",
      label: "Payments",
      icon: "💰",
      key: "payments",
    },
    {
      path: "/user/settings",
      label: "Settings",
      icon: "⚙️",
      key: "settings",
    },
  ];

  // Mock data for bookings
  const mockBookings = [
    {
      id: 1,
      propertyName: "Luxury Downtown Apartment",
      location: "New York, NY",
      checkIn: "2024-03-15",
      checkOut: "2024-03-20",
      guests: 2,
      status: "confirmed",
      amount: 1200,
      image:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=250&fit=crop",
    },
    {
      id: 2,
      propertyName: "Beachfront Villa",
      location: "Miami, FL",
      checkIn: "2024-04-10",
      checkOut: "2024-04-17",
      guests: 4,
      status: "pending",
      amount: 1800,
      image:
        "https://images.unsplash.com/photo-1613977257363-707ba9348227?w-400&h=250&fit=crop",
    },
    {
      id: 3,
      propertyName: "Mountain Cabin",
      location: "Aspen, CO",
      checkIn: "2024-05-05",
      checkOut: "2024-05-12",
      guests: 6,
      status: "completed",
      amount: 2200,
      image:
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=250&fit=crop",
    },
  ];

  // Mock data for properties
  const mockProperties = [
    {
      id: 1,
      name: "Modern Studio",
      location: "Los Angeles, CA",
      type: "Apartment",
      price: 150,
      status: "available",
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=250&fit=crop",
    },
    {
      id: 2,
      name: "City View Loft",
      location: "Chicago, IL",
      type: "Loft",
      price: 220,
      status: "rented",
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=400&h=250&fit=crop",
    },
  ];

  // Mock data for favorites
  const mockFavorites = [
    {
      id: 1,
      propertyName: "Luxury Penthouse",
      location: "San Francisco, CA",
      price: 350,
      addedDate: "2024-02-15",
      image:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=250&fit=crop",
    },
    {
      id: 2,
      propertyName: "Beach House",
      location: "Malibu, CA",
      price: 280,
      addedDate: "2024-02-10",
      image:
        "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400&h=250&fit=crop",
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "bookings":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
              <button
                onClick={() => navigate("/properties")}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Book New Property
              </button>
            </div>

            <div className="bg-white rounded-lg shadow border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">
                  Booking History
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {mockBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="flex items-center border-b border-gray-100 last:border-0 pb-4 last:pb-0"
                    >
                      <img
                        src={booking.image}
                        alt={booking.propertyName}
                        className="w-24 h-24 rounded-lg object-cover"
                      />
                      <div className="ml-4 flex-1">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-medium text-gray-900">
                              {booking.propertyName}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {booking.location}
                            </p>
                            <div className="flex items-center gap-4 mt-2">
                              <span className="text-sm text-gray-600">
                                {booking.checkIn} → {booking.checkOut}
                              </span>
                              <span className="text-sm text-gray-600">
                                {booking.guests} guest
                                {booking.guests > 1 ? "s" : ""}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-gray-900">
                              ${booking.amount}
                            </p>
                            <span
                              className={`inline-block mt-2 px-2 py-1 text-xs rounded-full ${
                                booking.status === "confirmed"
                                  ? "bg-green-100 text-green-800"
                                  : booking.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {booking.status}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200">
                            View Details
                          </button>
                          {booking.status === "pending" && (
                            <button className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200">
                              Cancel
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case "properties":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-900">
                My Properties
              </h1>
              <button
                onClick={() => navigate("/add-property")}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                + Add Property
              </button>
            </div>

            <div className="bg-white rounded-lg shadow border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">
                  Property Listings
                </h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mockProperties.map((property) => (
                    <div
                      key={property.id}
                      className="border border-gray-200 rounded-lg overflow-hidden"
                    >
                      <img
                        src={property.image}
                        alt={property.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-gray-900">
                              {property.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {property.location}
                            </p>
                          </div>
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              property.status === "available"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {property.status}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <div>
                            <span className="text-xl font-bold text-gray-900">
                              ${property.price}
                            </span>
                            <span className="text-gray-500">/night</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-amber-500">★</span>
                            <span className="ml-1 text-gray-700">
                              {property.rating}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                            Edit
                          </button>
                          <button className="flex-1 px-3 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
                            View Bookings
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case "favorites":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Saved Properties
            </h1>

            <div className="bg-white rounded-lg shadow border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">
                  Your Favorites
                </h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockFavorites.map((fav) => (
                    <div
                      key={fav.id}
                      className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <img
                        src={fav.image}
                        alt={fav.propertyName}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-gray-900">
                              {fav.propertyName}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {fav.location}
                            </p>
                          </div>
                          <button className="text-red-500 hover:text-red-700">
                            ❤️
                          </button>
                        </div>
                        <div className="mt-4">
                          <span className="text-xl font-bold text-gray-900">
                            ${fav.price}
                          </span>
                          <span className="text-gray-500">/night</span>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                            Book Now
                          </button>
                          <button className="px-3 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
                            Details
                          </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-3">
                          Added on {fav.addedDate}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case "dashboard":
      default:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {userProfile?.name || "User"} 👋
              </h1>
              <div className="text-sm text-gray-500">
                Last updated: {new Date().toLocaleString()}
              </div>
            </div>

            {/* Stats Cards - EXACT SAME DESIGN as Admin Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-blue-100">
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      ></path>
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      Total Bookings
                    </p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {stats.totalBookings}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-green-100">
                    <svg
                      className="w-6 h-6 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      ></path>
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      Active Bookings
                    </p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {stats.activeBookings}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-purple-100">
                    <svg
                      className="w-6 h-6 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      ></path>
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      Saved Properties
                    </p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {stats.savedProperties}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-amber-100">
                    <svg
                      className="w-6 h-6 text-amber-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      Total Spent
                    </p>
                    <p className="text-2xl font-semibold text-gray-900">
                      ${stats.totalSpent.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activities - EXACT SAME DESIGN as Admin Dashboard */}
            <div className="bg-white rounded-lg shadow border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">
                  Recent Activities
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                    >
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-sm font-medium text-blue-700">
                              {activity.type === "booking"
                                ? "📅"
                                : activity.type === "favorite"
                                ? "❤️"
                                : activity.type === "payment"
                                ? "💰"
                                : "👤"}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-900">
                            {activity.user}
                          </p>
                          <p className="text-sm text-gray-500">
                            {activity.action}{" "}
                            {activity.property && ` - ${activity.property}`}
                          </p>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        {activity.time}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions - EXACT SAME DESIGN as Admin Dashboard */}
            <div className="bg-white rounded-lg shadow border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">
                  Quick Actions
                </h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={() => navigate("/properties")}
                    className="flex flex-col items-center justify-center p-6 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors border border-blue-200"
                  >
                    <svg
                      className="w-8 h-8 text-blue-600 mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      ></path>
                    </svg>
                    <span className="text-sm font-medium text-gray-900">
                      Browse Properties
                    </span>
                  </button>

                  <button
                    onClick={() => setActiveTab("bookings")}
                    className="flex flex-col items-center justify-center p-6 bg-green-50 rounded-lg hover:bg-green-100 transition-colors border border-green-200"
                  >
                    <svg
                      className="w-8 h-8 text-green-600 mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      ></path>
                    </svg>
                    <span className="text-sm font-medium text-gray-900">
                      Manage Bookings
                    </span>
                  </button>

                  <button
                    onClick={() => setActiveTab("favorites")}
                    className="flex flex-col items-center justify-center p-6 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors border border-purple-200"
                  >
                    <svg
                      className="w-8 h-8 text-purple-600 mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      ></path>
                    </svg>
                    <span className="text-sm font-medium text-gray-900">
                      View Favorites
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Upcoming Bookings Section */}
            <div className="bg-white rounded-lg shadow border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">
                  Upcoming Stays
                </h2>
              </div>
              <div className="p-6">
                {mockBookings.filter((b) => b.status === "confirmed").length >
                0 ? (
                  <div className="space-y-4">
                    {mockBookings
                      .filter((b) => b.status === "confirmed")
                      .map((booking) => (
                        <div
                          key={booking.id}
                          className="flex items-center border-b border-gray-100 last:border-0 pb-4 last:pb-0"
                        >
                          <img
                            src={booking.image}
                            alt={booking.propertyName}
                            className="w-20 h-20 rounded-lg object-cover"
                          />
                          <div className="ml-4 flex-1">
                            <div className="flex justify-between">
                              <div>
                                <h3 className="font-medium text-gray-900">
                                  {booking.propertyName}
                                </h3>
                                <p className="text-sm text-gray-500">
                                  {booking.location}
                                </p>
                                <p className="text-sm text-gray-600 mt-1">
                                  {booking.checkIn} → {booking.checkOut}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-bold text-gray-900">
                                  ${booking.amount}
                                </p>
                                <button className="mt-2 text-sm text-blue-600 hover:text-blue-800">
                                  View Details
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No upcoming bookings</p>
                    <button
                      onClick={() => navigate("/properties")}
                      className="mt-2 text-blue-600 hover:text-blue-800"
                    >
                      Browse Properties
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar - EXACT SAME DESIGN as Admin Dashboard */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
              <span className="text-white font-bold text-lg">
                {userProfile?.name?.charAt(0) || "U"}
              </span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-800">
                {userProfile?.name || "User"}
              </h1>
              <p className="text-sm text-gray-600 mt-1">Verified User</p>
            </div>
          </div>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <button
                  onClick={() => {
                    setActiveTab(item.key);
                    navigate(item.path);
                  }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors w-full text-left ${
                    activeTab === item.key
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout Button - EXACT SAME DESIGN as Admin Dashboard */}
        <div className="absolute bottom-4 left-4 right-4">
          <button
            onClick={handleLogout}
            className="w-30 flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <span className="text-lg">🚪</span>
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">{renderContent()}</div>
    </div>
  );
};

export default UserDashboard;
