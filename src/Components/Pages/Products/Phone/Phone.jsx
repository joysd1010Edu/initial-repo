import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import PhoneCard from "./PhoneCard";
import { FaHome } from "react-icons/fa";

const Phone = () => {
  const axiosPoint = useAxiosPublic();
  const location = useLocation();
  const [AllPhone, setPhone] = useState([]);
  const [UsePhone, setUsePhone] = useState([]);
  const [Range, setRange] = useState(0);
  const [MinPrice, setMinPrice] = useState(0);
  const [CurrentPage, setPage] = useState(1);
  const postPerPage = 12;
  const [filterState, setStateNumber] = useState(0);
  const [MaxPrice, setMaxPrice] = useState(0);

  const param = location.state;
  const setCurrentPost = () => {
    const start = (CurrentPage - 1) * postPerPage;
    const end = postPerPage * CurrentPage;

    console.log(start, end);
    setUsePhone(AllPhone.slice(start, end));
  };

  const handlePageChange = (newPage) => {
    console.log("this page", newPage);
    setPage(newPage);
  };

  useEffect(() => {
    console.log("Current page", CurrentPage);
    setCurrentPost();
  }, [CurrentPage]);

  const generatePageNumbers = (totalPages, currentPage) => {
    const pageNumbers = [];

    if (currentPage > 1) {
      pageNumbers.push(
        <button
          key="prev"
          onClick={() => handlePageChange(currentPage - 1)}
          className="prev-btn underline hover:text-red-600"
          disabled={currentPage === 1}
        >
          Previous
        </button>
      );
    } else {
      pageNumbers.push(
        <button key="prev" className="prev-btn btn-disabled text-gray-400">
          Previous
        </button>
      );
    }

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={
            i === currentPage
              ? "active text-white px-3 bg-red-600 rounded-md"
              : ""
          }
          disabled={i === currentPage}
        >
          {i}
        </button>
      );
    }

    if (currentPage < totalPages) {
      pageNumbers.push(
        <button
          key="next"
          onClick={() => {
            let pageNow = CurrentPage + 1;
            handlePageChange(pageNow);
          }}
          className="next-btn underline hover:text-red-600"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      );
    } else {
      pageNumbers.push(
        <button key="next" className="next-btn btn-disabled text-gray-400">
          Next
        </button>
      );
    }

    return pageNumbers;
  };
  const getAllPhone = async () => {
    try {
      const response = await axiosPoint.get("/phone");

      setPhone(response.data);
      setUsePhone(response.data.slice(0, 12));
      setMinPrice(
        Math.min(...response.data.map((item) => item.price.discountPrice))
      );
      setMaxPrice(
        Math.max(...response.data.map((item) => item.price.discountPrice))
      );
    } catch (error) {
      console.error("Error fetching laptop data:", error);
    }
  };

  const getPhoneByBrand = async (parameter) => {
    try {
      const response = await axiosPoint.get(`/phone/${parameter}`);
      console.log(response.data);
      setPhone(response.data);
      setUsePhone(response.data.slice(0, 12));
      setMinPrice(
        Math.min(...response.data.map((item) => item.price.discountPrice))
      );
      setMaxPrice(
        Math.max(...response.data.map((item) => item.price.discountPrice))
      );
    } catch (error) {
      console.error("Error fetching laptop data:", error);
    }
  };
  //------------------------Price filter-----------------
  const handleOnchange = (value) => {
    setRange(value);
    setUsePhone(
      AllPhone.filter((item) => item.price.discountPrice <= value).slice(0, 12)
    );
  };

  const handleChip = (e,container, attribute, value) => {
    if (e.target.checked) {
      setStateNumber(filterState + 1);
    const filter = AllPhone.filter((item) =>
      item[container][attribute].includes(value)
    );
    setUsePhone([...filter]);}
     else{setStateNumber(filterState - 1);
      setUsePhone(AllPhone);
      console.log(filterState);}
  };
  //-------------------------UserDefinedFilter--------------------
  const HandleChoice = (e, container, attribute, value) => {
    console.log(e.target.checked);

    if (e.target.checked) {
      setStateNumber(filterState + 1);
      const filteredArray = AllPhone.filter(
        (item) => item[container][attribute] == value
      );
      setUsePhone([...filteredArray]);
      console.log(filterState);
    } else {
      setStateNumber(filterState - 1);
      setUsePhone(AllPhone);
      console.log(filterState);
    }
  };

  useEffect(() => {
    console.log(filterState);
    setStateNumber(filterState);
  }, [filterState]);
  //-------------------------Shorting------------------------------------

  const handleSortByPrice = async (event) => {
    const sortBy = parseInt(event.target.value);

    switch (sortBy) {
      case 2:
        const sortedByPriceAsc = await shortingAsc(UsePhone);
        setUsePhone(sortedByPriceAsc);
        break;
      case 3:
        const sortedByPriceDesc = shortingDesc(UsePhone);
        setUsePhone(sortedByPriceDesc);
        break;
      default:
        break;
    }
  };

  const shortingAsc = async (laptop) => {
    const filterPhone = [...laptop].sort(
      (a, b) => a.price.discountPrice - b.price.discountPrice
    );
    return filterPhone;
  };

  const shortingDesc = (laptop) => {
    const filterPhone = [...laptop].sort(
      (a, b) => b.price.discountPrice - a.price.discountPrice
    );
    return filterPhone;
  };

  //-----------------------fetching data-------------------------
  useEffect(() => {
    if (param === "All") {
      getAllPhone();
    } else {
      getPhoneByBrand(param);
    }
    setCurrentPost();
  }, [param]);

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
            <h1> {Range == 0 ? "Set Range" : "Under"}</h1>
            <hr className="mx-2/3" />
            <h1> {Range}</h1>{" "}
          </div>
        </div>

        {/*-----------------------------Processor Filter---------------------------------- */}
        <div className=" bg-white rounded-md ">
          <h1 className=" text-lg font-medium py-2 px-5 "> Processor</h1>
          <hr />
          <div className="px-5 py-2 flex flex-col gap-2">
            <label
              className="flex hover:cursor-pointer gap-2 hover:bg-indigo-50 p-1 rounded-sm"
              htmlFor="core1"
            >
              <input
                type="checkbox"
                onChange={(e) =>
                  handleChip(e,
                    "keyFeatures",
                    "processorChipsetName",
                    "Snapdragon"
                  )
                }
                className="w-5    "
                value=""
                id="core1"
              />{" "}
              <p> Snapdragon</p>
            </label>
            <label
              className="flex hover:cursor-pointer gap-2 hover:bg-indigo-50 p-1 rounded-sm"
              htmlFor="core2"
            >
              <input
                type="checkbox"
                onChange={(e) =>
                  handleChip(e,"keyFeatures", "processorChipsetName", "Helio")
                }
                className="w-5    "
                value=""
                id="core2"
              />{" "}
              <p> MediaTech Helio</p>
            </label>
            <label
              className="flex hover:cursor-pointer gap-2 hover:bg-indigo-50 p-1 rounded-sm"
              htmlFor="core3"
            >
              <input
                type="checkbox"
                onChange={(e) =>
                  handleChip(e,"keyFeatures", "processorChipsetName", "Bionic")
                }
                className="w-5    "
                value=""
                id="core3"
              />{" "}
              <p> Apple Bionic</p>
            </label>
            <label
              className="flex hover:cursor-pointer gap-2 hover:bg-indigo-50 p-1 rounded-sm"
              htmlFor="core5"
            >
              <input
                type="checkbox"
                onChange={(e) =>
                  handleChip(e,"keyFeatures", "processorChipsetName", "Kirin")
                }
                className="w-5    "
                value=""
                id="core5"
              />{" "}
              <p>Huawei Kirin</p>
            </label>
            <label
              className="flex hover:cursor-pointer gap-2 hover:bg-indigo-50 p-1 rounded-sm"
              htmlFor="core7"
            >
              <input
                type="checkbox"
                onChange={(e) =>
                  handleChip(e,"keyFeatures", "processorChipsetName", "Dimensity")
                }
                className="w-5    "
                value=""
                id="core7"
              />{" "}
              <p> MediaTek Dimensity</p>
            </label>
            <label
              className="flex hover:cursor-pointer gap-2 hover:bg-indigo-50 p-1 rounded-sm"
              htmlFor="core6"
            >
              <input
                type="checkbox"
                onChange={(e) =>
                  handleChip(e,"keyFeatures", "processorChipsetName", "Exynos")
                }
                className="w-5    "
                value=""
                id="core6"
              />{" "}
              <p> Samsung Exynos</p>
            </label>
          </div>
        </div>
        {/* ------------------------------Ram core------------------------ */}
        <div className=" bg-white rounded-md ">
          <h1 className=" text-lg font-medium py-2 px-5 "> Ram Size</h1>
          <hr />
          <div className="px-5 py-2 flex flex-col gap-2">
            <label
              className="flex hover:cursor-pointer gap-2 hover:bg-indigo-50 p-1 rounded-sm"
              htmlFor="Ram1"
            >
              <input
                type="checkbox"
                onChange={(e) => HandleChoice(e,"keyFeatures", "ramSize", "4GB")}
                className="w-5    "
                value=""
                id="Ram1"
              />{" "}
              <p> 4 GB</p>
            </label>
            <label
              className="flex hover:cursor-pointer gap-2 hover:bg-indigo-50 p-1 rounded-sm"
              htmlFor="Ram2"
            >
              <input
                type="checkbox"
                onChange={(e) => HandleChoice(e,"keyFeatures", "ramSize", "6GB")}
                className="w-5    "
                value=""
                id="Ram2"
              />{" "}
              <p> 6 GB</p>
            </label>
            <label
              className="flex hover:cursor-pointer gap-2 hover:bg-indigo-50 p-1 rounded-sm"
              htmlFor="Ram3"
            >
              <input
                type="checkbox"
                onChange={(e) => HandleChoice(e,"keyFeatures", "ramSize", "8GB")}
                className="w-5    "
                value=""
                id="Ram3"
              />{" "}
              <p> 8 GB</p>
            </label>
            <label
              className="flex hover:cursor-pointer gap-2 hover:bg-indigo-50 p-1 rounded-sm"
              htmlFor="Ram5"
            >
              <input
                type="checkbox"
                onChange={(e) => HandleChoice(e,"keyFeatures", "ramSize", "12GB")}
                className="w-5    "
                value=""
                id="Ram5"
              />{" "}
              <p>12 GB</p>
            </label>
            <label
              className="flex hover:cursor-pointer gap-2 hover:bg-indigo-50 p-1 rounded-sm"
              htmlFor="Ram7"
            >
              <input
                type="checkbox"
                onChange={(e) => HandleChoice(e,"keyFeatures", "ramSize", "16GB")}
                className="w-5    "
                value=""
                id="Ram7"
              />{" "}
              <p> 16 GB</p>
            </label>
          </div>
        </div>
        {/*--------------------------------Rom select------------------------------------  */}
        <div className=" bg-white rounded-md ">
          <h1 className=" text-lg font-medium py-2 px-5 "> Rom Size</h1>
          <hr />
          <div className="px-5 py-2 flex flex-col gap-2">
            <label
              className="flex hover:cursor-pointer gap-2 hover:bg-indigo-50 p-1 rounded-sm"
              htmlFor="ROM1"
            >
              <input
                type="checkbox"
                onChange={(e) => HandleChoice(e,"keyFeatures", "romSize", "64GB")}
                className="w-5    "
                value=""
                id="ROM1"
              />{" "}
              <p> 64 GB</p>
            </label>
            <label
              className="flex hover:cursor-pointer gap-2 hover:bg-indigo-50 p-1 rounded-sm"
              htmlFor="ROM2"
            >
              <input
                type="checkbox"
                onChange={(e) => HandleChoice(e,"keyFeatures", "romSize", "128GB")}
                className="w-5    "
                value=""
                id="ROM2"
              />{" "}
              <p> 128 GB</p>
            </label>
            <label
              className="flex hover:cursor-pointer gap-2 hover:bg-indigo-50 p-1 rounded-sm"
              htmlFor="ROM3"
            >
              <input
                type="checkbox"
                onChange={(e) => HandleChoice(e,"keyFeatures", "romSize", "256GB")}
                className="w-5    "
                value=""
                id="ROM3"
              />{" "}
              <p> 256 GB</p>
            </label>
            <label
              className="flex hover:cursor-pointer gap-2 hover:bg-indigo-50 p-1 rounded-sm"
              htmlFor="ROM5"
            >
              <input
                type="checkbox"
                onChange={(e) => HandleChoice(e,"keyFeatures", "romSize", "512GB")}
                className="w-5    "
                value=""
                id="ROM5"
              />{" "}
              <p>512 GB</p>
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
                onChange={handleSortByPrice}
                className="bg-slate-200 w-42 rounded-md px-3 py-2 outline-none"
              >
                <option value="1">Default</option>
                <option value="2">Price (low to high)</option>
                <option value="3"> Price (high to low)</option>
              </select>
            </div>
          </div>
        </div>
        {UsePhone?.length > 0 ? (
          <div className=" grid grid-cols-4 gap-3 pt-2 ">
            {UsePhone.map((item) => (
              <PhoneCard key={item._id} state={item} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-md my-2 mx-auto ">
            {" "}
            <h1 className="text-3xl text-center py-10 font-semibold text-gray-600">
              Looking For your Phone
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
        {filterState == 0
            ? generatePageNumbers(
                Math.ceil(AllPhone.length / postPerPage),
                CurrentPage
              )
            : generatePageNumbers(
                Math.ceil(UsePhone.length / postPerPage),
                CurrentPage
              )}
        </div>
      </div>
    </div>
  );
};

export default Phone;
