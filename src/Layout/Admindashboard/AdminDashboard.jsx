import { FaLongArrowAltLeft } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { Helmet } from "react-helmet-async";

const AdminDashboard = () => {
    const { user } = useAuth();
  return (
    <div className="bg-gradient-to-r from-black to-sky-950 text-white min-h-screen p-4 md:p-8">
      <Helmet>
        <title>Dashboard | Admin</title>
      </Helmet>
      <div className="max-w-6xl mx-auto">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <img className="w-12 h-12 object-cover rounded-full " src={user?.photoURL} alt="" />
            <Link
              to={`/`}
              className="border px-4 py-1 rounded font-semibold flex items-center gap-2"
            >
              {" "}
              <FaLongArrowAltLeft /> <span>Home</span>
            </Link>
          </div>

          <ul className="space-x-2 hidden lg:flex ml-auto">
            <Link
              to={`/admin-dashboard/admin-profile`}
              className="border px-4 py-1 rounded"
            >
              Admin Profile
            </Link>
            <Link
              to={`/admin-dashboard/manage-users`}
              className="border px-4 py-1 rounded"
            >
              Manage Users
            </Link>
            <Link to={`/admin-dashboard/report`} className="border px-4 py-1 rounded">
              Report Activities
            </Link>
            <Link to={`/admin-dashboard/admin-announcement`} className="border px-4 py-1 rounded">
              Make Announcement
            </Link>
          </ul>

          <div className="dropdown dropdown-end">
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
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow text-black gap-2 font-semibold"
            >
              <Link
                to={`/admin-dashboard/admin-profile`}
                className="border px-4 py-1 rounded"
              >
                Admin Profile
              </Link>
              <Link
                to={`/admin-dashboard/manage-users`}
                className="border px-4 py-1 rounded"
              >
                Manage users
              </Link>
              <Link
                to={`/admin-dashboard/report`}
                className="border px-4 py-1 rounded"
              >
                Report
              </Link>
              <Link
                to={`/admin-dashboard/admin-announcement`}
                className="border px-4 py-1 rounded"
              >
                Announcement
              </Link>
            </ul>
          </div>
        </nav>
        <Outlet>

        </Outlet>
      </div>
    </div>
  );
};

export default AdminDashboard;
