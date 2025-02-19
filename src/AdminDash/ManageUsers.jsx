// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import useAxiosSecure from "../Hooks/useAxiosSecure";
// import { Helmet } from "react-helmet-async";
// import { useState } from "react";
// import { toast } from "react-hot-toast";

// const ManageUsers = () => {
//   const axiosSecure = useAxiosSecure();
//   const queryClient = useQueryClient();
//   const [search, setSearch] = useState("");
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(0);

//   const { data, refetch } = useQuery({
//     queryKey: ["all-users", search, page],
//     queryFn: async () => {
//       const res = await axiosSecure.get(
//         `/all-users?search=${search}&page=${page}&limit=10`
//       );
//       setTotalPages(res.data.totalPages);  
//       return res.data;
//     },
//   });

//   const users = data?.users || [];

//   const handleSearch = (e) => {
//     setSearch(e.target.value);
//     setPage(1);  
//   };

//   const handleStatus = async (id) => {
//     const res = await axiosSecure.patch(`/user-role/${id}`);
//     if (res.data?.modifiedCount > 0) {
//       refetch();
//       toast.success("Role Modified!!");
//     }
//   };

//   const handlePageChange = (newPage) => {
//     if (newPage > 0 && newPage <= totalPages) {
//       setPage(newPage);
//     }
//   };

//   return (
//     <div className="flex gap-2 md:gap-4 flex-col justify-center items-center p-4 md:p-8">
//       <Helmet>
//         <title>Admin | Manage users</title>
//       </Helmet>
//       <div className="text-2xl md:text-4xl">All Users</div>
//       <div>
//         <input
//           onChange={handleSearch}
//           value={search}
//           type="text"
//           placeholder="Search user by name"
//           className="p-2 rounded-lg text-black"
//         />
//       </div>
//       {users.length > 0 ? (
//         <div className="overflow-x-auto w-full max-w-2xl mx-auto">
//           <table className="table">
//             <thead>
//               <tr className="text-white">
//                 <th>#</th>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Action</th>
//                 <th>Subscription</th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.map((user, i) => (
//                 <tr key={user._id}>
//                   <th>{(page - 1) * 10 + i + 1}</th>
//                   <td>{user.name}</td>
//                   <td>{user.email}</td>
//                   <td>
//                     <button
//                       onClick={() => handleStatus(user._id)}
//                       className={`btn btn-sm text-white hover:bg-gray-50/10 ${
//                         user.role === "admin"
//                           ? "bg-gray-50/10"
//                           : "bg-transparent"
//                       }`}
//                     >
//                       {user.role}
//                     </button>
//                   </td>
//                   <td>
//                     <button
//                       className={`btn btn-sm text-white hover:bg-gray-50/10 ${
//                         user.badge === "gold"
//                           ? "bg-gray-50/10"
//                           : "bg-transparent"
//                       }`}
//                     >
//                       {user.badge}
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <div className="p-8 text-center">
//           <h2>No User Found!</h2>
//         </div>
//       )}
//       {/* Pagination Controls */}
//       {totalPages > 1 && (
//         <div className="flex justify-between items-center w-full mt-4 max-w-2xl mx-auto border p-1 border-gray-400 rounded">
//           {/* Left Side: Showing range of displayed data */}
//           <div>
//             Showing {Math.min((page - 1) * 10 + 1, data?.totalUsers || 0)} to{" "}
//             {Math.min(page * 10, data?.totalUsers || 0)} of{" "}
//             {data?.totalUsers || 0}
//           </div>

//           {/* Right Side: Pagination */}
//           <div className="flex items-center gap-2">
//             <button
//               onClick={() => handlePageChange(page - 1)}
//               disabled={page === 1}
//               className="btn btn-sm  bg-transparent hover:bg-gray-50/10 text-white"
//             >
//               Previous
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
//               className="btn btn-sm bg-transparent hover:bg-gray-50/10 text-white"
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManageUsers;

















import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { toast } from "react-hot-toast";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const { data, refetch } = useQuery({
    queryKey: ["all-users", search, page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/all-users?search=${search}&page=${page}&limit=10`
      );
      setTotalPages(res.data.totalPages);  
      return res.data;
    },
  });

  const users = data?.users || [];

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);  
  };

  const handleStatus = async (id) => {
    const res = await axiosSecure.patch(`/user-role/${id}`);
    if (res.data?.modifiedCount > 0) {
      refetch();
      toast.success("Role Modified!!");
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="flex gap-2 md:gap-4 flex-col justify-center items-center p-4 md:p-8">
      <Helmet>
        <title>Admin | Manage users</title>
      </Helmet>
      <div className="text-2xl md:text-4xl">All Users</div>
      <div>
        <input
          onChange={handleSearch}
          value={search}
          type="text"
          placeholder="Search user by name"
          className="p-2 rounded-lg text-black"
        />
      </div>
      {users.length > 0 ? (
        <div className="overflow-x-auto w-full max-w-2xl mx-auto">
          <table className="table">
            <thead>
              <tr className="text-white dark:text-black">
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
                <th>Subscription</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => (
                <tr key={user._id}>
                  <th>{(page - 1) * 10 + i + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <button
                      onClick={() => handleStatus(user._id)}
                      className={`btn btn-sm text-white hover:bg-gray-50/10 dark:text-black ${
                        user.role === "admin"
                          ? "bg-gray-50/10"
                          : "bg-transparent"
                      }`}
                    >
                      {user.role}
                    </button>
                  </td>
                  <td>
                    <button
                      className={`btn btn-sm text-white bg-gray-50/10 hover:bg-gray-50/10 dark:text-black ${
                        user.badge === "gold"
                          ? "bg-gray-50/10"
                          : "bg-transparent"
                      }`}
                    >
                      {user.badge}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="p-8 text-center">
          <h2>No User Found!</h2>
        </div>
      )}
      
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center w-full mt-4 max-w-2xl mx-auto ">
          {/* Left Side: Showing range of displayed data */}
          <div className="text-white dark:text-black">
            Showing {Math.min((page - 1) * 10 + 1, data?.totalUsers || 0)} to{" "}
            {Math.min(page * 10, data?.totalUsers || 0)} of{" "}
            {data?.totalUsers || 0}
          </div>

          {/* Right Side: Pagination */}
          <div className="flex items-center gap-2">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className={`px-4 py-2 border text-white ${
                page === 1
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gray-500 hover:bg-gray-700"
              } rounded`}
            >
              Previous
            </button>

            {/* Page Number Buttons */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`px-4 py-2 border rounded ${
                    page === pageNumber
                      ? "bg-sky-900 text-white"
                      : "bg-gray-300 text-black"
                  }`}
                >
                  {pageNumber}
                </button>
              )
            )}

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className={`px-4 py-2 border text-white ${
                page === totalPages
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gray-500 hover:bg-gray-700"
              } rounded`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;

