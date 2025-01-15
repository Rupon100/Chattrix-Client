import { Link, Outlet } from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";

 

const Dashboard = () => {
    return (
        <div className="bg-gradient-to-r from-black to-sky-950 text-white min-h-screen p-4 md:p-8" >
            <div className=" max-w-6xl mx-auto" >

            {/* user dashboard here all user content will be here */}
            <nav className="flex items-center justify-between" >
                <Link to={`/`} className="border px-4 py-1 rounded font-semibold flex items-center gap-2" > <FaLongArrowAltLeft /> <span>Home</span></Link>
                <ul className="flex items-center gap-2" >
                    <Link to={`/dashboard/profile`} className="border px-4 py-1 rounded">My Profile</Link>
                    <Link to={`/dashboard/addpost`} className="border px-4 py-1 rounded">Add Post</Link>
                    <Link to={`/dashboard/mypost`} className="border px-4 py-1 rounded">My Posts</Link>
                </ul>
            </nav>
            <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;