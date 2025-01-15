import Announcement from "../../Components/Announcement/Announcement";
import Banner from "../../Components/Banner/Banner";
import Tags from "../../Components/Tags/Tags";

const Home = () => {
  return (
    <div className="bg-gradient-to-r from-black to-sky-950">
      <Banner></Banner>
      <div className="max-w-6xl mx-auto">
        <Tags></Tags>
        <Announcement></Announcement>
      </div>
    </div>
  );
};

export default Home;
