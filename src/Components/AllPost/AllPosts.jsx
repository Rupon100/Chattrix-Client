import useAllPost from "../../Hooks/useAllPost";
import SinglePost from "../SinglePost/SinglePost";

const AllPosts = () => {
    const [posts] = useAllPost();
    // console.log(posts)
    return (
        <div className="p-4 md:p-8 text-white space-y-4" >
            <div className="flex justify-between" >
                <div className="font-semibold text-xl" >All Post</div>
                <div className="btn btn-sm" >Sort by Popularity</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:grid-6" >
                {
                    posts.map(post => <SinglePost key={post._id} post={post} ></SinglePost>)
                }
            </div>
        </div>
    );
};

export default AllPosts;