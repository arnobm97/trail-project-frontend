import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../providers/AuthProviders";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const AdminSignUp = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const axiosPublic = useAxiosPublic();

  // Watch password field for confirm password validation
  const password = watch("password");

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // Create user with email and password in Firebase
      const result = await createUser(data.email, data.password);
      const loggedUser = result.user;

      // Update user profile with name
      await updateUserProfile(data.name, "");

      // Get JWT token from backend
      const tokenResponse = await axiosPublic.post("/jwt", {
        email: data.email,
      });
      const token = tokenResponse.data.token;

      // Store the token in localStorage
      localStorage.setItem("access-token", token);

      // Create admin user in MongoDB using JWT token
      const userInfo = {
        name: data.name,
        email: data.email,
        role: "admin",
      };

      const res = await axiosPublic.post("/users/admin", userInfo, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Check if user was created or updated successfully
      if (
        res.data.insertedId ||
        res.data.acknowledged ||
        res.data.modifiedCount > 0
      ) {
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Admin Account Created Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });

        // Redirect to admin dashboard after successful creation
        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 1000);
      }
    } catch (error) {
      console.error("Error creating admin:", error);

      let errorMessage = "Failed to create admin account";

      if (error.response?.status === 401) {
        errorMessage = "Authentication failed. Please try again.";
      } else if (error.response?.status === 403) {
        errorMessage =
          "Access denied. You don't have permission to create an admin account.";
      } else if (error.response?.status === 400) {
        errorMessage = "User already exists with this email.";
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-600 flex items-center justify-center p-4">
      <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-6xl gap-12">
        {/* Left Side - Information */}
        <div className="text-center lg:text-left text-white">
          <h1 className="text-5xl font-bold mb-6">Admin Registration</h1>
          <p className="text-xl opacity-90">
            Create a new administrator account for the system
          </p>
          <div className="mt-8 p-6 bg-white bg-opacity-20 rounded-lg backdrop-blur-sm">
            <h3 className="text-2xl font-semibold mb-4">
              Administrator Privileges
            </h3>
            <ul className="text-left space-y-2">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                Full system access and control
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                Manage user accounts and permissions
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                View and manage all system data
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                Access analytics and reports
              </li>
            </ul>
          </div>
        </div>

        {/* Right Side - Registration Form */}
        <div className="card w-full max-w-md bg-white shadow-2xl rounded-2xl overflow-hidden">
          <div className="card-body p-8">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800">
                Admin Sign Up
              </h2>
              <p className="text-gray-600 mt-2">
                Create your administrator account
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Name Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-gray-700">
                    Full Name
                  </span>
                </label>
                <input
                  type="text"
                  {...register("name", {
                    required: "Name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                  })}
                  placeholder="Enter your full name"
                  className="input input-bordered w-full focus:input-primary border-gray-300"
                />
                {errors.name && (
                  <span className="text-red-600 text-sm mt-1">
                    {errors.name.message}
                  </span>
                )}
              </div>

              {/* Email Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-gray-700">
                    Email Address
                  </span>
                </label>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  placeholder="Enter admin email"
                  className="input input-bordered w-full focus:input-primary border-gray-300"
                />
                {errors.email && (
                  <span className="text-red-600 text-sm mt-1">
                    {errors.email.message}
                  </span>
                )}
              </div>

              {/* Password Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-gray-700">
                    Password
                  </span>
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                    maxLength: {
                      value: 20,
                      message: "Password must be less than 20 characters",
                    },
                  })}
                  placeholder="Create a strong password"
                  className="input input-bordered w-full focus:input-primary border-gray-300"
                />
                {errors.password && (
                  <span className="text-red-600 text-sm mt-1">
                    {errors.password.message}
                  </span>
                )}
                <div className="text-xs text-gray-500 mt-1">
                  Must be 6-20 characters long
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-gray-700">
                    Confirm Password
                  </span>
                </label>
                <input
                  type="password"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  placeholder="Re-enter your password"
                  className="input input-bordered w-full focus:input-primary border-gray-300"
                />
                {errors.confirmPassword && (
                  <span className="text-red-600 text-sm mt-1">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <div className="form-control mt-6">
                <button
                  className={`btn btn-primary w-full text-white font-bold py-3 rounded-lg transition-colors ${
                    isLoading ? "loading" : "hover:bg-blue-700"
                  }`}
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating Account..." : "Create Admin Account"}
                </button>
              </div>
            </form>

            {/* Additional Links */}
            <div className="text-center mt-6 space-y-2">
              <p className="text-sm text-gray-600">
                Already have an admin account?{" "}
                <Link
                  to="/adminlogin"
                  className="text-blue-600 hover:text-blue-800 font-semibold"
                >
                  Login here
                </Link>
              </p>
              <p className="text-xs text-gray-500">
                By creating an account, you agree to our terms of service
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSignUp;
