import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const usePosts = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: posts = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["userposts", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/userposts?email=${user?.email}`);
      return res.data;
    },
  });
  return [posts, refetch, isLoading]
};

export default usePosts;
