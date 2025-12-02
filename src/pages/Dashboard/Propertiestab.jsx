import { useState, useEffect } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const PropertiesTab = () => {
  const [properties, setProperties] = useState([]);
  const [categoryStats, setCategoryStats] = useState({});
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  // Default apartment images
  const defaultImages = [
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXBhcnRtZW50fGVufDB8fDB8fHww&w=1000&q=80",
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXBhcnRtZW50fGVufDB8fDB8fHww&w=1000&q=80",
    "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXBhcnRtZW50fGVufDB8fDB8fHww&w=1000&q=80",
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YXBhcnRtZW50fGVufDB8fDB8fHww&w=1000&q=80",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGFwYXJ0bWVudHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
  ];

  // Function to get a random default image
  const getDefaultImage = (propertyId) => {
    // Use the property ID to get a consistent random image for each property
    const index =
      propertyId.charCodeAt(propertyId.length - 1) % defaultImages.length;
    return defaultImages[index];
  };

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axiosSecure.get("/menu");
        const propertiesData = response.data;
        setProperties(propertiesData);

        // Calculate category statistics
        const stats = propertiesData.reduce((acc, property) => {
          acc[property.category] = (acc[property.category] || 0) + 1;
          return acc;
        }, {});

        setCategoryStats(stats);
      } catch (error) {
        console.error("Error fetching properties:", error);
        // Fallback data if API fails
        const fallbackProperties = [
          {
            _id: "1",
            name: "Luxury Apartment Downtown",
            category: "apartment",
            price: 2500,
            location: "Downtown, City Center",
            bedrooms: 3,
            baths: 2,
            size: "1200 sqft",
            ownerName: "John Smith",
            createdAt: "2024-03-01",
          },
          {
            _id: "2",
            name: "Modern Studio Flat",
            category: "flat",
            price: 1200,
            location: "Suburban Area",
            bedrooms: 1,
            baths: 1,
            size: "600 sqft",
            ownerName: "Sarah Johnson",
            createdAt: "2024-02-15",
          },
          {
            _id: "3",
            name: "Cozy Single Room",
            category: "singleroom",
            price: 500,
            location: "University Area",
            bedrooms: 1,
            baths: 1,
            size: "200 sqft",
            ownerName: "Mike Brown",
            createdAt: "2024-03-10",
          },
          {
            _id: "4",
            name: "Spacious Whole Space",
            category: "wholespace",
            price: 3500,
            location: "Business District",
            bedrooms: 4,
            baths: 3,
            size: "2000 sqft",
            ownerName: "Emily Davis",
            createdAt: "2024-01-20",
          },
          {
            _id: "5",
            name: "Bachelor Pad",
            category: "bachelor",
            price: 800,
            location: "Young Professional Area",
            bedrooms: 2,
            baths: 1,
            size: "800 sqft",
            ownerName: "David Wilson",
            createdAt: "2024-03-05",
          },
        ];

        setProperties(fallbackProperties);

        const stats = fallbackProperties.reduce((acc, property) => {
          acc[property.category] = (acc[property.category] || 0) + 1;
          return acc;
        }, {});

        setCategoryStats(stats);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [axiosSecure]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading properties...</div>
      </div>
    );
  }

  const categoryLabels = {
    apartment: "Apartment",
    flat: "Flat",
    singleroom: "Single Room",
    wholespace: "Whole Space",
    bachelor: "Bachelor",
  };

  return (
    <div className="space-y-6 w-[1000px]">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">
          Properties Management
        </h1>
        <div className="text-sm text-gray-500">
          Total Properties: {properties.length}
        </div>
      </div>

      {/* Category Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {Object.entries(categoryStats).map(([category, count]) => (
          <div
            key={category}
            className="bg-white rounded-lg shadow p-4 border border-gray-200"
          >
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{count}</p>
              <p className="text-sm text-gray-600 capitalize">
                {categoryLabels[category] || category}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Properties Table */}
      <div className="bg-white rounded-lg shadow border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">All Properties</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Property
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Size
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bed/Bath
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Owner
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {properties.map((property) => (
                <tr key={property._id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-lg object-cover"
                          src={property.image || getDefaultImage(property._id)}
                          alt={property.name}
                          onError={(e) => {
                            // Fallback in case the image URL is broken
                            e.target.src = getDefaultImage(property._id);
                          }}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {property.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 capitalize">
                      {categoryLabels[property.category] || property.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ৳{property.price}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                    {property.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {property.size}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {property.bedrooms} Bed / {property.baths} Bath
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {property.ownerName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PropertiesTab;
