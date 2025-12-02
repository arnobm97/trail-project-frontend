import { useEffect, useState } from "react";

// Determine API base URL based on environment
const getBaseUrl = () => {
  // Check if we're in development or production
  if (
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
  ) {
    return "http://localhost:5000"; // Local development
  }
  return "https://trial-project-backend.vercel.app"; // Production
};

const useMenu = () => {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const baseUrl = getBaseUrl();
    console.log("Fetching menu from:", `${baseUrl}/menu`);

    fetch(`${baseUrl}/menu`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setMenu(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching menu:", error);
        setError(error.message);
        setLoading(false);

        // Fallback to localhost if Vercel fails (only if currently using Vercel)
        if (baseUrl.includes("vercel.app")) {
          console.log("Trying localhost as fallback...");
          fetch("http://localhost:5000/menu")
            .then((res) => {
              if (res.ok) return res.json();
              throw new Error("Localhost also failed");
            })
            .then((data) => {
              setMenu(data);
              setLoading(false);
            })
            .catch(() => {
              // Both failed, leave error as is
            });
        }
      });
  }, []);

  return [menu, loading, error];
};

export default useMenu;
