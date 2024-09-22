import React from "react";
import { FaCartPlus } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import { Link } from "react-router-dom";

const GpuCard = ({ state }) => {
  const {
    price,
    name,
    memoryType,
    memoryClock,
    memorySize,
    memoryInterface,
    coreClockSpeed,
  } = state.keyFeatures;
  const { specialFeatures } = state.display;

const getRandomIndex = (max) => Math.floor(Math.random() * max);
const getRandomData = () => {
  const randomIndex = getRandomIndex(state.images.length);
  return state.images[randomIndex];
};
const image = getRandomData();
 
  return (
    <div className=" bg-white flex flex-col justify-between rounded-md px-3">
      <div className=" my-5 w-full mx-auto overflow-hidden">
        <img
          src={image}
          alt="drive image "
          className="transition  duration-300 ease-in-out hover:scale-110"
        />
      </div>
      <div>
        <hr className=" " />
        <Link to={`/gpuID/${state._id}`}>
          <h1 className=" font-extrabold py-2 text-sm hover:underline hover:text-red-600 duration-200">
            {name} {memorySize}GB {memoryType} Graphics Card
          </h1>
        </Link>
      </div>
      <div className=" flex flex-col gap-2 pt-2 pb-4 text-sm text-[#666767]">
        <div className=" flex gap-2 items-center">
          <p className="text-xs">■</p>{" "}
          <h1>
            {" "}
            Core Clock :{" "}
            {coreClockSpeed}
          </h1>
        </div>
        <div className=" flex gap-2 items-center">
          <p className="text-xs">■</p>
          <h1>
            {" "}
            Memory Clock : {memoryClock}
          </h1>
        </div>
        <div className=" flex gap-2 items-center">
          <p className="text-xs">■</p>{" "}
          <h1>
            Memory Interface :{" "}
            {memoryInterface}
          </h1>
        </div>
        <div className=" flex gap-2 items-center">
          <p className="text-xs">■</p>{" "}
          <h1>
            Features:{" "}
            {specialFeatures.map((feature, index) => (
              <span key={index}>
                {feature}
                {index < specialFeatures.length - 1 ? ", " : ""}
              </span>
            ))}
          </h1>
        </div>
      </div>
      <div className="py-5">
        <hr />
        <h1 className=" text-xl text-center font-extrabold py-3  text-[#F04B22]">
          {price.discount} $
        </h1>
        <div  className=" flex gap-2 md:px-14 px-8 text-sm py-2 rounded-md cursor-pointer text-blue-700 hover:text-white hover:bg-blue-700 transition duration-500 bg-indigo-50">
          <IoMdCart size={20} /> <h1> Buy Now</h1>
        </div>
        <div className=" flex gap-2 md:px-12 px-7 text-sm py-2 rounded-md mt-2 text-[#535656] cursor-pointer hover:bg-slate-300 duration-500 ">
          <FaCartPlus size={20} /> <h1> Add to Cart</h1>
        </div>
      </div>
    </div>
  );
};

export default GpuCard;
