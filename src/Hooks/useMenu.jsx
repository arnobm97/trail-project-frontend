import { useEffect, useState } from "react";

// Use only the Vercel backend URL
const baseURL = "https://trial-project-backend.vercel.app";

const useMenu = () => {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Fetching menu from:", `${baseURL}/menu`);

    fetch(`${baseURL}/menu`)
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
      });
  }, []);

  return [menu, loading, error];
};

export default useMenu;
