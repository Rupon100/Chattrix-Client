import { Helmet } from "react-helmet-async";
import useAnnouncement from "../../Hooks/useAnnouncement";

const Announcement = () => {
  const [announcements, isLoading] = useAnnouncement();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 text-white bg-gradient-to-r from-black to-sky-950 min-h-screen flex flex-col items-center gap-4 md:gap-8">
      <Helmet>
        <title>Chattrix | Home</title>
      </Helmet>
      <h2 className="text-2xl md:text-4xl font-semibold">Announcement</h2>
      <div className="w-full flex flex-col justify-center gap-4 items-center p-4">
        {announcements.map((announcement, i) => (
          <div key={i}  className="w-full">
            <div className="max-w-2xl bg-gray-50/10 mx-auto p-2 rounded-lg border border-gray-300">
            <div className="space-y-2" >
              <small>Date: {announcement.date}</small>
              <div className="flex items-center gap-2" >
                <img className="w-12 h-12 object-cover" src={announcement.photo} alt="" />
                <h2 className="text-xl font-semibold" >{announcement.name}</h2>
              </div>
              <div>
                <h2 className="text-xl" >{announcement.title}</h2>
                <p>{announcement.description}</p>
              </div>
            </div>
          </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcement;
