import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import Swal from 'sweetalert2';
import useAuth from "../Hooks/useAuth";

const Report = () => {
  const axiosSecure = useAxiosSecure();
  const {deleteUserAccount} = useAuth();
  const {user} = useAuth();
  const { data: reports = [], isLoading, refetch } = useQuery({
    queryKey: ["reports"],
    queryFn: async () => {
      const res = await axiosSecure.get("/reports");
      return res.data;
    },
  });

  const handleCommentDelete = async(id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this comment!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async(result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/comment-delete/${id}`);
        if(res.data.result.deletedCount > 0){
          await refetch();
          Swal.fire({
            title: "Deleted!",
            text: "Your reported comment has been deleted.",
            icon: "success"
          });
      }
        
      }
    });
  };


 

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
                  <span className="font-semibold"> {report?.feedback}</span>
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
                  {/* <button onClick={handleDeleteAccount} className="p-1 border text-sm rounded bg-red-500" >Delete Commenter Account</button> */}
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
