// import { Navigate, useLocation } from "react-router-dom";
// import useAuth from "../Hooks/useAuth"; // Import your useAuth hook

// const PrivateRoute = ({ children }) => {
//   const location = useLocation();
//   const { user, loading } = useAuth(); // Use your existing auth system

//   // Check multiple authentication sources
//   const localStorageSession = localStorage.getItem("user-session");
//   const localStorageAdminSession = localStorage.getItem("admin-session");

//   const isAuthenticated =
//     !!user || !!localStorageSession || !!localStorageAdminSession;

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   if (!isAuthenticated) {
//     // Redirect to login page with the return URL
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }

//   return children;
// };

// export default PrivateRoute;
