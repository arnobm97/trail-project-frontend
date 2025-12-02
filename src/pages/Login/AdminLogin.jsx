import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const AdminLogin = () => {
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn } = useAuth(); // ✅ Changed from 'login' to 'signIn'
  const axiosPublic = useAxiosPublic();

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoginError("");
    setIsLoading(true);

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      // Use the correct function name 'signIn'
      const result = await signIn(email, password);

      if (result.user) {
        // Get JWT token from backend
        const tokenResponse = await axiosPublic.post("/jwt", { email: email });
        const token = tokenResponse.data.token;

        // Store the token in localStorage
        localStorage.setItem("access-token", token);

        // Check if the user is actually an admin via your API
        const adminCheckResponse = await axiosPublic.get(
          `/users/admin/${email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (adminCheckResponse.data?.admin) {
          Swal.fire({
            title: "Login Successful",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
          navigate("/admin/dashboard");
        } else {
          setLoginError("You don't have admin privileges");
          Swal.fire({
            title: "Access Denied",
            text: "You don't have admin privileges",
            icon: "error",
          });
          // Log out the user since they're not admin
          localStorage.removeItem("access-token");
        }
      }
    } catch (error) {
      console.error("Login error:", error);

      let errorMessage = "Invalid admin credentials";

      if (error.response?.status === 401) {
        errorMessage = "Authentication failed. Please check your credentials.";
      } else if (error.response?.status === 403) {
        errorMessage = "Access denied. Admin privileges required.";
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      setLoginError(errorMessage);
      Swal.fire({
        title: "Login Failed",
        text: errorMessage,
        icon: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-600 flex items-center justify-center p-4">
      <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-6xl gap-12">
        <div className="text-center lg:text-left text-white">
          <h1 className="text-5xl font-bold mb-6">Admin Portal</h1>
          <p className="text-xl opacity-90">
            Secure access for authorized administrators only
          </p>
          <div className="mt-8 p-6 bg-white bg-opacity-20 rounded-lg backdrop-blur-sm">
            <h3 className="text-2xl font-semibold mb-4">
              Administrator Access
            </h3>
            <ul className="text-left space-y-2">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                Manage user accounts and permissions
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                Monitor property listings and content
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                View system analytics and reports
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                Configure system settings
              </li>
            </ul>
          </div>
        </div>

        <div className="card w-full max-w-md bg-white shadow-2xl rounded-2xl overflow-hidden">
          <div className="card-body p-8">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800">Admin Login</h2>
              <p className="text-gray-600 mt-2">
                Enter your credentials to access the admin panel
              </p>
            </div>

            {loginError && (
              <div className="alert alert-error mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-gray-700">
                    Email Address
                  </span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter admin email"
                  className="input input-bordered w-full focus:input-primary border-gray-300"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-gray-700">
                    Password
                  </span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  className="input input-bordered w-full focus:input-primary border-gray-300"
                  required
                />
              </div>

              <div className="form-control mt-8">
                <button
                  className={`btn btn-primary w-full text-white font-bold py-3 rounded-lg transition-colors ${
                    isLoading ? "loading" : "hover:bg-blue-700"
                  }`}
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing In..." : "Access Admin Panel"}
                </button>
              </div>
            </form>

            <div className="text-center mt-6 space-y-2">
              <p className="text-sm text-gray-600">
                Don't have an admin account?{" "}
                <a
                  href="/adminsignup"
                  className="text-blue-600 hover:text-blue-800 font-semibold"
                >
                  Create one here
                </a>
              </p>
              <p className="text-xs text-gray-500">
                Only authorized personnel should access this system
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
