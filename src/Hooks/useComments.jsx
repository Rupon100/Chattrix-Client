import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useComments = (id) => {
  const axiosSecure = useAxiosSecure();
  const {
    data: comments = [],
    refetch,
    isLoading,
  } = useQuery({
    enabled: !!id,
    queryKey: ["comments", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/comments/${id}`);
      return res.data;
    },
  });
  return {comments, refetch, isLoading};
};

export default useComments;
