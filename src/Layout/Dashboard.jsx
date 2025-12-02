import {
  FaBook,
  FaBuilding,
  FaCalendar,
  FaHome,
  FaList,
  FaPhone,
  FaRegStar,
  FaShoppingCart,
  FaUser,
} from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../Hooks/useCart";
import useAdmin from "../Hooks/useAdmin";

const Dashboard = () => {


  //TODO: get isAdmin value from the database.
  const isAdmin = useAdmin();

  return (
    <div className="flex ">
      {/*dashboard side bar */}
      <div className="w-60 min-h-screen bg-gradient-to-br from-green-400 to-blue-600 ">
        <ul className="menu p-4">
          {isAdmin ? (
            <>
              <li className=" bg-white p-2 border border-black mb-5 ml-2">
                <NavLink to="/dashboard/adminHome">
                  <FaHome></FaHome>
                  Admin Home
                </NavLink>
              </li>
              <li className=" bg-white p-2 border border-black mb-5 ml-2">
                <NavLink to="/dashboard/addItems">
                  <FaBuilding></FaBuilding>
                  Add Items
                </NavLink>
              </li>
              <li className=" bg-white p-2 border border-black mb-5 ml-2">
                <NavLink to="/dashboard/manageItems">
                  <FaList></FaList>
                  Manage Items
                </NavLink>
              </li>
              <li className=" bg-white p-2 border border-black mb-5 ml-2">
                <NavLink to="/dashboard/bookings">
                  <FaBook></FaBook>
                  Manage Bookings
                </NavLink>
              </li>
              <li className=" bg-white p-2 border border-black mb-5 ml-2">
                <NavLink to="/dashboard/users">
                  <FaUser></FaUser>
                  All Users
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li className=" bg-white p-2 border border-black mb-5 ml-2">
                <NavLink to="/dashboard/userHome">
                  <FaHome></FaHome>
                  User Home
                </NavLink>
              </li>
              <li className=" bg-white p-2 border border-black mb-5 ml-2">
                <NavLink to="/dashboard/reservation">
                  <FaCalendar></FaCalendar>
                  Reservation
                </NavLink>
              </li>
              <li className=" bg-white p-2 border border-black mb-5 ml-2">
                <NavLink to="/dashboard/bookings">
                  <FaList></FaList>
                  My Bookings
                </NavLink>
              </li>
              <li className=" bg-white p-2 border border-black mb-5 ml-2">
                <NavLink to="/dashboard/cart">
                  <FaShoppingCart></FaShoppingCart>
                  My Cart({cart.length})
                </NavLink>
              </li>
              <li className=" bg-white p-2 border border-black mb-5 ml-2">
                <NavLink to="/dashboard/review">
                  <FaRegStar></FaRegStar>
                  Add a Review
                </NavLink>
              </li>
            </>
          )}

          {/*shared navlink*/}

          <div className="divider  divider-neutral length ml-2"></div>

          <li className=" bg-white p-2 border border-black mb-5 ml-2">
            <NavLink to="/">
              <FaHome></FaHome>
              Home
            </NavLink>
          </li>
          <li className=" bg-white p-2 border border-black mb-5 ml-2">
            <NavLink to="/">
              <FaPhone></FaPhone>
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
      {/*dashboard content */}

      <div className="flex-1 p-8">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
