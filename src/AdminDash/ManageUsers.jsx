import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { toast } from 'react-hot-toast';
const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient(); 
  const [search, setSearch] = useState("");
 
  const { data: users = [], refetch } = useQuery({
    queryKey: ["all-users", search],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-users?search=${search}`);
      return res.data;
    },
  });
  
  const handleSearch = (e) => {
    // search functionality
    setSearch(e.target.value);
  }

  //-----role update---
  const handleStatus = async(id) => {
    const res = await axiosSecure.patch(`/user-role/${id}`);
    console.log(res.data)
    if(res.data?.modifiedCount > 0){
      refetch();
      toast.success("Role Modified!!");
    }
  }
  
  return (
    <div className="flex gap-2 md:gap-4 flex-col justify-center items-center p-4 md:p-8">
      <Helmet>
        <title>Admin | Manage users</title>
      </Helmet>
      <div className="text-2xl md:text-4xl">All Users</div>
      <div>
        <input onChange={handleSearch} value={search} type="text" placeholder="search user by name" className="p-2 rounded-lg text-black" />
      </div>
      {
        users.length > 0 ? 
        (<div className="overflow-x-auto w-full max-w-2xl mx-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-white" >
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
              <th>Subscription</th>
            </tr>
          </thead>
          <tbody>
            
           {
            users.map((user, i) => (
                <tr key={user._id} >
                <th>{i+1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                    <button onClick={() => handleStatus(user._id)} className={`btn btn-sm  text-white hover:bg-gray-50/10 ${user.role === "admin" ? 'bg-gray-50/10' : 'hover:bg-gray-50/10 bg-transparent'} `} >{user.role}</button>
                </td>
                <td>
                    <button className={`btn btn-sm  text-white hover:bg-gray-50/10  ${user.badge === "gold" ? 'bg-gray-50/10 ' : 'bg-gray-50/10'} `} >{user.badge}</button>
                </td>
              </tr>
            ))
           }
           
            
          </tbody>
        </table>
      </div> ) : (
        <div className="p-8 text-center" >
            <h2>No User Found!</h2>
        </div>
      )
        }
    </div>
  );
};

export default ManageUsers;



 