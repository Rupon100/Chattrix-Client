import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const AllComments = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: allcomments = [], isLoading } = useQuery({
    queryKey: ['allcomments'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/allcomments/${id}`);
      return res.data;
    }
  });

  console.log(allcomments);

  return (
    <div className="space-y-10" >
     
    </div>
  );
};

export default AllComments;
