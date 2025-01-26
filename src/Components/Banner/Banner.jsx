
import { useContext, useEffect, useState } from "react";
import bannerBg from "../../assets/banner-bg.jpg";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { AuthContext } from "../../Providers/AuthProvider";

const Banner = () => {
  const [searchTag, setSearchTag] = useState("");
  const axiosSecure = useAxiosSecure();
  const { setFilteredPosts } = useContext(AuthContext);

  useEffect(() => {
    const debounceSearch = setTimeout(async () => {
      if (searchTag.trim() === "") {
        setFilteredPosts([]); // Reset to show all posts
      } else {
        try {
          const res = await axiosSecure.get(`/search?tag=${searchTag}`);
          setFilteredPosts(res.data);
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
      }
    }, 300);  

    return () => clearTimeout(debounceSearch);  
  }, [searchTag, axiosSecure, setFilteredPosts]);

  return (
    <div
      className="min-h-[500px] w-full flex justify-center items-center p-4 md:p-10 relative"
      style={{
        backgroundImage: `url(${bannerBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      <div className="relative text-white flex flex-col justify-center items-center gap-4">
        <h2 className="text-2xl md:text-4xl font-semibold">
          Welcome to Chattrix!
        </h2>
        <div className="flex items-baseline">
          <input
            type="text"
            value={searchTag}
            onChange={(e) => setSearchTag(e.target.value)}
            placeholder="search by tags"
            className="p-3 text-black border rounded outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;




