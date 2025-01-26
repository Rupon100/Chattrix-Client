import { Link, Outlet } from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";

const Dashboard = () => {
  const { user } = useAuth();
  console.log(user)
  return (
    <div className="bg-gradient-to-r from-black to-sky-950 text-white min-h-screen p-4 md:p-8">
      <div className=" max-w-6xl mx-auto">
        {/* user dashboard here all user content will be here */}
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


          <ul  
              className="space-x-2 hidden lg:flex ml-auto"
            >
              <Link
                to={`/dashboard/profile`}
                className="border px-4 py-1 rounded"
              >
                My Profile
              </Link>
              <Link
                to={`/dashboard/addpost`}
                className="border px-4 py-1 rounded"
              >
                Add Post
              </Link>
              <Link
                to={`/dashboard/mypost`}
                className="border px-4 py-1 rounded"
              >
                My Posts
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
                to={`/dashboard/profile`}
                className="border px-4 py-1 rounded"
              >
                My Profile
              </Link>
              <Link
                to={`/dashboard/addpost`}
                className="border px-4 py-1 rounded"
              >
                Add Post
              </Link>
              <Link
                to={`/dashboard/mypost`}
                className="border px-4 py-1 rounded"
              >
                My Posts
              </Link>
            </ul>
          </div>
        </nav>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
