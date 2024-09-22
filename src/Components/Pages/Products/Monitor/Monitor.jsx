import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { GrChapterNext, GrChapterPrevious } from "react-icons/gr";

import MonitorCard from "./MonitorCard";
import { FaHome } from "react-icons/fa";
import useScrollOnTOp from "../../../Hooks/useScrollOnTOp";

const Monitor = () => {
  useScrollOnTOp('monitor')
  const axiosPoint = useAxiosPublic();
  const location = useLocation();
  const param = location.state;
  const [data, setData] = useState([]);
  const [MinPrice, setMinPrice] = useState(0);
  const [MaxPrice, setMaxPrice] = useState(0);
  const [Panel, setPanel] = useState([]);
  const [resolution, setResolution] = useState([]);
  const [RefreshRate, setRefreshRate] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setToatlPage] = useState(0);
  const [sort, setSort] = useState("");
  const [Price, setPrice] = useState(9999999999);
  let pageNumber = [];
  for (let i = 1; i <= totalPage; i++) {
    pageNumber.push(i);
  }


  const getAllMovies = async () => {
    try {
      const url = `/monitor/get?page=${page}&display.refreshRate=${RefreshRate.toString()}&display.type=${Panel.toString()}&price=${Price}&key.brand=${param}&display.resolution=${resolution.toString()}&sortBy=${sort}`;
      const response = await axiosPoint.get(url);
      const resData = response.data;
      // ---------------------------setting all data ----------------------------------
      setData(resData.monitors);
      setMaxPrice(resData.maxDiscountPrice);
      setMinPrice(resData.minDiscountPrice);
      setToatlPage(resData.totalpage);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(()=>{

    setPage(1)
getAllMovies()
  },[param])

  useEffect(() => {
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
    getAllMovies();
    
  }, [page, RefreshRate, Panel, resolution, param, Price, sort]);

  console.log(data);

  //-------------------------Price setting ------------------------------------
  const handleOnchange = (value) => {
    setPrice(value);
  };
  //-----------------------resolution filtering data-------------------------
  const filterByRes = (e, value) => {
    if (e.target.checked) {
      setResolution([...resolution, value]);
    } else {
      const tempArray = resolution?.filter((item) => item != value);
      setResolution([...tempArray]);
    }
    setPage(1)
  };
  //------------------------Panel type sorting ------------------------------
  const filterByPanel = (e, value) => {
    if (e.target.checked) {
      setPanel([...Panel, value]);
    } else {
      const tempArray = Panel?.filter((item) => item != value);
      setPanel([...tempArray]);
    }
    setPage(1)
  };
  //--------------------------Filter by refreshRate ---------------------------------
  const filterByRefresh = (e, value) => {
    if (e.target.checked) {
      setRefreshRate([...RefreshRate, value]);
    } else {
      const tempArray = RefreshRate?.filter((item) => item != value);
      setRefreshRate([...tempArray]);
    }
    setPage(1)
  };
  // ------------------------------sorting based on price----------------------------------
  const handleSortByPrice = (selectedValue) => {
    setSort(selectedValue);
  };

  return (
    <div className="bg-indigo-100 px-10 py-5 grid grid-cols-5 gap-2">
      <div className=" flex flex-col gap-2">
        {/*-------------------------- Price range adjuster-------------------------------- Intel*/}

        <div className=" bg-white rounded-md">
          <h1 className=" text-lg font-medium py-2 px-5 "> Price Range</h1>
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

        {/*-----------------------------resolution Filter---------------------------------- */}
        <div className=" bg-white rounded-md ">
          <h1 className=" text-lg font-medium py-2 px-5 "> Resolution</h1>
          <hr />
          <div className="px-5 py-2 flex flex-col gap-2">
            <label
              className="flex hover:cursor-pointer gap-2 hover:bg-indigo-50 p-1 rounded-sm"
              htmlFor="pexel1"
            >
              <input
                type="checkbox"
                onChange={(e) => filterByRes(e, "1920x1080")}
                className="w-5    "
                value=""
                id="pexel1"
              />{" "}
              <p> FHD</p>
            </label>
            <label
              className="flex hover:cursor-pointer gap-2 hover:bg-indigo-50 p-1 rounded-sm"
              htmlFor="pexel2"
            >
              <input
                type="checkbox"
                onChange={(e) => filterByRes(e, "2560x1440")}
                className="w-5"
                value=""
                id="pexel2"
              />{" "}
              <p> QHD</p>
            </label>
            <label
              className="flex hover:cursor-pointer gap-2 hover:bg-indigo-50 p-1 rounded-sm"
              htmlFor="pexel3"
            >
              <input
                type="checkbox"
                onChange={(e) => filterByRes(e, "3840x2160")}
                className="w-5"
                value=""
                id="pexel3"
              />{" "}
              <p> 4K</p>
            </label>
          </div>
        </div>
        {/* ------------------------------Panel type------------------------ */}
        <div className=" bg-white rounded-md ">
          <h1 className=" text-lg font-medium py-2 px-5 "> Panel Type</h1>
          <hr />
          <div className="px-5 py-2 flex flex-col gap-2">
            <label
              className="flex hover:cursor-pointer gap-2 hover:bg-indigo-50 p-1 rounded-sm"
              htmlFor="core1"
            >
              <input
                type="checkbox"
                onChange={(e) => filterByPanel(e, "VA")}
                className="w-5  "
                value=""
                id="core1"
              />{" "}
              <p> VA Panel</p>
            </label>
            <label
              className="flex hover:cursor-pointer gap-2 hover:bg-indigo-50 p-1 rounded-sm"
              htmlFor="core2"
            >
              <input
                type="checkbox"
                onChange={(e) => filterByPanel(e, "IPS")}
                className="w-5"
                value=""
                id="core2"
              />{" "}
              <p> IPS</p>
            </label>
            <label
              className="flex hover:cursor-pointer gap-2 hover:bg-indigo-50 p-1 rounded-sm"
              htmlFor="core3"
            >
              <input
                type="checkbox"
                onChange={(e) => filterByPanel(e, "TN")}
                className="w-5"
                value=""
                id="core3"
              />{" "}
              <p> TN</p>
            </label>
            <label
              className="flex hover:cursor-pointer gap-2 hover:bg-indigo-50 p-1 rounded-sm"
              htmlFor="core4"
            >
              <input
                type="checkbox"
                onChange={(e) => filterByPanel(e, "QLED")}
                className="w-5"
                value=""
                id="core4"
              />{" "}
              <p> QLED</p>
            </label>
          </div>
        </div>
        {/*-----------------------------Refresh Rate---------------------------------- */}
        <div className=" bg-white rounded-md ">
          <h1 className=" text-lg font-medium py-2 px-5 "> Refresh Rate</h1>
          <hr />
          <div className="px-5 py-2 flex flex-col gap-2">
            <label
              className="flex hover:cursor-pointer gap-2 hover:bg-indigo-50 p-1 rounded-sm"
              htmlFor="refresh1"
            >
              <input
                type="checkbox"
                onChange={(e) => filterByRefresh(e, "60Hz")}
                className="w-5    "
                value=""
                id="refresh1"
              />{" "}
              <p> 60 Hz</p>
            </label>
            <label
              className="flex hover:cursor-pointer gap-2 hover:bg-indigo-50 p-1 rounded-sm"
              htmlFor="refresh2"
            >
              <input
                type="checkbox"
                onChange={(e) => filterByRefresh(e, "75Hz")}
                className="w-5"
                value=""
                id="refresh2"
              />{" "}
              <p> 75 Hz</p>
            </label>
            <label
              className="flex hover:cursor-pointer gap-2 hover:bg-indigo-50 p-1 rounded-sm"
              htmlFor="refresh3"
            >
              <input
                type="checkbox"
                onChange={(e) => filterByRefresh(e, "144Hz")}
                className="w-5"
                value=""
                id="refresh3"
              />{" "}
              <p> 144 Hz</p>
            </label>
            <label
              className="flex hover:cursor-pointer gap-2 hover:bg-indigo-50 p-1 rounded-sm"
              htmlFor="refresh4"
            >
              <input
                type="checkbox"
                onChange={(e) => filterByRefresh(e, "165Hz")}
                className="w-5"
                value=""
                id="refresh4"
              />{" "}
              <p> 165 Hz</p>
            </label>
            <label
              className="flex hover:cursor-pointer gap-2 hover:bg-indigo-50 p-1 rounded-sm"
              htmlFor="refresh5"
            >
              <input
                type="checkbox"
                onChange={(e) => filterByRefresh(e, "240Hz")}
                className="w-5"
                value=""
                id="refresh5"
              />{" "}
              <p> 240 Hz</p>
            </label>
          </div>
        </div>
      </div>
      <div className=" col-span-4 ">
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
                className="bg-slate-200 w-42 rounded-md px-3 py-2 outline-none"
              >
                <option value="1">Default</option>
                <option value="discountAsc">Price (low to high)</option>
                <option value="discountDesc"> Price (high to low)</option>
              </select>
            </div>
          </div>
        </div>
        {data?.length > 0 ? (
          <div className=" grid grid-cols-4 gap-3 pt-2 ">
            {data.map((item) => (
              <MonitorCard key={item._id} state={item} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-md my-2 mx-auto ">
            {" "}
            <h1 className="text-3xl text-center py-10 font-semibold text-gray-600">
              Looking For your Monitor
            </h1>{" "}
            <hr className=" border-2" />{" "}
            <img
              className="mx-auto w-1/4"
              src="https://i.postimg.cc/kXqSBhC4/Untitleddesign-ezgif-com-optimize-1.gif"
              alt=""
            />
          </div>
        )}

        <div className="pagination flex gap-6 py-6 ">
          <button onClick={()=>setPage(page-1)} className={`flex ${page<=1?'btn-disabled text-gray-500':'cursor-pointer font-bold hover:text-red-600 underline'} items-center gap-1 `} ><GrChapterPrevious />Prev</button>
          {
            pageNumber.map(pa=><button onClick={()=>setPage(pa)} className={`flex ${pa==page?'px-3 bg-red-600 text-white rounded-md':'font-bold underline px-3'} items-center gap-1 `}>{pa}</button>)
          }
          <div  onClick={()=>{setPage(page+1)}} className={`flex ${page>=totalPage?'btn-disabled text-gray-500':'cursor-pointer font-bold hover:text-red-600 underline'} items-center gap-1 `}>Next<GrChapterNext /></div>

        </div>
      </div>
    </div>
  );
};

export default Monitor;
