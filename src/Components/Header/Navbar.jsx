import { Link } from "react-router-dom";
import { MdCardMembership } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import useAuth from "../../Hooks/useAuth";

const Navbar = () => {
  const { user,  logOut } = useAuth();

  const handleLogout = () => {
    logOut();
  }

  const links = (
    <>
      <li>
        <Link className="nav">
          <FaHome />
          <h2> Home</h2>
        </Link>
      </li>
      <li>
        <Link className="nav ">
          <MdCardMembership />
          <h3>Membership</h3>
        </Link>
      </li>
      <li>
        <Link className="nav ">
          <IoNotifications />
          <div className="badge bg-gray-500 text-white">+0</div>
        </Link>
      </li>
    </>
  );

  return (
    <div className="bg-sky-950 text-white">
      <div className=" max-w-6xl mx-auto navbar px-4">
        <div className="navbar-start">
          <Link to="/" className="text-xl font-bold flex items-center gap-1">
            <h2>Chattrix</h2>
            <img className="max-w-10" src="/talking.png" alt="logo" />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-2 lg:space-x-4">
            {links}
          </ul>
        </div>
        <div className="navbar-end">

          {
            user?.email 
            ? 
         

          <div className="dropdown dropdown-end">

            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-12 rounded-full">
                <img
                  alt="profile"
                  src={user?.photoURL}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow text-center text-white bg-sky-950 flex flex-col justify-center "
            >
              <li className="text-center font-semibold text-lg" >{user?.displayName}</li>
              <li>
                <Link>Dashboard</Link>
              </li>
              <li onClick={handleLogout} >
                <a>Logout</a>
              </li>
            </ul>
          </div>

          : 



          
          <Link
          to={`/joinus`}
          className="flex border rounded-lg items-center gap-2 px-4 py-2  bg-transparent text-white hover:bg-sky-700 no-underline"
          >
            Join Us
          </Link>

          }

          <div className="dropdown dropdown-end lg:hidden">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className=" menu-sm dropdown-content bg-sky-950 text-white rounded-box z-[1] mt-3 w-52 p-4 space-y-4 shadow"
            >
              {links}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
