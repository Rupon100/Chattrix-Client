import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import toast from "react-hot-toast";

const Report = () => {
  const axiosSecure = useAxiosSecure();
  const { data: reports = [], isLoading, refetch } = useQuery({
    queryKey: ["reports"],
    queryFn: async () => {
      const res = await axiosSecure.get("/reports");
      return res.data;
    },
  });
  console.log(reports);


  const handleCommentDelete = async(id) => {
    const res = await axiosSecure.delete(`/comment-delete/${id}`);
    console.log(res.data.result.deletedCount)
    if(res.data.result.deletedCount > 0){
        await refetch();
        return toast.success("Report Comment is Deleted!");
    }
  }


  return (
    <div className="p-4 md:p-8 flex flex-col items-center min-h-screen">
      <div>
        <h2 className="text-center font-semibold text-2xl md:text-4xl">
          Reports of the Forum
        </h2>
      </div>
      <div className="grid grid-cols-1 w-full">
        <div className="flex flex-col justify-center items-center p-4 md:p-8 gap-4">
          {reports.map((report) => (
            <div
              key={report._id}
              className="p-2 border w-full border-gray-500 rounded-lg space-y-3 bg-gray-50/10"
            >
              <div>
                <h2 className="font-semibold text-xl">
                  Post Owner: {report?.postOwner}
                </h2>
                <h3 className="text-lg">
                  Feedback:{" "}
                  <span className="font-semibold"> {report?.feedback[0]}</span>
                </h3>
              </div>
              <hr className="" />
              <div>
                <h4 className="font-semibold">
                  Commenter: {report?.commenterEmail}
                </h4>
                <p>
                  Comment:{" "}
                  <span className="text-gray-300">{report?.commenterMsg}</span>
                </p>
              </div>
              <div>
                <h2 className="text-center font-semibold my-4 text-lg">
                  Take Action
                </h2>
                <div className="flex justify-center flex-col md:flex-row gap-4" >
                  <button onClick={() => handleCommentDelete(report?.commentId)} className="p-1 border text-sm rounded bg-red-500" >Delete Comment</button>
                  <button className="p-1 border text-sm rounded bg-red-500" >Delete Commenter Account</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Report;
