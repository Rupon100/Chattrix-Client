

const Tags = () => {
  return (
    <div className="p-4 md:p-8 text-white " >
      <h2 className="text-2xl md:text-4xl font-semibold">Explore Tags</h2>
      <div className="flex flex-wrap gap-2">
        all tags will be here - make a popular one
        {/* {tags.map((tag) => (
          <button
            key={tag}
            className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-700 hover:bg-sky-800 hover:text-white transition"
            onClick={() => onTagClick(tag)}
          >
            {tag}
          </button>
        ))} */}
      </div>
    </div>
  );
};

export default Tags;
