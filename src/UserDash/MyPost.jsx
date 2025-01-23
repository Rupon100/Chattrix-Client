import usePosts from "../Hooks/userPosts";
import { FaRegComment } from "react-icons/fa";
import { BiUpvote } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { toast } from 'react-hot-toast';
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../Hooks/useAuth";

const MyPost = () => {
  const [posts, refetch, isLoading] = usePosts();
  const axiosSecure = useAxiosSecure();
  const {user} = useAuth();

  const handleDelete = async (id) => {
    const res = await axiosSecure.delete(`/post/${id}`);
    if(res.data.deletedCount > 0){
      refetch();
      return toast.success("Post Deleted!")
    }
  }
 

  console.log(posts)
 

  return (
    <div className="min-h-screen flex flex-col items-center  gap-4 p-4 md:p-10">
      <h2 className="text-2xl md:text-4xl capitalize font-semibold">
        All the post you posted!
      </h2>
      {isLoading ? (
        <span className="loading loading-spinner loading-lg"></span>
      ) : (
        <div className=" overflow-x-auto">
          <table className="table">
            {/* head */}
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
                <tr key={i}>
                  <th>{i + 1}</th>
                  <td>{post.title}</td>
                  <td className="flex items-center gap-1">
                    <BiUpvote />

                    <span className="font-semibold">{post.voteCount || 0}</span>

                  </td>

                  <td>
                    <Link to={`/comments/${post._id}`} className="">
                      <FaRegComment />
                    </Link>
                  </td>
                  <td>
                    <button onClick={() => handleDelete(post._id)} className="">
                      {" "}
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
  );
};

export default MyPost;
