import { Link } from "react-router-dom";
import { MdCardMembership } from "react-icons/md";
import { FaHome, FaUserAlt } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import useAuth from "../../Hooks/useAuth";
import useAnnouncement from "../../Hooks/useAnnouncement";
import useUsers from "../../Hooks/useUsers";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { user, loading, logOut } = useAuth();
  const [announcements] = useAnnouncement();
  const [isScrolled, setIsScrolled] = useState(false);
  const [users] = useUsers();

  useEffect(() => {
    const handleScroll = () => {
      if(window.scrollY > 40){
        setIsScrolled(true);
      }else{
        setIsScrolled(false);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);

  }, []);

  const handleLogout = () => {
    logOut();
  };

  const links = (
    <>
      <li>
        <Link className="nav">
          <FaHome />
          <h2>Home</h2>
        </Link>
      </li>
      <li>
        <Link to={`/member`} className="nav ">
          <MdCardMembership />
          <h3>Membership</h3>
        </Link>
      </li>
      <li>
        <Link to={`/`} className="nav ">
          <IoNotifications />
          <div className={`badge bg-gray-500 text-white ${announcements.length > 0 && 'bg-red-600'}`}>+{announcements?.length}</div>
        </Link>
      </li>
    </>
  );

  return (
    <div className={`text-white sticky top-0 left-0 right-0 z-50 ${isScrolled ? 'bg-sky-950/40 backdrop-blur-3xl shadow-md transition-all duration-75' : 'bg-sky-950'}`}>
      <div className=" max-w-6xl mx-auto navbar px-4">

        {/* name and logo */}
        <div className="navbar-start">
          <Link to="/" className="text-xl font-bold flex items-center gap-1">
            <h2>Chattrix</h2>
            <img className="max-w-10" src="/talking.png" alt="logo" />
          </Link>
        </div>

        {/* middle links or navbar */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-2 lg:space-x-4">
            {links}
          </ul>
        </div>

        <div className="navbar-end space-x-1">
          {loading ? (
            <div className="p-2 flex justify-center items-center" >
              <FaUserAlt />
            </div>
          ) : user?.email ? (
            <div className="dropdown dropdown-end flex bg-transparent rounded-full">
              <div
                tabIndex={0}
                role="button"
                className="  btn btn-circle avatar bg-transparent"
              >
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img alt="profile" src={user?.photoURL } />
                </div>
              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content rounded-box z-[1] mt-16 w-52 p-2 shadow text-center text-white  flex flex-col justify-center bg-sky-950"
              >
                <li className="text-center font-semibold text-lg">
                  {user?.displayName || 'User'}
                </li>
                <li>
                  <Link to={users?.role === "admin" ? "/admin-dashboard/admin-profile" : "/dashboard/profile"}>Dashboard</Link>
                </li>
                <li onClick={handleLogout}>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              to={`/login`}
              className="flex border rounded-lg items-center gap-2 px-4 py-2  bg-transparent text-white hover:bg-sky-700 no-underline"
            >
              Join Us
            </Link>
          )}

          {/* dropdown mwnu for small device */}
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
