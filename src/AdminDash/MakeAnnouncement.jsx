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

        if(!title || !description){
          return toast.error("please write a annoucement to submit!");
        }

        const res = await axiosSecure.post('/announcement', announcement);
        if(res.data?.insertedId){
            return toast.success("announcement successfully added!!");
        }

    }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center  p-4 md:p-8">
      <Helmet>
        <title>Admin | Announcement</title>
      </Helmet>
      <div className="w-full" >
      <div className="text-center">
        <h2 className="text-2xl md:text-4xl">Make Announcement</h2>
      </div>
      <div className="w-full mx-auto" >
        <form onSubmit={handleAnnouncement} className="card-body max-w-xl mx-auto">
          <div className="form-control">
            <label className="label ">
              <span className="label-text text-white dark:text-black">Author Image</span>
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
              <span className="label-text text-white dark:text-black">Author Name</span>
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
              <span className="label-text text-white dark:text-black">Title</span>
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
              <span className="label-text text-white dark:text-black">Description</span>
            </label>
            <textarea
              type="text"
              name="description"
              placeholder="description"
              className="input input-bordered text-black p-4 resize-none "
            />
          </div>
          <div className="form-control mt-6">
            <button className="btn bg-transparent text-white hover:bg-gray-50/10 dark:text-black dark:bg-white">Add Announcement</button>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
};

export default MakeAnnouncement;
