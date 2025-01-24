import React, { PureComponent, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { BarChart, Bar, ResponsiveContainer } from "recharts";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { toast } from 'react-hot-toast';

const AdminProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [tag, setTag] = useState('');

  const { data: allsectionCount } = useQuery({
    queryKey: ["allsectionCount"],
    queryFn: async () => {
      const res = await axiosSecure.get("/count-all");
      return res.data;
    },
  });


  const data = [
    {
      name: "Total Posts",
      uv: allsectionCount?.postCount || 0,  
    },
    {
      name: "Total Comments",
      uv: allsectionCount?.commentsCount || 0,
    },
    {
      name: "Total Users",
      uv: allsectionCount?.userCount || 0,
    },
  ];

  const handleInputChange = (e) => {
    setTag(e.target.value);   
  };

   
  const handleTags = async () => {
    const res = await axiosSecure.post('/tag-post', {tag});
    if(res.data.insertedId){
      return toast.success("tag added!");
    }
    setTag('');
  };


  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="p-4 md:p-8 flex flex-col gap-4 justify-center items-center ">
        <div className="text-center flex flex-col justify-center items-center gap-4">
          <small className="text-lg font-semibold">{user?.email}</small>
          <img
            className="w-28 h-28 object-cover"
            src={user?.photoURL}
            alt="user photo"
          />
          <h2 className="text-2xl md:text-4xl font-semibold">
            {user?.displayName}
          </h2>
        </div>
        <div className="flex justify-between items-center">
          <div className="p-3 m-2 text-xl font-semibold border">
            Total posts: {allsectionCount?.postCount}
          </div>
          <div className="p-3 m-2 text-xl font-semibold border">
            Total Comments: {allsectionCount?.commentsCount}
          </div>
          <div className="p-3 m-2 text-xl font-semibold border">
            Total Users: {allsectionCount?.userCount}
          </div>
        </div>
        <div className="h-[400px] w-full border text-white " >
          <ResponsiveContainer width="100%" height={400}className={`text-white`}>
            <BarChart data={data} className="text-white" >
              <Bar dataKey="uv" fill="#294973" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="divider bg-gray-600 h-[1px]" ></div>
        <div className="p-2 flex flex-col justify-center gap-1 items-center" > 
          <h2 className="text-xl md:text-2xl font-semibold" >Add Tags</h2>
          <div className="flex gap-1" >

          <input onChange={handleInputChange} type="text" placeholder="Add tags from here" className="input text-black input-bordered w-full" />
          <button onClick={handleTags} className="px-4 py-2 rounded-lg border hover:bg-gray-50/10" >Add</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
