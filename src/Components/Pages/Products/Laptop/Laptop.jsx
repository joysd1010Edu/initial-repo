import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import LapTopCard from "./LapTopCard";
import { FaHome } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { BiDotsVertical } from "react-icons/bi";
import { GrChapterNext, GrChapterPrevious } from "react-icons/gr";
import "./laptop.css";

const Laptop = () => {
  const axiosPoint = useAxiosPublic();
  const location = useLocation();
  const [sideMenu,setSideMenu]=useState(false)
  const param = location.state||'All';
  const [data, setData] = useState([]);
  const [MinPrice, setMinPrice] = useState(0);
  const [MaxPrice, setMaxPrice] = useState(0);

  const [Processor, setProcessor] = useState([]);
  const [Graphics, setGraphics] = useState([]);
  const [Core, setCore] = useState([]);

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
        const url = `/laptop/get?page=${page}&Processor=${Processor.toString()}&Graphics=${Graphics.toString()}&core=${Core.toString()}&Brand=${param}&price=${Price}&sortBy=${sort}`;
        const response = await axiosPoint.get(url);
        const resData = response.data;

        // ---------------------------setting all data ----------------------------------
        setData(resData.laptops);
        setMaxPrice(resData.maxDiscountPrice);
        setMinPrice(resData.minDiscountPrice);
        setToatlPage(resData.totalpage);
      } catch (err) {
        console.log(err);
      }
    };
    window.scrollTo({ top: 0, behavior: "smooth" });
    getLaptops();
  }, [page, Processor, Graphics, Core, param, Price, sort]);


  //-------------------------Price setting ------------------------------------
  const handleOnchange = (value) => {
    setPrice(value);
  };
  //-----------------------resolution filtering data-------------------------
  const HandleChoice = (e, state, value) => {
    if (e.target.checked) {
      switch (state) {
        case "processor":
          setProcessor([...Processor, value]);
          break;

        case "core":
          setCore([...Core, value]);
          break;

        case "graphics":
          setGraphics([...Graphics, value]);
          break;

        default:
          break;
      }
    } else {
      switch (state) {
        case "processor":
          const tempProcessor = Processor.filter((val) => val !== value);
          setProcessor([...tempProcessor]);
          break;

        case "core":
          const tempCore = Core.filter((val) => val !== value);
          setCore([...tempCore]);
          break;

        case "graphics":
          const tenpGpu = Graphics.filter((val) => val !== value);
          setGraphics(tenpGpu);
          break;

        default:
          break;
      }
    }
  };

  

  const handleSideMenu=()=>{
    setSideMenu(!sideMenu)
  }

  // ------------------------------sorting based on price----------------------------------
  const handleSortByPrice = (selectedValue) => {
    setSort(selectedValue);
  };



  return (
    <div className="bg-indigo-100 px-5 md:px-10 py-5 grid md:grid-cols-5 gap-2">
      <div className={`flex absolute h-auto md:relative duration-300 flex-col gap-2 ${!sideMenu?" -left-52 md:left-0":" left-3"}`}>
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

        {/*-----------------------------Processor Filter---------------------------------- */}
        <div className=" bg-white rounded-md ">
          <h1 className=" text-lg font-medium py-2 px-5 "> Processor</h1>
          <hr />
          <div className=" px-5 py-2 class-name">
            <label
              className="flex hover:cursor-pointer gap-2 hover:bg-indigo-50 p-1 rounded-sm"
              htmlFor="Process"
            >
              <input
                type="checkbox"
                onChange={(e) => HandleChoice(e, "processor", "Intel")}
                className="w-5    "
                value=""
                id="Process"
              />{" "}
              <p> Intel</p>
            </label>
            <label
              className="flex hover:cursor-pointer gap-2 hover:bg-indigo-50 p-1 rounded-sm"
              htmlFor="Process2"
            >
              <input
                type="checkbox"
                onChange={(e) => HandleChoice(e, "processor", "AMD")}
                className="w-5 custom-checkbox"
                value=""
                id="Process2"
              />{" "}
              <p> AMD</p>
            </label>
          </div>
        </div>
        {/* ------------------------------Processor core------------------------ */}
        <div className=" bg-white rounded-md ">
          <h1 className=" text-lg font-medium py-2 px-5 "> Number of Core</h1>
          <hr />
          <div className="px-5 py-2 flex flex-col gap-2">
            <label
              className="flex hover:cursor-pointer gap-2 hover:bg-indigo-50 p-1 rounded-sm"
              htmlFor="core1"
            >
              <input
                type="checkbox"
                onChange={(e) => HandleChoice(e, "core", 4)}
                className="w-5    "
                value=""
                id="core1"
              />{" "}
              <p> 4</p>
            </label>
            <label
              className="flex hover:cursor-pointer gap-2 hover:bg-indigo-50 p-1 rounded-sm"
              htmlFor="core2"
            >
              <input
                type="checkbox"
                onChange={(e) => HandleChoice(e, "core", 6)}
                className="w-5"
                value=""
                id="core2"
              />{" "}
              <p> 6</p>
            </label>
            <label
              className="flex hover:cursor-pointer gap-2 hover:bg-indigo-50 p-1 rounded-sm"
              htmlFor="core3"
            >
              <input
                type="checkbox"
                onChange={(e) => HandleChoice(e, "core", 8)}
                className="w-5"
                value=""
                id="core3"
              />{" "}
              <p> 8</p>
            </label>
          </div>
        </div>

        {/*-----------------------------graphics---------------------------------- */}
        <div className=" bg-white rounded-md ">
          <h1 className=" text-lg font-medium py-2 px-5 "> Graphics</h1>
          <hr />
          <div className=" px-5 py-2 class-name flex flex-col gap-4">
            <label
              className="flex hover:cursor-pointer gap-2 hover:bg-indigo-50 p-1 rounded-sm"
              htmlFor="gpu1"
            >
              <input
                type="checkbox"
                onChange={(e) => HandleChoice(e, "graphics", "Intel")}
                className="w-5    "
                value=""
                id="gpu1"
              />{" "}
              <p> Intel Irish</p>
            </label>
            <label
              className="flex hover:cursor-pointer gap-2 hover:bg-indigo-50 p-1 rounded-sm"
              htmlFor="gpu2"
            >
              <input
                type="checkbox"
                onChange={(e) => HandleChoice(e, "graphics", "Nvidia")}
                className="w-5 "
                value=""
                style={{ backgroundColor: "white" }}
                id="gpu2"
              />{" "}
              <p>NVIDIA</p>
            </label>
            <label
              className="flex hover:cursor-pointer gap-2 hover:bg-indigo-50 p-1 rounded-sm"
              htmlFor="gpu3"
            >
              <input
                type="checkbox"
                onChange={(e) => HandleChoice(e, "graphics", "AMD")}
                className="w-5    "
                value=""
                id="gpu3"
              />{" "}
              <p> AMD Radeon</p>
            </label>
          </div>
        </div>
      </div>

      <div className=" col-span-4 ">
        <div className=" px-2 md:px-5 py-3 bg-white items-center  flex justify-between  rounded-md">
          <div className="font-semibold text-lg flex items-center gap-1">
            <Link to={"/"}>
              <FaHome />
            </Link>{" "}
            {location?.pathname?.toUpperCase()}/{param?.toUpperCase()}
          </div>
          <div className=" flex items-center gap-2">
            <p className=" text-gray-500">Sort By : </p>{" "}
            <div>
              <select
                onChange={(event) => handleSortByPrice(event.target.value)}
                className="bg-slate-200 md:w-52 w-24 rounded-md px-3 py-2 outline-none"
              >
                <option value="1">Default</option>
                <option value="discountAsc">Price (low to high)</option>
                <option value="discountDesc"> Price (high to low)</option>
              </select>
            </div>
          </div>
          <div onClick={handleSideMenu} className=" md:hidden block ">
          {sideMenu?<RxCross1   size={30}/>:
            <BiDotsVertical  size={30}/>
          }
          </div>
        </div>
        {data?.length > 0 ? (
          <div className=" md:px-0 grid-cols-2 grid md:grid-cols-4 gap-3 pt-2 ">
            {data.map((item) => (
              <LapTopCard key={item._id} state={item} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-md my-2 mx-auto ">
            {" "}
            <h1 className="text-3xl text-center py-10 font-semibold text-gray-600">
              Looking For your Laptop
            </h1>{" "}
            <hr className=" border-2" />{" "}
            <img
              className="mx-auto w2/3 md:w-1/4"
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
          {pageNumber.map((pa) => (
            <button
              onClick={() => setPage(pa)}
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

export default Laptop;
