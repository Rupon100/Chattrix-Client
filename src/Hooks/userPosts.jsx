import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const usePosts = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: posts = [],
    isLoading,
    isFetched,
    refetch,
  } = useQuery({
    queryKey: ["userposts", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosSecure.get(`/userposts?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });
  return [posts, isLoading, isFetched, refetch]
};
export default usePosts;
