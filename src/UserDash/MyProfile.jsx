import useAuth from "../Hooks/useAuth";
import bronzeImg from "../assets/bronze.png";
import goldImg from "../assets/gold.png";
import usePosts from "../Hooks/userPosts";
import useUsers from "../Hooks/useUsers";
import { Helmet } from "react-helmet-async";

const MyProfile = () => {
  const { user } = useAuth();
  const [users] = useUsers();
  const [posts] = usePosts();

  const recentPosts = posts
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);


  return (
    <div className="p-4 md:p-8 flex flex-col justify-center gap-4 items-center">
      <Helmet>
        <title>Dashboard | Profile</title>
      </Helmet>
      <div className="text-center flex flex-col items-center gap-2 md:gap-4 space-y-3">
        <h3 className="text-xl font-semibold">{user?.email}</h3>
        <div className="flex flex-col items-center" >
          <img className="w-28 h-28 rounded-lg object-cover" src={user?.photoURL} alt="" />
          <h2 className="text-2xl font-semibold">{user?.displayName}</h2>
        </div>
        <div className="flex items-center flex-col font-bold">
          {users?.badge === "bronze" && (
            <div>
              <img className="w-12 h-12 object-cover" src={bronzeImg} alt="Bronze Badge" />
              Bronze
            </div>
          )}
          {users?.badge === "gold" && (
            <div>
              <img className="object-cover" src={goldImg} alt="Gold Badge" />
              Gold
            </div>
          )}
        </div>
      </div>
      <div className="text-white grid gap-4 grid-cols-1 md:grid-cols-3">
        {recentPosts.map((post) => (
          <div
            key={post._id}
            className="p-4 border rounded shadow-md space-y-2"
          >
            <h3 className="text-lg font-bold">{post.title}</h3>

            <div className="mt-2">
              <span className="font-bold">Tags:</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-600 text-white text-xs px-2 py-1 rounded "
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <p>Description: {post.description}</p>
            <small>{new Date(post.date).toLocaleString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyProfile;
