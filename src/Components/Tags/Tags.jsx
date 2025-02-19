import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import toast from "react-hot-toast";


const Tags = () => {
  const axiosPublic = useAxiosPublic();

  const {data, isLoading} = useQuery({
    queryKey: ['tags'],
    queryFn: async() => {
      const res = await axiosPublic.get('/tags');
      return res.data;
    }
  })

  const handleTag = async(tag) => {
    await navigator.clipboard.writeText(tag);
    toast.success(`${tag} copied!`)
  } 
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 space-y-4 text-white dark:text-black" >
      <h2 className="text-2xl md:text-4xl font-semibold">Explore Tags</h2>
      <div className="flex flex-wrap gap-2">
       {data.tags.map((tag, index) => (
          <span
            key={index}
            onClick={() => handleTag(tag)}
            className="px-4 py-2 bg-gray-50/10 rounded text-sm md:text-base dark:bg-sky-200"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Tags;
