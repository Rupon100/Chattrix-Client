import { Helmet } from "react-helmet-async";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import toast from "react-hot-toast";

const MakeAnnouncement = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const handleAnnouncement = async(e) => {
        e.preventDefault();
        const form = e.target;
        const photo = form.photo.value;
        const name  = form.name.value;
        const title  = form.title.value;
        const description  = form.description.value;
        const announcement = {
            photo,
            name, 
            title,
            description,
            date: new Date()
        };
        const res = await axiosSecure.post('/announcement', announcement);
        if(res.data?.insertedId){
            return toast.success("announcement successfully added!!");
        }

    }

  return (
    <div className="flex flex-col justify-center items-center  p-4 md:p-8">
      <Helmet>
        <title>Admin | Announcement</title>
      </Helmet>
      <div className="text-center">
        <h2 className="text-2xl md:text-4xl">Make Announcement</h2>
      </div>
      <div className="w-full mx-auto" >
        <form onSubmit={handleAnnouncement} className="card-body max-w-xl mx-auto">
          <div className="form-control">
            <label className="label ">
              <span className="label-text text-white">Author Image</span>
            </label>
            <input
              type="url"
              name="photo"
              defaultValue={user?.photoURL}
              className="input input-bordered text-black"
            readOnly
            />
          </div>
          <div className="form-control">
            <label className="label ">
              <span className="label-text text-white">Author Name</span>
            </label>
            <input
              type="text"
              name="name"
              defaultValue={user?.displayName}
              className="input input-bordered text-black"
            readOnly
            />
          </div>
          <div className="form-control">
            <label className="label ">
              <span className="label-text text-white">Title</span>
            </label>
            <input
              type="text"
              name="title"
              placeholder="add a title here"
              className="input input-bordered text-black"
             
            />
          </div>
          <div className="form-control">
            <label className="label ">
              <span className="label-text text-white">Description</span>
            </label>
            <textarea
              type="text"
              name="description"
              placeholder="description"
              className="input input-bordered text-black p-4 resize-none "
             
            />
          </div>
          <div className="form-control mt-6">
            <button className="btn bg-transparent text-white hover:bg-gray-50/10">Add Announcement</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MakeAnnouncement;
