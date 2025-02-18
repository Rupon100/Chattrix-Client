import { useState } from "react";
import useAuth from "../Hooks/useAuth";
import toast from "react-hot-toast";
import useAxiosSecure from "./../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import Select from "react-select";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import usePosts from "../Hooks/userPosts";

const AddPost = () => {
  const { user, isRefetch, setIsRefetch } = useAuth();
  const [error, setError] = useState("");
  const axiosSecure = useAxiosSecure();
  const [limit, setLimit] = useState(true);
  const [selectedTags, setSelectedTags] = useState([]); 
  const [posts, isLoading, refetch] = usePosts(); 
  const queryClient = useQueryClient();

  const today = new Date();
  const formattedDate = today.toISOString();

  const { data: tags = [] } = useQuery({
    queryKey: ["main-tags"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tag-post");
      return res.data;
    },
  });

  const formattedTags = tags.map((tag) => ({
    value: tag._id,  
    label: tag.tag,  
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const photoURL = form.photoURL.value.trim();
    const displayName = form.name.value.trim();
    const email = form.email.value.trim();
    const title = form.title.value.trim();
    const description = form.description.value.trim();

    if (
      !photoURL ||
      !displayName ||
      !email ||
      !title ||
      !description ||
      selectedTags.length === 0  
    ) {
      setError("Please fill out all fields.");
      toast.error("Please fill out all fields.");
      return;
    }
    setError("");

    const data = {
      photoURL,
      displayName,
      date: formattedDate,
      email,
      title,
      description,
      tags: selectedTags.map((tag) => tag.label),  
      votes: {
        upvote: 0,
        downvote: 0,
      },
    };


    const res = await axiosSecure.post("/addpost", data);

    if (res.data.insertedId) {
      queryClient.setQueryData(["userposts", user?.email], (oldPosts = []) => {
        if (!Array.isArray(oldPosts)) {
          oldPosts = [];  
        }
        return [data, ...oldPosts];  
      });

      form.reset();
      // setIsRefetch(true);
      setSelectedTags([]);  
      toast.success("Posted successfully!");
    } else if (!res?.data?.status) {
      toast.error("You Have Only 5 Posts Limit!");
      form.reset();
      setLimit(false);
    } else {
      setLimit(true);
    }
  };

  

  return (
    <div className="min-h-screen mt-6  justify-center items-center">
      <Helmet>
        <title>Chattrix | Add Post</title>
      </Helmet>
      <div className="" >

     
      {limit ? (
        <div className="text-white min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-black to-sky-950">
          <h2 className="text-2xl md:text-4xl">Write a post</h2>
          <div className="w-full" >
          <form
            onSubmit={handleSubmit}
            className="card-body text-white max-w-xl mx-auto"
          >
            {/* Author Image */}
            <div className="form-control ">
              <label className="label">
                <span className="label-text text-white">Author Image</span>
              </label>
              <input
                type="text"
                name="photoURL"
                defaultValue={user?.photoURL}
                readOnly
                className="input input-bordered text-black"
                required
              />
            </div>

            {/* Author Name */}
            <div className="form-control ">
              <label className="label">
                <span className="label-text text-white">Author Name</span>
              </label>
              <input
                type="text"
                name="name"
                defaultValue={user?.displayName}
                readOnly
                className="input input-bordered text-black"
                required
              />
            </div>

            {/* Author Email */}
            <div className="form-control ">
              <label className="label">
                <span className="label-text text-white">Author Email</span>
              </label>
              <input
                type="text"
                name="email"
                defaultValue={user?.email}
                readOnly
                className="input input-bordered text-black"
                required
              />
            </div>

            {/* Title */}
            <div className="form-control ">
              <label className="label">
                <span className="label-text text-white">Title</span>
              </label>
              <input
                type="text"
                name="title"
                placeholder="Title"
                className="input input-bordered text-black"
                required
              />
            </div>

            {/* Description */}
            <div className="form-control ">
              <label className="label">
                <span className="label-text text-white">Description</span>
              </label>
              <textarea
                name="description"
                placeholder="Description"
                className="p-3 rounded-lg text-black outline-none"
                required
              />
            </div>

            {/* Tags */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Tags</span>
              </label>
              <Select
                isMulti
                name="tags"
                options={formattedTags}
                value={selectedTags} // Bind selected tags to state
                onChange={(selected) => setSelectedTags(selected)} // Update state on selection
                className="basic-multi-select bg-gray-400 text-black rounded-2xl"
                classNamePrefix="select"
              />
            </div>

            <div className="form-control mt-6">
              <button className="btn bg-sky-800 border-none text-white hover:bg-sky-900">
                Add
              </button>
            </div>
          </form>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-screen flex-col gap-4">
          <h3 className="text-center text-xl md:text-2xl font-semibold">
            Become a member of our forum and earn a gold badge to post more than
            5 times.
          </h3>
          <Link
            to={`/member`}
            className="p-4 border rounded-lg hover:bg-gray-800 transition-all"
          >
            Become a Member
          </Link>
        </div>
      )}
       </div>
    </div>
  );
};

export default AddPost;
