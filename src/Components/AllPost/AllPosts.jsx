import { useEffect, useState } from "react";
import useAllPost from "../../Hooks/useAllPost";
import SinglePost from "../SinglePost/SinglePost";
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";

const AllPosts = () => {
  const [posts, refetch, isLoading] = useAllPost()  
  const [currentPage, setCurrentPage] = useState(1); 


  const postPerPage = 5;
  const totalPosts = posts.length;
  const totalPages = Math.ceil(totalPosts / postPerPage);  

  const startIndex = (currentPage - 1) * postPerPage;
  const currentPosts = posts.slice(startIndex, startIndex + postPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  if(isLoading){
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
        <div className="btn btn-sm">Sort by Popularity</div>
      </div>
      <div className="max-w-2xl mx-auto grid grid-cols-1  gap-4 md:grid-6">
        {currentPosts.map((post) => (
          <SinglePost key={post._id} post={post}></SinglePost>
        ))}
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
        <span className="p-2" >
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
