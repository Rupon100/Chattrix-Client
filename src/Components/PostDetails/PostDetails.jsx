import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import {
  FaChevronCircleDown,
  FaChevronCircleUp,
  FaRegComment,
} from "react-icons/fa";
import { WhatsappShareButton, WhatsappIcon } from "react-share";
import { useState } from "react";

const PostDetails = () => {
  const { id } = useParams();
  const [isCommentVisible, setIsCommentVisible] = useState(false);
  const axiosSecure = useAxiosSecure();
  const shareUrl = window.location.href;
  const queryClient = useQueryClient();

  const { data: detail = {}, isLoading } = useQuery({
    queryKey: ["details", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/details/${id}`);
      return res.data;
    },
  });

  const handleUpvote = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.patch(`/details/${id}/upvote`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["details", id]);
    },
  });

  const handleDownvote = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.patch(`/details/${id}/downvote`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["details", id]);
    },
  });

  const {
    _id,
    photoURL,
    displayName,
    date,
    email,
    title,
    description,
    tags = [],
    votes,
  } = detail || {};

  const upvote = votes?.upvote || 0;
  const downvote = votes?.downvote || 0;

  console.log(upvote);

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const handleCommentClick = () => {
    setIsCommentVisible(prevState => !prevState);
  };

  return (
    <div className="bg-gradient-to-r from-black to-sky-950 min-h-screen p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-4 text-white ">
        <div>
          <div className="flex items-center gap-3">
            <img
              className="w-20 h-20 rounded-full"
              src={photoURL}
              alt="author image"
            />
            <h2 className="text-2xl md:text-4xl">{displayName}</h2>
          </div>
          <small>Date: {date}</small>
        </div>
        <div className="divider h-[1px] bg-gray-500"></div>
        <div className="space-y-3">
          <h2 className="font-semibold text-2xl md:text-4xl">{title}</h2>
          <div className="flex flex-wrap gap-2 mt-1">
            {tags &&
              tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-600 text-white text-xs px-2 py-1 rounded "
                >
                  #{tag}
                </span>
              ))}
          </div>
          <p className="text-gray-400">{description}</p>
        </div>
        <div className="flex-grow flex gap-3 items-center">
          <div className="flex bg-gray-100/10 rounded">
            <button
              onClick={() => handleUpvote.mutate(_id)}
              className="flex items-center gap-1 p-2 rounded-s hover:bg-gray-50/5  transition-all"
            >
              <FaChevronCircleUp />
              <span>UpVote: {upvote}</span>
            </button>
            <button
              onClick={() => handleDownvote.mutate(_id)}
              className="flex items-center gap-1 p-2 rounded-e hover:bg-gray-50/5  transition-all"
            >
              <FaChevronCircleDown />
              <span>{downvote}</span>
            </button>
          </div>
          <button onClick={handleCommentClick} className="flex items-center gap-1 p-3 rounded bg-gray-100/10 hover:bg-gray-50/5  transition-all">
            <FaRegComment />
          </button>
          <WhatsappShareButton url={shareUrl}>
            <WhatsappIcon size={32} round={true}></WhatsappIcon>
          </WhatsappShareButton>
        </div>
        {isCommentVisible && (
        <div className="mt-4">
          <textarea
            placeholder="Write a comment..."
            rows="4"
            className="w-full p-2 resize-none rounded border bg-gray-700 text-white"
          />
        </div>
      )}
      </div>
      
    </div>
  );
};

export default PostDetails;
