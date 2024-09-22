import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { GrChapterNext, GrChapterPrevious } from "react-icons/gr";
import { FaHome } from "react-icons/fa";
import GpuCard from "./GpuCard";
import { BiDotsVertical } from "react-icons/bi";
import { RxCross1 } from "react-icons/rx";

const Gpu = () => {
  const axiosPoint = useAxiosPublic();
  const location = useLocation();
  const [data, setData] = useState([]);
  const [MinPrice, setMinPrice] = useState(0);
  const [MaxPrice, setMaxPrice] = useState(0);

  const [Chip, setChip] = useState('');
  const [Size, setSize] = useState([]);
  const [type, setType] = useState([]);

  const param = location.state || "All";
  const gpuType = ["GDDR5", "GDDR6", "GDDR6X"];
  const gpuMemorySize = [4, 6, 8, 10, 12, 16, 24];
  const [sideMenu, setSideMenu] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPage, setToatlPage] = useState(0);
  const [sort, setSort] = useState("");
  const [Price, setPrice] = useState(9999999999);
  let pageNumber = [];
  for (let i = 1; i <= totalPage; i++) {
    pageNumber.push(i);
  }

  useEffect(() => {
    const getLaptops = async () => {
      try {
        const url = `/gpu/get?page=${page}&chip=${Chip.toString()}&size=${Size.toString()}&type=${type.toString()}&Brand=${param}&price=${Price}&sortBy=${sort}`;
        const response = await axiosPoint.get(url);
        const resData = response.data;
        
        // ---------------------------setting all data ----------------------------------
        setData(resData.GPUs);
        setMaxPrice(resData.maxDiscountPrice);
        setMinPrice(resData.minDiscountPrice);
        setToatlPage(resData.totalpage);
      } catch (err) {
        console.log(err);
      }
    };
    window.scrollTo({ top: 0, behavior: "smooth" });
    getLaptops();
  }, [page, Chip, type, Size, param, Price, sort]);

  //------------------------Price filter-----------------
  const handleOnchange = (value) => {
    setPrice(value);
  };
  //-----------------------------Finding the chipSet filtered gpu---------------------------------
  const handleChip = (value) => {
    setChip(value)
  };

  //-------------------------UserDefinedFilter--------------------

  const HandleChoice = (e, state, value) => {
    

    if (e.target.checked) {
      switch (state) {
        case "memorySize":
          setSize([...Size, value]);
          break;

        case "memoryType":
          setType([...type, value]);
          break;

        default:
          break;
      }
    } else {
      switch (state) {
        case "memorySize":
          const tempSize = Size.filter((val) => val !== value);
          setSize([...tempSize]);
          break;

        case "memoryType":
          const tempType = type.filter((val) => val !== value);
          setType([...tempType]);
          break;

        default:
          break;
      }
    }
  };

  //-------------------------Shorting------------------------------------

  const handleSortByPrice = (selectedValue) => {
    setSort(selectedValue);
  };

  //------------------------responsive filter menu handler -----------------
  const handleSideMenu = () => {
    setSideMenu(!sideMenu);
  };

  return (
    <div className="bg-indigo-100 px-5 md:px-10 py-5 grid md:grid-cols-5 gap-2">
      <div
        className={`flex absolute h-auto md:relative duration-300 flex-col gap-2 ${
          !sideMenu ? " -left-64 md:left-0" : " left-3"
        }`}
      >
        {/*-------------------------- Price range adjuster-------------------------------- Intel*/}

        <div className=" bg-white rounded-md">
          <h1 className=" text-lg font-medium py-2 px-5 text-center ">
            {" "}
            Price Range
          </h1>
          <hr />
          <div className="px-5 py-3">
            <div className=" flex justify-between px-2">
              <p>{MinPrice}$</p>
              <p>{MaxPrice}$</p>
            </div>
            <input
              onChange={(event) => handleOnchange(event.target.value)}
              type="range"
              min={MinPrice}
              max={MaxPrice}
              defaultValue={MaxPrice}
              className="range border-2 bg-white  range-error "
            />
          </div>

          <div className="px-5 pb-2 text-center">
            <h1> {Price > MaxPrice ? "Set Range under" : "Under"}</h1>
            <hr className="mx-2/3" />
            <h1>{Price > MaxPrice ? MaxPrice : Price} $</h1>
          </div>
        </div>

        {/*-----------------------------Chipset Filter---------------------------------- */}
        <div className=" bg-white rounded-md  ">
          <h1 className=" text-lg font-medium py-2 px-5 "> ChipSet</h1>
          <hr />
          <div className=" px-5 py-2 class-name flex-wrap flex gap-2">
            <button
              onClick={() => handleChip("NVIDIA")}
              className=" px-3  bg-blue-700 text-white btn btn-active hover:bg-blue-700 "
            >
              NVIDIA
            </button>
            <button
              onClick={() => handleChip("AMD")}
              className=" px-3 bg-red-600 text-white btn  hover:bg-red-600 "
            >
              AMD Radeon
            </button>
          </div>
        </div>
        {/* ------------------------------Memory size------------------------ */}
        <div className=" bg-white rounded-md ">
          <h1 className=" text-lg font-medium py-2 px-5 "> Memory Size</h1>
          <hr />
          <div className="px-5 py-2 flex flex-col gap-2">
            {gpuMemorySize.map((size) => {
              return (
                <label
                  key={size}
                  className="flex hover:cursor-pointer gap-2 hover:bg-indigo-50 p-1 rounded-sm"
                  htmlFor={size}
                >
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      HandleChoice(e, "memorySize", size)
                    }
                    className="w-5 "
                    id={size}
                  />{" "}
                  <p> {size} GB</p>
                </label>
              );
            })}
          </div>
        </div>

        {/*-----------------------------graphics---------------------------------- */}
        <div className=" bg-white rounded-md ">
          <h1 className=" text-lg font-medium py-2 px-5 "> Memory Type</h1>
          <hr />
          <div className="px-5 py-2 flex flex-col gap-2">
            {gpuType.map((type, index) => {
              return (
                <label
                  key={index}
                  className="flex hover:cursor-pointer gap-2 hover:bg-indigo-50 p-1 rounded-sm"
                  htmlFor={index}
                >
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      HandleChoice(e, "memoryType", type)
                    }
                    className="w-5 "
                    id={index}
                  />{" "}
                  <p> {type} </p>
                </label>
              );
            })}
          </div>
        </div>
      </div>

      {/* ---------------------Container -------------------------------- */}

      <div className=" col-span-4 ">
        {/* ---------------------- Container Header------------------------- */}
        <div className=" px-5 py-3 bg-white items-center  flex justify-between  rounded-md">
          <div className="font-semibold text-lg flex items-center gap-1">
            <Link to={"/"}>
              <FaHome />
            </Link>{" "}
            {location.pathname.toUpperCase()}/{param.toUpperCase()}
          </div>
          <div className=" flex items-center gap-2">
            <p className=" text-gray-500">Sort By : </p>{" "}
            <div>
              <select
                onChange={(event) => handleSortByPrice(event.target.value)}
                className="bg-slate-200 md:w-52 w-24 rounded-md px-3 py-2 outline-none"
              >
                <option value="1">Default</option>
                <option value="2">Price (low to high)</option>
                <option value="3"> Price (high to low)</option>
              </select>
            </div>
          </div>
          <div onClick={handleSideMenu} className=" md:hidden block ">
            {sideMenu ? <RxCross1 size={30} /> : <BiDotsVertical size={30} />}
          </div>
        </div>

        {/* ----------------------Gpu Card --------------------------------- */}

        {data?.length > 0 ? (
          <div className=" md:px-0 grid-cols-2 grid md:grid-cols-4 gap-3 pt-2 ">
            {data?.map((item) => (
              <GpuCard key={item._id} state={item} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-md my-2 mx-auto ">
            {" "}
            <h1 className="text-3xl text-center py-10 font-semibold text-gray-600">
              Looking For your Gpu
            </h1>{" "}
            <hr className=" border-2" />{" "}
            <img
              className="mx-auto w-1/4"
              src="https://i.postimg.cc/kXqSBhC4/Untitleddesign-ezgif-com-optimize-1.gif"
              alt=""
            />
          </div>
        )}

        {/* ----------------------Pagination --------------------------------- */}

        <div className="pagination flex gap-6 py-6 ">
          <button
            onClick={() => setPage(page - 1)}
            className={`flex ${
              page <= 1
                ? "btn-disabled text-gray-500"
                : "cursor-pointer font-bold hover:text-red-600 underline"
            } items-center gap-1 `}
          >
            <GrChapterPrevious />
            Prev
          </button>
          {pageNumber.map((pa, index) => (
            <button
              onClick={() => setPage(pa)}
              key={index}
              className={`flex ${
                pa == page
                  ? "px-3 bg-red-600 text-white rounded-md"
                  : "font-bold underline px-3"
              } items-center gap-1 `}
            >
              {pa}
            </button>
          ))}
          <div
            onClick={() => setPage(page + 1)}
            className={`flex ${
              page >= totalPage
                ? "btn-disabled text-gray-500"
                : "cursor-pointer font-bold hover:text-red-600 underline"
            } items-center gap-1 `}
          >
            Next
            <GrChapterNext />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gpu;
