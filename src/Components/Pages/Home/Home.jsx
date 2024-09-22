import React, { useEffect, useRef, useState } from "react";
import Slider from "./Slider";
import Transition from "./Transition";
import GpuCard from "./../Products/GPU/GpuCard";
import RamCard from "./../Products/Ram/RamCard";
import useAxiosPublic from "./../../Hooks/useAxiosPublic";
import Timer from "./Timer";
import Category from "./Category";
import { useLocation, useNavigate } from "react-router-dom";
import { AiTwotoneThunderbolt } from "react-icons/ai";
import { MagnifyingGlass } from "react-loader-spinner";

// ================== to do ==================

// category linking
const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const axiosPoint = useAxiosPublic();
  const featuredref = useRef();
  const [UseGpu, setUseGpu] = useState([]);
  const [UseRam, setUseRam] = useState([]);
  const [UseHDD, setUseHDD] = useState([]);
  const [UseMouse, setUseMouse] = useState([]);
  const [Usekeyboard, setUsekeyboard] = useState([]);
  const customScroll = (targetY, steps, duration) => {
    const startY = window.scrollY;
    const distance = targetY - startY;
    let startTime;

    const scrollStep = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      window.scrollTo(0, startY + distance * progress);

      if (progress < 1) {
        requestAnimationFrame(scrollStep);
      }
    };

    requestAnimationFrame(scrollStep);
  };

  const scrol = () => {
    if (location.state === 1) {
      customScroll(featuredref.current.offsetTop, 50, 2000);
    }
  };
  useEffect(() => {
    const featuredData = async () => {
      try {
        const GpuResponse = await axiosPoint.get("/gpu");
        setUseGpu(GpuResponse.data.slice(0, 2));

        const RamResponse = await axiosPoint.get("/component/ram");
        setUseRam(RamResponse.data.slice(0, 2));

        console.log("ram:", UseRam, "gpu:", UseGpu);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    featuredData();
    scrol();
  }, []);

  return (
    <div className=" ">
      <div className="flex gap-2 flex-col md:flex-row mx-5">
        <div className="md:w-2/3">
          <Slider />
        </div>
        <div className=" w-full">
          <img
            className="h-52"
            src="https://img.freepik.com/premium-vector/cyber-monday-sale-banner-template_7087-895.jpg"
            alt=""
          />
          <h1 className="text-white mx-5 bg-blue-700 text-2xl text-center rounded-lg my-3 py-3 mr-4">
            -:Offers time left:-
          </h1>
          <Timer />
          <img
            className=" w-full md:w-[420px]"
            src="https://i.postimg.cc/pV3k6vvj/new-items.png"
            alt=""
          />
        </div>
      </div>
      <Transition />
      <Category />
      <div ref={featuredref} id="featured" className=" ">
        <div className="flex py-5 justify-around">
          <div className=" flex items-center gap-3 ">
            <div className="animate-pulse">
              <AiTwotoneThunderbolt color="red" size={50} />
            </div>

            <div className="text-center">
              <h1 className="text-4xl font-bold text-violet-900 ">
                Flash Sell
              </h1>
              <p className="text-xl text-red-600">Special deals</p>
            </div>
            <div className="animate-pulse">
              <AiTwotoneThunderbolt color="red" size={50} />
            </div>
          </div>
        </div>
        {UseGpu.length > 0 ? (
          <div className=" grid py-5 gap-10 md:grid-cols-4 px-5 md:px-20 bg-blue-100">
            {UseGpu?.map((item) => (
              <GpuCard key={item._id} state={item} />
            ))}
            {UseGpu?.map((item) => (
              <GpuCard key={item._id} state={item} />
            ))}
            {UseGpu?.map((item) => (
              <GpuCard key={item._id} state={item} />
            ))}
            {UseRam?.map((item) => (
              <RamCard key={item._id} state={item} />
            ))}
          </div>
        ) : (
          <div className=" flex justify-around">
            <MagnifyingGlass
              visible={true}
              height="180"
              width="280"
              ariaLabel="magnifying-glass-loading"
              wrapperStyle={{}}
              wrapperClass="magnifying-glass-wrapper"
              glassColor="#c0efff"
              color="#e15b64"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
