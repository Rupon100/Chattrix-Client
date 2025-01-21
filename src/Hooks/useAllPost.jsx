import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
 
const useAllPost = () => {
    const axiosPublic = useAxiosPublic();
    const { data: allposts = [], refetch, isLoading } = useQuery({
        queryKey: ['allpost'],
        queryFn: async() => {
            const res = await axiosPublic.get('/allposts');
            return res.data;
        }
    })
    return [allposts, refetch, isLoading];
};

export default useAllPost;