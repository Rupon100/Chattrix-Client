import { useState } from "react";
import useAuth from "../Hooks/useAuth";
import toast from "react-hot-toast";

const AddPost = () => {
  const  {user} = useAuth();
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const photoURL = form.photoURL.value.trim();
    const displayName = form.name.value.trim();
    const email = form.email.value.trim();
    const title = form.title.value.trim();
    const description = form.description.value.trim();
    const tags = form.tags.value.trim();

    if (!photoURL || !displayName || !email || !title || !description || !tags) {
      setError("Please fill out all fields."); 
      toast.error("Please fill out all fields."); 
      return;
    }
    setError("");


    const data = {
      photoURL,
      displayName,
      email,
      title,
      description,
      tags: tags.split(" ").filter((tag) => tag.trim() !== ""), 
      votes: {
        upvote: 0,
        downvote: 0,
      },
    };


    console.log(data)
     

  }

  return (
    <div className="text-white" >
      <form 
      onSubmit={handleSubmit}
      className="card-body text-white max-w-xl mx-auto"
      >

        {/* image */}
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

        {/* Name */}
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

         {/* Email */}
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

         {/* title */}
         <div className="form-control ">
          <label className="label">
            <span className="label-text text-white">Title</span>
          </label>
          <input
            type="text"
            name="title"
            placeholder="title"
            className="input input-bordered text-black"
            required
          />
        </div>

         {/* description */}
         <div className="form-control ">
          <label className="label">
            <span className="label-text text-white">Description</span>
          </label>
          <input
            type="textarea"
            name="description"
            placeholder="description"
            className=" p-3 rounded-lg text-black outline-none"
            required
          />
        </div>

         {/* Tags */}
         <div className="form-control ">
          <label className="label">
            <span className="label-text text-white">Tags</span>
          </label>
          <input
            type="text"
            name="tags"
            placeholder="tags"
            className=" p-3 rounded-lg text-black outline-none"
            required
          />
        </div>


        
        <div className="form-control mt-6">
          <button className="btn bg-sky-800 border-none text-white hover:bg-sky-900">Add</button>
        </div>
      </form>
    </div>
  );
};

export default AddPost;
