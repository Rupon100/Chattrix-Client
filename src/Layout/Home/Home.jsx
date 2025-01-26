import AllPosts from "../../Components/AllPost/AllPosts";
import Announcement from "../../Components/Announcement/Announcement";
import Banner from "../../Components/Banner/Banner";
import Tags from "../../Components/Tags/Tags";
import useAnnouncement from "../../Hooks/useAnnouncement";

const Home = () => {
  const [announcements, isLoading] = useAnnouncement();
  // const announcements = [];

  return (
    <div className="bg-gradient-to-r from-black to-sky-950">
      <Banner></Banner>
      <div className="max-w-6xl mx-auto">
        <AllPosts></AllPosts>
        <Tags></Tags>
        {
          announcements.length > 0 && <Announcement></Announcement>
        }
      </div>
    </div>
  );
};

export default Home;
