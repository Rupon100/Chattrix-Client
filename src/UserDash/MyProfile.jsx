import useAuth from "../Hooks/useAuth";
import bronzeImg from '../assets/bronze.png'

const MyProfile = () => {
  const { user } = useAuth();
  return (
    <div className="p-4 md:p-8 flex flex-col justify-center items-center" >
      <div className="text-center flex flex-col items-center gap-2 md:gap-4">
        <h2 className="text-2xl font-semibold">{user?.displayName}</h2>
        <h3 className="text-xl font-semibold">{user?.email}</h3>
        <img className="w-28 rounded-lg" src={user?.photoURL} alt="" />
        <div className="flex items-center flex-col" >
          <img src={bronzeImg} alt="" />
           after payment Gold
        </div>
      </div>
      <div>
        3 recent post here base on date
      </div>
    </div>
  );
};

export default MyProfile;
