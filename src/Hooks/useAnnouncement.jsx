import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAnnouncement = () => {
    const axiosSecure = useAxiosSecure();
    const {data: announcements = [], isLoading} = useQuery({
        queryKey: ['announcement'],
        queryFn: async() => {
            const res = await axiosSecure.get('/announcement');
            return res.data;
        }
    });
    return [announcements, isLoading];
};

export default useAnnouncement;