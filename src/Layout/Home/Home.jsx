import AllPosts from "../../Components/AllPost/AllPosts";
import Announcement from "../../Components/Announcement/Announcement";
import Banner from "../../Components/Banner/Banner";
import Tags from "../../Components/Tags/Tags";
import useAnnouncement from "../../Hooks/useAnnouncement";
import useUsers from "../../Hooks/useUsers";

const Home = () => {
  const [announcements, isLoading] = useAnnouncement();
  return (
    <div className="bg-gradient-to-r from-black to-sky-950 dark:bg-sky-100 dark:bg-none dark:text-black">
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
