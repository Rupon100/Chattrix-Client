// import { FaRegComment } from "react-icons/fa";
// import { BiUpvote } from "react-icons/bi";
// import { MdOutlineDelete } from "react-icons/md";
// import useAxiosSecure from "../Hooks/useAxiosSecure";
// import { toast } from "react-hot-toast";
// import { Link } from "react-router-dom";
// import { Helmet } from "react-helmet-async";
// import { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import useAuth from "../Hooks/useAuth";

// const MyPost = () => {
//   const axiosSecure = useAxiosSecure();
//   const { user } = useAuth();
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(0);

//   const { data, isLoading, refetch } = useQuery({
//     queryKey: ["userposts", user?.email, page],
//     queryFn: async () => {
//       const res = await axiosSecure.get(
//         `/userposts?email=${user?.email}&page=${page}&limit=10`
//       );
//       setTotalPages(res.data.totalPages);
//       return res.data;
//     },
//   });

//   const posts = data?.posts || [];

//   const handleDelete = async (id) => {
//     const res = await axiosSecure.delete(`/post/${id}`);
//     if (res.data.deletedCount > 0) {
//       refetch();
//       toast.success("Post Deleted!");
//     }
//   };

//   const handlePageChange = (newPage) => {
//     if (newPage > 0 && newPage <= totalPages) {
//       setPage(newPage);
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex justify-center items-center">
//         <span className="loading loading-spinner loading-lg"></span>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex flex-col items-center gap-4 p-4 md:p-10">
//       <Helmet>
//         <title>Dashboard | My Post</title>
//       </Helmet>
//       <h2 className="text-2xl md:text-4xl capitalize font-semibold">
//         All the posts you posted!
//       </h2>
//       <div className="w-full">
//         {posts.length === 0 ? (
//           <div className="text-center text-gray-500 mt-4">
//             <p>No posts found. Start posting!</p>
//           </div>
//         ) : (
//           <div className="overflow-x-auto max-w-2xl mx-auto">
//             <table className="table">
//               <thead>
//                 <tr className="text-white">
//                   <th></th>
//                   <th>Title</th>
//                   <th>Vote</th>
//                   <th></th>
//                   <th></th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {posts.map((post, i) => (
//                   <tr key={post._id}>
//                     <th>{(page - 1) * 10 + i + 1}</th>
//                     <td>{post.title}</td>
//                     <td className="flex items-center gap-1">
//                       <BiUpvote />
//                       <span className="font-semibold">{post.voteCount || 0}</span>
//                     </td>
//                     <td>
//                       <Link to={`/comments/${post._id}`}>
//                         <FaRegComment />
//                       </Link>
//                     </td>
//                     <td>
//                       <button onClick={() => handleDelete(post._id)}>
//                         <MdOutlineDelete />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//       {totalPages > 1 && (
//         <div className="flex justify-between items-center w-full mt-4 max-w-2xl mx-auto border p-1 border-gray-400 rounded">
//           <div>
//             Showing {Math.min((page - 1) * 10 + 1, data?.totalPosts || 0)} to{" "}
//             {Math.min(page * 10, data?.totalPosts || 0)} of{" "}
//             {data?.totalPosts || 0}
//           </div>
//           <div className="flex items-center gap-2">
//             <button
//               onClick={() => handlePageChange(page - 1)}
//               disabled={page === 1}
//               className={`btn btn-sm text-white ${
//                 page === 1
//                   ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                   : "bg-gray-500 hover:bg-gray-700"
//               }`}
//             >
//                Previous
//             </button>
//             {Array.from({ length: totalPages }, (_, i) => i + 1).map(
//               (pageNumber) => (
//                 <button
//                   key={pageNumber}
//                   onClick={() => handlePageChange(pageNumber)}
//                   className={`btn btn-sm ${
//                     page === pageNumber
//                       ? "bg-sky-900 text-white"
//                       : "bg-gray-300 text-black"
//                   }`}
//                 >
//                   {pageNumber}
//                 </button>
//               )
//             )}
//             <button
//               onClick={() => handlePageChange(page + 1)}
//               disabled={page === totalPages}
//               className={`btn btn-sm text-white ${
//                 page === totalPages
//                   ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                   : "bg-gray-500 hover:bg-gray-700"
//               }`}
//             >
//               {page === totalPages ? "No Next Page" : "Next"}
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyPost;
















import { FaRegComment } from "react-icons/fa";
import { BiUpvote } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../Hooks/useAuth";

const MyPost = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["userposts", user?.email, page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/userposts?email=${user?.email}&page=${page}&limit=10`
      );
      setTotalPages(res.data.totalPages);
      return res.data;
    },
  });

  const posts = data?.posts || [];

  const handleDelete = async (id) => {
    const res = await axiosSecure.delete(`/post/${id}`);
    if (res.data.deletedCount > 0) {
      refetch();
      toast.success("Post Deleted!");
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center gap-4 p-4 md:p-10">
      <Helmet>
        <title>Dashboard | My Post</title>
      </Helmet>
      <h2 className="text-2xl md:text-4xl capitalize font-semibold">
        All the posts you posted!
      </h2>
      <div className="w-full">
        {posts.length === 0 ? (
          <div className="text-center text-gray-500 mt-4">
            <p>No posts found. Start posting!</p>
          </div>
        ) : (
          <div className="overflow-x-auto max-w-2xl mx-auto">
            <table className="table">
              <thead>
                <tr className="text-white">
                  <th></th>
                  <th>Title</th>
                  <th>Vote</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post, i) => (
                  <tr key={post._id}>
                    <th>{(page - 1) * 10 + i + 1}</th>
                    <td>{post.title}</td>
                    <td className="flex items-center gap-1">
                      <BiUpvote />
                      <span className="font-semibold">{post.voteCount || 0}</span>
                    </td>
                    <td>
                      <Link to={`/comments/${post._id}`}>
                        <FaRegComment />
                      </Link>
                    </td>
                    <td>
                      <button onClick={() => handleDelete(post._id)}>
                        <MdOutlineDelete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      {totalPages > 1 && (
        <div className="flex justify-between items-center w-full mt-4 max-w-2xl mx-auto">
          <div>
            Showing {Math.min((page - 1) * 10 + 1, data?.totalPosts || 0)} to{" "}
            {Math.min(page * 10, data?.totalPosts || 0)} of{" "}
            {data?.totalPosts || 0}
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className={`px-4 py-2 border bg-gray-800 text-gray-400 rounded mx-1 ${
                page === 1 ? "cursor-not-allowed" : "hover:bg-gray-700"
              }`}
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={`px-4 py-2 border rounded mx-1 ${
                  page === pageNumber
                    ? "bg-sky-900 text-white"
                    : "bg-gray-800 text-gray-400"
                }`}
              >
                {pageNumber}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className={`px-4 py-2 border bg-gray-800 text-gray-400 rounded mx-1 ${
                page === totalPages ? "cursor-not-allowed" : "hover:bg-gray-700"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPost;
