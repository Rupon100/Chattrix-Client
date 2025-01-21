// import { useContext, useEffect, useState } from "react";
// import useAllPost from "../../Hooks/useAllPost";
// import SinglePost from "../SinglePost/SinglePost";
// import { FaArrowLeft } from "react-icons/fa6";
// import { FaArrowRight } from "react-icons/fa";
// import useAxiosSecure from "../../Hooks/useAxiosSecure";
// import { AuthContext } from "../../Providers/AuthProvider";

// const AllPosts = () => {
//   const [posts, refetch, isLoading] = useAllPost();
//   const [postts, setPosts] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const { filteredPosts, setFilteredPosts } = useContext(AuthContext);
//   const axiosSecure = useAxiosSecure();

//   console.log(filteredPosts);

//   useEffect(() => {
//     if (!isLoading) {
//       setPosts(posts);
//     }
//   }, [posts, isLoading]);

//   const postPerPage = 5;
//   const activePosts = filteredPosts.length > 0 ? filteredPosts : postts;
//   // const totalPosts = postts.length;
//   const totalPosts = activePosts.length;
//   const totalPages = Math.ceil(totalPosts / postPerPage);

//   const startIndex = (currentPage - 1) * postPerPage;
//   // const currentPosts = postts.slice(startIndex, startIndex + postPerPage);
//   const currentPosts = activePosts.slice(startIndex, startIndex + postPerPage);

//   const handleNextPage = () => {
//     if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
//   };

//   const handlePrevPage = () => {
//     if (currentPage > 1) setCurrentPage((prev) => prev - 1);
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex justify-center items-center">
//         <span className="loading loading-spinner loading-lg"></span>
//       </div>
//     );
//   }

//   const handleSort = async () => {
//     const res = await axiosSecure.get("/sortposts");
//     setPosts(res.data);
//     console.log(res.data);
//     setCurrentPage(1);
//   };

//   const hasPosts = currentPosts.length;
//   console.log(currentPosts)

//   return (
//     <div className="p-4 md:p-8 text-white space-y-4">
//       <div className="flex justify-between">
//         <div className="font-semibold text-xl">All Post</div>
//         <button onClick={handleSort} className="btn btn-sm">
//           Sort by Popularity
//         </button>
//       </div>
//       <div className="max-w-2xl mx-auto grid grid-cols-1  gap-4">
//         {/* {currentPosts.map((post) => (
//           <SinglePost key={post._id} post={post}></SinglePost>
//         ))} */}

//         {currentPosts.length === 0 ? (
//           <div className="text-center text-lg font-semibold">No data found</div>
//         ) : (
//           <div className="grid grid-cols-1 gap-4">
//             {currentPosts.map((post) => (
//               <SinglePost key={post._id} post={post}></SinglePost>
//             ))}
//           </div>
//         )}

//       </div>

//       <div className="flex justify-center space-x-4 mt-4">
//         <button
//           className="px-4 py-1 border flex items-center gap-1"
//           disabled={currentPage === 1}
//           onClick={handlePrevPage}
//         >
//           <FaArrowLeft />
//           Previous
//         </button>
//         <span className="p-2">
//           Page {currentPage} .. {totalPages}
//         </span>
//         <button
//           className="px-4 py-1 border flex items-center gap-1"
//           disabled={currentPage === totalPages}
//           onClick={handleNextPage}
//         >
//           Next
//           <FaArrowRight />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AllPosts;











 
import { useContext, useEffect, useState } from "react";
import useAllPost from "../../Hooks/useAllPost";
import SinglePost from "../SinglePost/SinglePost";
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";
import { AuthContext } from "../../Providers/AuthProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const AllPosts = () => {
  const [posts, refetch, isLoading] = useAllPost();  
  const { filteredPosts } = useContext(AuthContext);  
  const [currentPage, setCurrentPage] = useState(1);  
  const [allPosts, setAllPosts] = useState([]);  
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (!isLoading) {
      setAllPosts(posts);  
    }
  }, [posts, isLoading]);

  useEffect(() => {
    setCurrentPage(1); 
  }, [filteredPosts]);

  const postPerPage = 5;
  const activePosts = filteredPosts.length > 0 ? filteredPosts : allPosts;
  const totalPosts = activePosts.length;
  const totalPages = Math.ceil(totalPosts / postPerPage);

  const startIndex = (currentPage - 1) * postPerPage;
  const currentPosts = activePosts.slice(startIndex, startIndex + postPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

    const handleSort = async () => {
    const res = await axiosSecure.get("/sortposts");
    setAllPosts(res.data);
    console.log(res.data);
    setCurrentPage(1);
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 text-white space-y-4">

      <div className="flex justify-between">
        <div className="font-semibold text-xl">All Post</div>
        <button onClick={handleSort} className="btn btn-sm">
          Sort by Popularity
        </button>
      </div>

      <div className="max-w-2xl mx-auto grid grid-cols-1 gap-4">
        {activePosts.length === 0 ? (
          <div className="text-center text-lg font-semibold">No data found</div>
        ) : (
          currentPosts.map((post) => (
            <SinglePost key={post._id} post={post}></SinglePost>
          ))
        )}
      </div>
      <div className="flex justify-center space-x-4 mt-4">
        <button
          className="px-4 py-1 border flex items-center gap-1"
          disabled={currentPage === 1}
          onClick={handlePrevPage}
        >
          <FaArrowLeft />
          Previous
        </button>
        <span className="p-2">
          Page {currentPage} .. {totalPages}
        </span>
        <button
          className="px-4 py-1 border flex items-center gap-1"
          disabled={currentPage === totalPages}
          onClick={handleNextPage}
        >
          Next
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default AllPosts;
