import { FaRegComment } from "react-icons/fa";
import { FaChevronCircleUp } from "react-icons/fa";
import { FaChevronCircleDown } from "react-icons/fa";
import { Link } from "react-router-dom";

const SinglePost = ({ post }) => {
  
  const {
    _id,
    photoURL,
    displayName,
    date,
    email,
    title,
    description,
    tags,
    votes: {upvote, downvote},
  } = post;

   
  return (
    <Link to={`/details/${_id}`} className="border border-gray-50 rounded flex gap-4 flex-col p-2 justify-center h-full">
      <div className="flex flex-col gap-2">
        <div className="flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="">
              <img
                className="w-14 h-14 object-cover rounded-full"
                src={photoURL}
                alt="photo"
              />
            </div>
            <h3 className="text-xl font-semibold">{displayName}</h3>
          </div>
          <small>Date: {date}</small>
        </div>
        <div className="flex-grow">
          <h2 className="text-xl">{title}</h2>
          <p className="text-gray-400">{description}</p>
        </div>
        <div className="flex flex-wrap gap-2 mt-1">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-blue-600 text-white text-xs px-2 py-1 rounded "
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
      <div className="flex-grow flex gap-3 items-center">
        <div className="flex bg-gray-100/10 rounded" >
          <div className="flex items-center gap-1 p-2 rounded-s  ">
            <FaChevronCircleUp />
            <span>UpVote: {upvote}</span>
          </div>
          <div className="flex items-center gap-1 p-2 rounded-e  ">
            <FaChevronCircleDown />
            <span>DownVote: {downvote}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 p-2 rounded bg-gray-100/10  ">
          <FaRegComment />
          <span>{0}</span>
        </div>
      </div>
    </Link>
  );
};

export default SinglePost;
