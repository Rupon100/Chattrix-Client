import bannerBg from '../../assets/banner-bg.jpg'
const Banner = () => {
  return (
    <div 
      className=" min-h-[500px] w-full flex justify-center items-center p-4 md:p-10 relative"
      style={{backgroundImage: `url(${bannerBg})`, backgroundSize: 'cover', backgroundPosition: 'center'}}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      <div className=" relative text-white flex flex-col justify-center items-center gap-4" >
        <h2 className="text-2xl md:text-4xl font-semibold">
          Welcome to Chattrix!
        </h2>
        <div className="flex items-baseline">
          <input type="text" placeholder="search by tags" className="p-3 text-black border rounded-s-lg outline-none" />
          <button className="border p-3 rounded-e-lg bg-sky-800 hover:bg-sky-900 text-white" >Search</button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
