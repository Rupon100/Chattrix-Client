 
const Comments = ({ comments, loading }) => {
     
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }


  return (
  <div>
    {comments.map(comment => (
        <div key={comment._id} className="bg-gray-50/10 dark:bg-sky-50 dark:text-black rounded p-2 m-2 text-gray-400" >
            <div>
                <div className="flex items-center gap-2" >
                <img className="w-10 h-10 object-cover rounded" src={comment?.userImg} alt="" />
                <h2 className="text-xl">{comment?.userName}</h2>
                </div>
                <small className="text-xs" >{comment?.date}</small>
            </div>
            <h2>
              {`"${comment?.msg}"`}
            </h2>
        </div>
    ))}
  </div>
  );
};

export default Comments;
