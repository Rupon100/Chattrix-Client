import { Outlet } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Header/Navbar";

const Main = () => {
  return (
    <div >
      <Navbar ></Navbar>
      {/* dynamic now */}
      <div className="min-h-[calc(100vh-64px)]" >
        <Outlet></Outlet>
      </div>
      <Footer className="max-w-6xl mx-auto" ></Footer>
    </div>
  );
};

export default Main;
