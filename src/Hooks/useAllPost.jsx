import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
 
const useAllPost = () => {
    const axiosSecure = useAxiosSecure();
    const { data: allposts = [], refetch, isLoading } = useQuery({
        queryKey: ['allpost'],
        queryFn: async() => {
            const res = await axiosSecure.get('/allposts');
            return res.data;
        }
    })
    return [allposts, refetch, isLoading];
};

export default useAllPost;