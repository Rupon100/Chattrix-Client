import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useState } from "react";
import Swal from "sweetalert2";

const AllComments = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [selectedOption, setSelectedOption] = useState({});

  const { data: allcomments = [], isLoading } = useQuery({
    queryKey: ["allcomments"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/allcomments/${id}`);
      return res.data;
    },
  });

  const handleChange = (e, i) => {
    const value = e.target.value;
    setSelectedOption((prev) => ({ ...prev, [i]: value }));
    console.log(`Row ${i} selected option:`, value);
  };

  const handleComment = (msg) => {
    Swal.fire(`${msg}`);
  };

  return (
    <div className=" min-h-screen text-white bg-gradient-to-r from-black to-sky-950 flex justify-center items-center ">
      <div className="overflow-x-auto max-w-2xl mx-auto">
        {allcomments.length === 0 ? (
          <p className="text-center text-white text-xl font-semibold">
            No comment found
          </p>
        ) : (
          <table className="table">
            {/* head */}
            <thead className="text-white">
              <tr>
                <th>#</th>
                <th>Commenter</th>
                <th>Comment</th>
                <th>Feedback</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {allcomments.map((comment, i) => (
                <tr key={i}>
                  <th>{i + 1}</th>
                  <td>{comment?.email}</td>
                  <td>
                    {comment?.msg.slice(0, 20)}..{" "}
                    <span
                      onClick={() => handleComment(comment?.msg)}
                      className="link"
                    >
                      see more
                    </span>{" "}
                  </td>
                  <td className="text-white bg-transparent">
                    <select
                      onChange={(e) => handleChange(e, i)}
                      className="select select-bordered w-full max-w-xs bg-transparent border border-gray-600"
                    >
                      <option disabled selected className="dropdown">
                        Feedback
                      </option>
                      <option value="good" className="dropdown">
                        Good
                      </option>
                      <option value="better" className="dropdown">
                        Better
                      </option>
                      <option value="spam" className="dropdown">
                        Spam
                      </option>
                    </select>
                  </td>
                  <td>
                    <button
                      disabled={!selectedOption[i]}
                      className={`p-3 border border-gray-600 rounded-lg ${
                        selectedOption[i]
                          ? "bg-green-800 hover:bg-green-600"
                          : "bg-gray-800 cursor-not-allowed"
                      }`}
                    >
                      Report
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AllComments;
