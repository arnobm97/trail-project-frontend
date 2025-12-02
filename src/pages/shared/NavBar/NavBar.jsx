import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProviders";
import { IoIosNotifications } from "react-icons/io";
import useCart from "../../../Hooks/useCart";

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [cart] = useCart();

  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  return (
    <div className="navbar fixed z-10 bg-opacity-30 max-w-7xl bg-white text-black shadow-2xl">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
        </div>
        <a className="mr-10 ml-5 text-sm bg-white text-black rounded-md btn">
          Rental
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li className=" mr-10 ml-5 btn btn-ghost text-sm bg-white text-black rounded-md ">
            <Link to="/">Home</Link>
          </li>
          <li>
            <details>
              <summary className=" mr-10 ml-5 btn btn-ghost text-sm bg-white text-black rounded-md  ">
                Rent
              </summary>
              <ul className="p-2 bg-white text-black">
                <li>
                  <Link to="/apartment">Apartment</Link>
                </li>
                <li>
                  <Link to="/flat">Flat</Link>
                </li>
                <li>
                  <Link to="/singleRoom">Single Room</Link>
                </li>
                <li>
                  <Link to="/bachelor">Bachelor</Link>
                </li>
                <li>
                  <Link to="/wholeSpace">Whole Space</Link>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <details>
              <summary className=" mr-10 ml-5 btn btn-ghost text-sm bg-white text-black rounded-md ">
                Buy
              </summary>
              <ul className="p-2 bg-white text-black">
                <li>
                  <Link to="/apartment">Apartment</Link>
                </li>
                <li>
                  <Link to="/flat">Flat</Link>
                </li>
                <li>
                  <Link to="/singleRoom">Single Room</Link>
                </li>
                <li>
                  <Link to="/bachelor">Bachelor</Link>
                </li>
                <li>
                  <Link to="/wholeSpace">Whole Space</Link>
                </li>
              </ul>
            </details>
          </li>
          <li className=" mr-10 ml-5 btn btn-ghost text-sm bg-white text-black rounded-md ">
            <Link to="/sell">Sell</Link>
          </li>
          <li>
            <Link to="admin/dashboard">
              <button className=" mr-10 ml-5 -mt-1.5 btn btn-ghost text-sm bg-white text-black rounded-md ">
                Admin
              </button>
            </Link>
          </li>
          <li>
            <Link to="user/dashboard">
              <button className=" mr-10 ml-5 -mt-1.5 btn btn-ghost text-sm bg-white text-black rounded-md ">
                Dashboard
              </button>
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end -mt-1.5 mr-15">
        {user ? (
          <>
            <button
              onClick={handleLogout}
              className="btn bg-white text-black rounded-md"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <li className="mr-10 ml-5 text-sm bg-white text-black rounded-md btn">
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
      </div>
    </div>
  );
};
export default NavBar;
