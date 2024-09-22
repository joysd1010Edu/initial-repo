import React from "react";
import { FaCartPlus } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import { Link } from "react-router-dom";

const GpuCard = ({ state }) => {
  const {
    
    modelName,brand,
    ramSize,romSize,
    batterySize,rearCameraSpecification,
    displayQuality,frontCameraSpecification,
    processorChipsetSize,
    processorChipsetName,
  } = state.keyFeatures;
  const { size } = state.displayInfo;
  const { chargerType } = state.battery;
  const { romType } = state.memory;

   const getRandomIndex = (max) => Math.floor(Math.random() * max);
  const getRandomData = () => {
    const randomIndex = getRandomIndex(state.image.length);
    return state.image[randomIndex];
  };
  const image = getRandomData();
  //const image = "https://www.netnest.com.au/Content/Images/MF-SM-S911BLIEATS.jpg";
  return (
    <div className=" bg-white flex flex-col justify-between rounded-md px-3">
      <div className=" my-5 w-full mx-auto overflow-hidden">
        <img
          src={image}
          alt="drive image "
          className="transition duration-300 ease-in-out hover:scale-110"
        />
      </div>
      <div>
        <hr className=" " />
        <Link to={`/gpuID/${state._id}`}>
          <h1 className=" font-extrabold py-2 text-sm hover:underline hover:text-red-600 duration-200">
            {brand} {modelName} ({ramSize}/{romSize})  
          </h1>
        </Link>
      </div>
      <div className=" flex flex-col gap-2 pt-2 pb-4 text-sm text-[#666767]">
        <div className=" flex gap-2 items-center">
          <p className="text-xs">■</p>{" "}
          <h1>
            {" "}
            Display :{" "}
            {size} {' '}{displayQuality}
          </h1>
        </div>
        <div className=" flex gap-2 items-center">
          <p className="text-xs">■</p>
          <h1>
            {" "}
            Processor : {processorChipsetName} ({processorChipsetSize})
          </h1>
        </div>
        <div className=" flex gap-2 items-center">
          <p className="text-xs">■</p>{" "}
          <h1>
            Camera :{" "}
            {rearCameraSpecification} at rear  / {frontCameraSpecification}
          </h1>
        </div>
        <div className=" flex gap-2 items-center">
          <p className="text-xs">■</p>{" "}
          <h1>
            Features:{" "}
            {batterySize},{chargerType},{romType}
          </h1>
        </div>
      </div>
      <div className="py-5">
        <hr />
        <h1 className=" text-xl text-center font-extrabold py-3  text-[#F04B22]">
          {state.price.discountPrice} $
        </h1>
        <div className=" flex gap-2 px-16 text-sm py-2 rounded-md  text-blue-700 hover:text-white hover:bg-blue-700 transition duration-500 bg-indigo-50">
          <IoMdCart size={20} /> <h1> Buy Now</h1>
        </div>
        <div className=" flex gap-2 px-14 text-sm py-2 rounded-md mt-2 text-[#666767] hover:bg-slate-100 duration-500 ">
          <FaCartPlus size={20} /> <h1> Add to Cart</h1>
        </div>
      </div>
    </div>
  );
};

export default GpuCard;
