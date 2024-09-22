import React, { useEffect, useRef, useState } from "react";
import { Link, useLoaderData, useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { RiMessage2Fill } from "react-icons/ri";
import Swal from "sweetalert2";
import { FaArrowUp } from "react-icons/fa";
import useAuth from "../../../Hooks/useAuth";
import useQNA from "../../../Hooks/useQNA";
import AddReview from "./../../../Hooks/AddReview";

const DetailPage = () => {
  const laptop = useLoaderData();
  const location=useLocation()
  // --------------------------------------------declaring all  the variables and functions---------------------------
  const {
    specialFeatures,
    discountedPrice,
    emiPrice,
    regularPrice,
    
    ram,
    brand,
    generation,
    display,
    cache,
    modelname,
  } = laptop?.keyFeatures;

  const { model, clockSpeed, core, thread } = laptop?.processor;
  const { size, resolution, displayFeatures } = laptop?.display;
  const {
    ramSize,
    ramFrequency,
    ramType,
    totalRamSlots,
    maxRamCapacity,
    storageType,
    storageSize,
    ssdSlot,
    extraSsdSlot,
    readSpeed,
    writeSpeed,
  } = laptop?.memory;
  const { memorySize, memoryType } = laptop?.graphics;
  const { keyboardFeatures, touchpadFeatures } = laptop?.keyboard;
  const { webcamFeature, audioFeature } = laptop?.camera;
  const {
    opticalDrive,
    hdmiFeature,
    usbFeatures,
    headphonePort,
    audioPort,
    ioPorts,
  } = laptop?.ports;
  const { speakerFeature, microphoneFeature } = laptop?.audio;
  const { lanDetails, wifiDetails, bluetoothDetails } = laptop?.network;
  const { color, weight, thickness, dimensions } = laptop?.physicalDetails;
  const { capacity, adapterWatt, adapterType } = laptop?.batteryDetails;
  const { os, architecture } = laptop?.osDetails;
  const { warrantyPeriod, warrantyType } = laptop?.warrantyDetails;
  const { user } = useAuth();
  const navigate=useNavigate()
  // -----------------------------------------all handlers  are in this file------------------------------
  const [QNA, refetch] = useQNA(laptop._id);
  const [selectedImage, setSelectedImage] = useState(laptop.imageLinks[0]);

  const handleThumbnailClick = (image) => {
    setSelectedImage(image);
  };
  const [buyNowChecked, setBuyNowChecked] = useState(false);
  const [emiChecked, setEmiChecked] = useState(false);
  const [relatedData, setRelated] = useState([]);

  const handleQnaSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      document.getElementById("my_modal_3").close();
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please Log in First",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/login", { state: { from: location.pathname } });
    }

    const inputValue = e.target.elements.inputText.value;

    const newQuestion = {
      userImage: user?.photoURL,
      email: user?.email,
      Question: inputValue,
      userName: user?.displayName,
      Ans: "no",
      Product: laptop._id,
    };
    console.log(newQuestion);
    fetch("http://localhost:5000/qna", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newQuestion),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          e.target.reset();
          document.getElementById("my_modal_2").close();
          refetch();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Question is been Placed, Answer  will be provided soon!",
            showConfirmButton: false,
            timer: 2000,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  // Function to handle Buy Now option click
  const handleBuyNowClick = () => {
    setBuyNowChecked(true);
    setEmiChecked(false);
  };

  // Function to handle EMI option click
  const handleEmiClick = () => {
    setEmiChecked(true);
    setBuyNowChecked(false);
  };
  useEffect(() => {
    const getRelated = async () => {
      try {
        const response = await useAxiosPublic().get(`/laptop/related`);

        setRelated(response.data);
      } catch (error) {
        console.error("Error fetching laptop data:", error);
      }
    };
    getRelated();
  }, []);

  const scrollToTop = (speed) => {
    const currentPosition = window.scrollY;
    const step = currentPosition / speed;

    const scrollStep = () => {
      if (window.scrollY > 0) {
        window.scrollBy(0, -step);
        requestAnimationFrame(scrollStep);
      } else {
        window.scrollTo(0, 0);
      }
    };

    scrollStep();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!emiChecked&&!buyNowChecked){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please select one Payment Option...",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    const image=laptop.imageLinks[1]
    const name=`${modelname} ${brand} ${display} laptop`
    const price = buyNowChecked?discountedPrice:emiPrice
    const products={price,name,image ,id:laptop._id,collection:'Laptop' };
    
    navigate('/buynow',{state:{from:location.pathname,prop:[{price,name,image,quantity:laptop.quantity ,id:laptop._id,collection:'Laptop'}]}})
    
  };
 
  const scrollToRef = (ref, speed) => {
    const targetPosition = ref.current.offsetTop;
    const currentPosition = window.scrollY;
    const distance = targetPosition - currentPosition;

    const step = distance / speed;

    const scrollStep = () => {
      if (Math.abs(window.scrollY - targetPosition) > Math.abs(step)) {
        window.scrollBy(0, step);
        requestAnimationFrame(scrollStep);
      } else {
        window.scrollTo(0, targetPosition);
      }
    };

    scrollStep();
  };

  const specRef = useRef(null);
  const qnaRef = useRef(null);
  const reviewRef = useRef(null);
  return (
    < >
      <div className=" px-5 md:px-10 grid grid-cols-1 md:grid-cols-2 pb-4">
        <div>
          <img src={selectedImage} className="md:ml-14" alt="Main Image" />

          <div className=" flex gap-2 justify-center">
            {laptop.imageLinks.map((image, index) => (
              <img
                className=" cursor-pointer w-20 px-3 border-2 border-blue-100 rounded-md"
                key={index}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                onClick={() => handleThumbnailClick(image)}
              />
            ))}
          </div>
        </div>
        <div className="pt-5">
          <h1 className=" text-2xl text-blue-700">
            {modelname} {brand} {display}
          </h1>
          <div className="flex flex-wrap gap-5 py-3">
            
            <h1 className=" bg-blue-50 px-3 text-sm text-slate-500 rounded-full">
              Price:{" "}
              <span className="text-lg text-black">{discountedPrice}$</span>
            </h1>
            <h1 className=" bg-blue-50 px-3  text-sm text-slate-500 rounded-full">
              Regular Price:{" "}
              <span className="text-lg text-black">{regularPrice}$</span>
            </h1>
            <h1 className=" bg-blue-50 px-3 text-sm text-slate-500 rounded-full">
              Status:{" "}
              <span className="text-lg text-black">
                {laptop.quantity > 0 ? "In stock" : "Out of Stock"}
              </span>
            </h1>
            <h1 className=" bg-blue-50 px-3 text-sm text-slate-500 rounded-full">
              Brand: <span className="text-lg text-black">{brand}</span>
            </h1>
          </div>
          <section>
            <h1 className="text-xl py-3">Key Features</h1>
            <h1 className=" pt-1">
              {" "}
              <span className=" text-slate-600"> Modelname :</span> {modelname}
            </h1>
            <h1 className=" pt-1">
              {" "}
              <span className=" text-slate-600"> Processor :</span> {model}{" "}
              {laptop.processor.brand}
              {generation}({cache}MB, {clockSpeed})
            </h1>
            <h1 className=" pt-1">
              {" "}
              <span className=" text-slate-600"> Ram :</span> {ram}GB {ramType}
            </h1>
            <h1 className=" pt-1">
              {" "}
              <span className=" text-slate-600"> Storage :</span>
              {storageType}
            </h1>
            <h1 className=" pt-1">
              {" "}
              <span className=" text-slate-600"> Display :</span> {display}
            </h1>
            <h1 className=" pt-1">
              {" "}
              <span className=" text-slate-600"> Features :</span>{" "}
              {specialFeatures.join(", ")}
            </h1>
          </section>

          <h1 className=" text-xl py-10"> Payment Options</h1>
          <form onSubmit={handleSubmit}>
            <section className="flex gap-5">
              <div
                className={`px-3 hover:border-blue-700 rounded-xl border-2 ${
                  buyNowChecked ? "border-blue-700" : ""
                }`}
              >
                <label
                  htmlFor="buynow"
                  className="flex gap-3 items-center"
                  onClick={handleBuyNowClick}
                >
                  <input
                    type="checkbox"
                    name="buynow"
                    value="buynow"
                    checked={buyNowChecked}
                    id="buynow"
                    className="radio checked:bg-blue-500"
                  />
                  <div>
                    <h1 className="text-xl">{discountedPrice}$</h1>
                    <h1>Cash discount price</h1>
                    <h1 className="text-slate-400">Online / cash payment</h1>
                  </div>
                </label>
              </div>
              <div
                className={`px-3 hover:border-blue-700 rounded-xl border-2 ${
                  emiChecked ? "border-blue-700" : ""
                }`}
              >
                <label
                  htmlFor="emi"
                  className="flex gap-3 items-center"
                  onClick={handleEmiClick}
                >
                  <input
                    onChange={() => console.log("done")}
                    type="checkbox"
                    name="buynow"
                    checked={emiChecked}
                    value="buynow"
                    id="emi"
                    className="radio checked:bg-blue-500"
                  />
                  <div>
                    <h1 className="text-xl">{emiPrice}$ / month</h1>
                    <h1>EMI in regular price</h1>
                    <h1 className="text-slate-400">{regularPrice}$</h1>
                  </div>
                </label>
              </div>
            </section>
            <section className=" flex gap-3 py-5">
              <button
                type="submit" 
                disabled={!laptop.quantity>0}
                className="btn bg-blue-700 text-white hover:bg-white border-white border-2 hover:border-blue-700 hover:border-2 hover:text-blue-600"
              >
                Buy Now
              </button>
              <button   disabled={!laptop.quantity>0} className="btn bg-slate-300 hover:bg-gray-200 border-0 hover:text-black">Add to cart</button>
            </section>
          </form>
        </div>
      </div>
      <div className="  grid md:grid-cols-4 gap-5 px-5 md:px-10 bg-[#f0efff] py-5">
        <div className=" md:col-span-3">
          <section className=" flex gap-5 py-5">
            <button
              onClick={() => {
                scrollToRef(specRef, 180);
              }}
            >
              <h1 className="px-4 hover:bg-[#EE4B23] duration-300 shadow-lg hover:text-white bg-white  py-2 rounded-md">
                Specification
              </h1>
            </button>
            <button
              onClick={() => {
                scrollToRef(qnaRef, 130);
              }}
            >
              <h1 className="px-4 hover:bg-[#EE4B23] duration-300 shadow-lg  hover:text-white bg-white  py-2 rounded-md">
                Questions
              </h1>
            </button>
            <button
              onClick={() => {
                scrollToRef(reviewRef, 130);
              }}
            >
              <h1 className="px-4 hover:bg-[#EE4B23] duration-300 shadow-lg  hover:text-white bg-white  py-2 rounded-md">
                Reviews
              </h1>
            </button>
          </section>
          <section
            ref={specRef}
            id="specs"
            className=" bg-white px-5 rounded-md"
          >
            <h1 className=" font-semibold text-xl py-4 ">Specification</h1>
            <div>
              <h1 className="bg-blue-50 text-blue-700 px-5 py-2 rounded-md font-semibold">
                Processor
              </h1>
              <hr className="border-1" />
              <h1 className=" px-5  py-2  hover:bg-blue-50 grid grid-cols-3 gap-28">
                <span className=" text-slate-600">Processor Brand</span>{" "}
                <span className=" col-span-2">{laptop?.processor.brand}</span>{" "}
              </h1>
              <hr className="border-1" />
              <h1 className=" px-5  py-2  hover:bg-blue-50 grid grid-cols-3 gap-28">
                <span className=" text-slate-600">Processor Model</span>{" "}
                <span className=" col-span-2">{model}</span>{" "}
              </h1>
              <hr className="border-1" />
              <h1 className=" px-5  py-2  hover:bg-blue-50 grid grid-cols-3 gap-28">
                <span className=" text-slate-600">Generation</span>{" "}
                <span className=" col-span-2">{laptop?.processor.generation} Gen</span>{" "}
              </h1>
              <hr className="border-1" />
              <h1 className=" px-5  py-2  hover:bg-blue-50 grid grid-cols-3 gap-28">
                <span className=" text-slate-600">Processor Frequency</span>{" "}
                <span className=" col-span-2">{clockSpeed}</span>{" "}
              </h1>
              <hr className="border-1" />
              <h1 className=" px-5  py-2  hover:bg-blue-50 grid grid-cols-3 gap-28">
                <span className=" text-slate-600">Processor Core</span>{" "}
                <span className=" col-span-2">{core}</span>{" "}
              </h1>
              <hr className="border-1" />
              <h1 className=" px-5  py-2  hover:bg-blue-50 grid grid-cols-3 gap-28">
                <span className=" text-slate-600">Processor Thread</span>{" "}
                <span className=" col-span-2">{thread}</span>{" "}
              </h1>
              <hr className="border-1" />
              <h1 className=" px-5  py-2  hover:bg-blue-50 grid grid-cols-3 gap-28">
                <span className=" text-slate-600">CPU Cache</span>{" "}
                <span className=" col-span-2">{cache}MB</span>{" "}
              </h1>
              <hr className="border-1" />
            </div>
            <div>
              <h1 className="bg-blue-50 mt-3  text-blue-700 px-5 py-2 rounded-md font-semibold">
                Display
              </h1>
              <hr className="border-1" />
              <h1 className=" px-5 py-2  hover:bg-blue-50 grid grid-cols-3 gap-28">
                <span className=" text-slate-600">Display Size</span>{" "}
                <span className=" col-span-2">{size}</span>{" "}
              </h1>
              <hr className="border-1" />
              <h1 className=" px-5 py-2  hover:bg-blue-50 grid grid-cols-3 gap-28">
                <span className=" text-slate-600">Display Resolution</span>{" "}
                <span className=" col-span-2">{resolution}</span>{" "}
              </h1>
              <hr className="border-1" />
              <h1 className=" px-5 py-2  hover:bg-blue-50 grid grid-cols-3 gap-28">
                <span className=" text-slate-600">Display Features</span>{" "}
                <span className=" col-span-2">{displayFeatures?.join(", ")}</span>{" "}
              </h1>
              <hr className="border-1" />
            </div>
            <div>
              <h1 className="bg-blue-50 mt-3  text-blue-700 px-5 py-2 rounded-md font-semibold">
                Memory
              </h1>
              <hr className="border-1" />
              <h1 className=" px-5 py-2  hover:bg-blue-50 grid grid-cols-3 gap-28">
                <span className=" text-slate-600">RAM Size</span>{" "}
                <span className=" col-span-2">{ramSize} GB</span>{" "}
              </h1>
              <hr className="border-1" />
              <h1 className=" px-5 py-2  hover:bg-blue-50 grid grid-cols-3 gap-28">
                <span className=" text-slate-600">RAM Type</span>{" "}
               <span className=" col-span-2">{ramType}</span>{" "}
              </h1>
              <hr className="border-1" />
              <h1 className=" px-5 py-2  hover:bg-blue-50 grid grid-cols-3 gap-28">
                <span className=" text-slate-600">RAM Frequency</span>{" "}
               <span className=" col-span-2">{ramFrequency} MHz</span>{" "}
              </h1>
              <hr className="border-1" />
              <h1 className=" px-5 py-2  hover:bg-blue-50 grid grid-cols-3 gap-28">
                <span className=" text-slate-600">RAM Slot</span>{" "}
               <span className=" col-span-2">{totalRamSlots}</span>{" "}
              </h1>
              <hr className="border-1" />
              <h1 className=" px-5 py-2  hover:bg-blue-50 grid grid-cols-3 gap-28">
                <span className=" text-slate-600">Max Capacity</span>{" "}
               <span className=" col-span-2">{maxRamCapacity} GB</span>{" "}
              </h1>
              <hr className="border-1" />
            </div>
            <div>
              <h1 className="bg-blue-50 mt-3  text-blue-700 px-5 py-2 rounded-md font-semibold">
                Storage
              </h1>
              <hr className="border-1" />
              <h1 className=" px-5 py-2  hover:bg-blue-50 grid grid-cols-3 gap-28">
                <span className=" text-slate-600">Storage Type</span>{" "}
               <span className=" col-span-2">{storageType}</span>{" "}
              </h1>
              <hr className="border-1" />
              <h1 className=" px-5 py-2  hover:bg-blue-50 grid grid-cols-3 gap-28">
                <span className=" text-slate-600">Capacity</span>{" "}
               <span className=" col-span-2">
                  {storageSize == 1 ? "1000 GB" : storageSize + " GB"}
                </span>{" "}
              </h1>
              <hr className="border-1" />

              <h1 className=" px-5 py-2  hover:bg-blue-50 grid grid-cols-3 gap-28">
                <span className=" text-slate-600">SSD Slot</span>{" "}
               <span className=" col-span-2">{ssdSlot}</span>{" "}
              </h1>
              <hr className="border-1" />
              <h1 className=" px-5 py-2  hover:bg-blue-50 grid grid-cols-3 gap-28">
                <span className=" text-slate-600">Storage Expansion Slot</span>{" "}
               <span className=" col-span-2">{extraSsdSlot > 0 ? "Yes" : "No"}</span>{" "}
              </h1>
              <hr className="border-1" />
              <h1 className=" px-5 py-2  hover:bg-blue-50 grid grid-cols-3 gap-28">
                <span className=" text-slate-600">Read/Write Speed</span>{" "}
               <span className=" col-span-2">
                  {readSpeed}/{writeSpeed} Mbps
                </span>{" "}
              </h1>
              <hr className="border-1" />
            </div>
            <div>
              <h1 className="bg-blue-50 mt-3  text-blue-700 px-5 py-2 rounded-md font-semibold">
                Graphics
              </h1>
              <hr className="border-1" />
              <h1 className=" px-5 py-2  hover:bg-blue-50 grid grid-cols-3 gap-28">
                <span className=" text-slate-600">Graphics Brand</span>{" "}
               <span className=" col-span-2">{laptop?.graphics.brand}</span>{" "}
              </h1>
              <hr className="border-1" />
              <h1 className=" px-5 py-2  hover:bg-blue-50 grid grid-cols-3 gap-28">
                <span className=" text-slate-600">Model</span>{" "}
               <span className=" col-span-2">{laptop?.graphics.model}</span>{" "}
              </h1>
              <hr className="border-1" />
              <h1 className=" px-5 py-2  hover:bg-blue-50 grid grid-cols-3 gap-28">
                <span className=" text-slate-600">Memory Size</span>{" "}
               <span className=" col-span-2">{memorySize} GB</span>{" "}
              </h1>
              <hr className="border-1" />
              <h1 className=" px-5 py-2  hover:bg-blue-50 grid grid-cols-3 gap-28">
                <span className=" text-slate-600">Memory type</span>{" "}
               <span className=" col-span-2">{memoryType}</span>{" "}
              </h1>
              <hr className="border-1" />
            </div>
            <div>
              <h1 className="bg-blue-50 mt-3  text-blue-700 px-5 py-2 rounded-md font-semibold">
                Keyboard
              </h1>
              <hr className="border-1" />
              <h1 className=" px-5 py-2  hover:bg-blue-50 grid grid-cols-3 gap-28">
                <span className=" text-slate-600">Keyboard</span>{" "}
               <span className=" col-span-2">{keyboardFeatures.join(", ")}</span>{" "}
              </h1>
              <hr className="border-1" />
              <h1 className=" px-5 py-2  hover:bg-blue-50 grid grid-cols-3 gap-28">
                <span className=" text-slate-600">Touch Pad</span>{" "}
               <span className=" col-span-2">{touchpadFeatures?.join(", ")}</span>{" "}
              </h1>
              <hr className="border-1" />
            </div>
            <div>
              <h1 className="bg-blue-50 mt-3  text-blue-700 px-5 py-2 rounded-md font-semibold">
                Camera & Audio
              </h1>
              <hr className="border-1" />
              <h1 className=" px-5 py-2  hover:bg-blue-50 grid grid-cols-3 gap-28">
                <span className=" text-slate-600">WebCam</span>{" "}
               <span className=" col-span-2">{webcamFeature}</span>{" "}
              </h1>
              <hr className="border-1" />
              <h1 className=" px-5 py-2  hover:bg-blue-50 grid grid-cols-3 gap-28">
                <span className=" text-slate-600">Audio</span>{" "}
               <span className=" col-span-2">{audioFeature}</span>{" "}
              </h1>
              <hr className="border-1" />
              <h1 className=" px-5 py-2  hover:bg-blue-50 grid grid-cols-3 gap-28">
                <span className=" text-slate-600">Speaker</span>{" "}
               <span className=" col-span-2">{speakerFeature}</span>{" "}
              </h1>
              <hr className="border-1" />
              <h1 className=" px-5 py-2  hover:bg-blue-50 grid grid-cols-3 gap-28">
                <span className=" text-slate-600">Audio</span>{" "}
               <span className=" col-span-2">{microphoneFeature}</span>{" "}
              </h1>
              <hr className="border-1" />
            </div>
            <div>
              <h1 className="bg-blue-50 mt-3  text-blue-700 px-5 py-2 rounded-md font-semibold">
                I/O Ports
              </h1>
              <hr className="border-1" />
              <h1 className=" px-5 py-2  hover:bg-blue-50 grid grid-cols-3 gap-28">
                <span className=" text-slate-600">HDMI</span>{" "}
               <span className=" col-span-2">{hdmiFeature ? "Yes" : "No"}</span>{" "}
              </h1>
              <hr className="border-1" />
              <h1 className=" px-5 py-2  hover:bg-blue-50 grid grid-cols-3 gap-28">
                <span className=" text-slate-600">Audio Port</span>{" "}
               <span className=" col-span-2">{audioPort ? "Yes" : "No"}</span>{" "}
              </h1>
              <hr className="border-1" />
              <h1 className=" px-5 py-2  hover:bg-blue-50 grid grid-cols-3 gap-28">
                <span className=" text-slate-600">HeadPhone</span>{" "}
               <span className=" col-span-2">{headphonePort ? "Yes" : "No"}</span>{" "}
              </h1>
              <hr className="border-1" />
              <h1 className=" px-5 py-2  hover:bg-blue-50 grid grid-cols-3 gap-28">
                <span className=" text-slate-600">USB</span>{" "}
               <span className=" col-span-2">{usbFeatures.join(", ")}</span>{" "}
              </h1>
              <hr className="border-1" />
              <h1 className=" px-5 py-2  hover:bg-blue-50 grid grid-cols-3 gap-28">
                <span className=" text-slate-600">Optical Drive</span>{" "}
               <span className=" col-span-2">{opticalDrive ? "Yes" : "No"}</span>{" "}
              </h1>
              <hr className="border-1" />
              <h1 className=" px-5 py-2  hover:bg-blue-50 grid grid-cols-3 gap-28">
                <span className=" text-slate-600">I/O Ports</span>{" "}
               <span className=" col-span-2">{ioPorts.join(", ")}</span>{" "}
              </h1>
              <hr className="border-1" />
            </div>
            <div>
              <h1 className="bg-blue-50 mt-3  text-blue-700 px-5 py-2 rounded-md font-semibold">
                Network & Connectivity
              </h1>
              <hr className="border-1" />
              <h1 className=" px-5 py-2  hover:bg-blue-50 grid grid-cols-3 gap-28">
                <span className=" text-slate-600">LAN Connect</span>{" "}
               <span className=" col-span-2">{lanDetails}</span>{" "}
              </h1>
              <hr className="border-1" />
              <h1 className=" px-5 py-2  hover:bg-blue-50 grid grid-cols-3 gap-28">
                <span className=" text-slate-600">Wifi</span>{" "}
               <span className=" col-span-2">{wifiDetails}</span>{" "}
              </h1>
              <hr className="border-1" />
              <h1 className=" px-5 py-2  hover:bg-blue-50 grid grid-cols-3 gap-28">
                <span className=" text-slate-600">BlueTooth</span>{" "}
               <span className=" col-span-2">{bluetoothDetails}</span>{" "}
              </h1>
              <hr className="border-1" />
            </div>
            <div>
              <h1 className="bg-blue-50 mt-3  text-blue-700 px-5 py-2 rounded-md font-semibold">
                Physical Details
              </h1>
              <hr className="border-1" />
              <h1 className=" px-5 py-2  hover:bg-blue-50 grid grid-cols-3 gap-28">
                <span className=" text-slate-600">Color</span>{" "}
               <span className=" col-span-2">{color}</span>{" "}
              </h1>
              <hr className="border-1" />
              <h1 className=" px-5 py-2  hover:bg-blue-50 grid grid-cols-3 gap-28">
                <span className=" text-slate-600">Weight</span>{" "}
               <span className=" col-span-2">{weight}</span>{" "}
              </h1>
              <hr className="border-1" />
              <h1 className=" px-5 py-2  hover:bg-blue-50 grid grid-cols-3 gap-28">
                <span className=" text-slate-600">Thickness</span>{" "}
               <span className=" col-span-2">{thickness}</span>{" "}
              </h1>
              <hr className="border-1" />
              <h1 className=" px-5 py-2  hover:bg-blue-50 grid grid-cols-3 gap-28">
                <span className=" text-slate-600">Dimension</span>{" "}
               <span className=" col-span-2">{dimensions}</span>{" "}
              </h1>
              <hr className="border-1" />
            </div>
            <div>
              <h1 className="bg-blue-50 mt-3  text-blue-700 px-5 py-2 rounded-md font-semibold">
                Power
              </h1>
              <hr className="border-1" />
              <h1 className=" px-5 py-2  hover:bg-blue-50 grid grid-cols-3 gap-28">
                <span className=" text-slate-600">Battery Capacity</span>{" "}
               <span className=" col-span-2">{capacity}</span>{" "}
              </h1>
              <hr className="border-1" />
              <h1 className=" px-5 py-2  hover:bg-blue-50 grid grid-cols-3 gap-28">
                <span className=" text-slate-600">Adapter</span>{" "}
               <span className=" col-span-2">{adapterType}</span>{" "}
              </h1>
              <hr className="border-1" />
              <h1 className=" px-5 py-2  hover:bg-blue-50 grid grid-cols-3 gap-28">
                <span className=" text-slate-600">Charging Watt</span>{" "}
               <span className=" col-span-2">{adapterWatt} Watt</span>{" "}
              </h1>
              <hr className="border-1" />
            </div>
            <div>
              <h1 className="bg-blue-50 mt-3  text-blue-700 px-5 py-2 rounded-md font-semibold">
                Operating System
              </h1>
              <hr className="border-1" />
              <h1 className=" px-5 py-2  hover:bg-blue-50 grid grid-cols-3 gap-28">
                <span className=" text-slate-600">OS</span><span className=" col-span-2">{os}</span>{" "}
              </h1>
              <hr className="border-1" />
              <h1 className=" px-5 py-2  hover:bg-blue-50 grid grid-cols-3 gap-28">
                <span className=" text-slate-600">Architecture</span>{" "}
               <span className=" col-span-2">{architecture}</span>{" "}
              </h1>
              <hr className="border-1" />
            </div>
            <div>
              <h1 className="bg-blue-50 mt-3  text-blue-700 px-5 py-2 rounded-md font-semibold">
                Warranty Details
              </h1>
              <hr className="border-1" />
              <h1 className=" px-5 py-2  hover:bg-blue-50 grid grid-cols-3 gap-28">
                <span className=" text-slate-600">Warranty </span>{" "}
               <span className=" col-span-2">{warrantyType}</span>{" "}
              </h1>
              <hr className="border-1" />
              <h1 className=" px-5 py-2 mb-5 hover:bg-blue-50 grid grid-cols-3 gap-28">
                <span className=" text-slate-600">Warranty Period</span>{" "}
               <span className=" col-span-2">{warrantyPeriod}</span>{" "}
              </h1>
              <hr className="border-1" />
            </div>
          </section>
          <section
            className="bg-white rounded-md py-5 px-5 mt-5"
            ref={qnaRef}
            id="Qna"
          >
            <div className="flex justify-between items-center pb-3">
              <div>
                <h1 className="text-xl font-semibold">
                  Questions ({QNA.length})
                </h1>
                <p className=" text-slate-600">
                  Have any Question? Ask here and get detailed answer from the
                  Experts!!
                </p>
              </div>
              <button
                className="bg-white duration-500 border-2 border-blue-700 text-blue-700 hover:text-white hover:bg-blue-700 rounded-md px-3 py-2 "
                onClick={() =>
                  document.getElementById("my_modal_2").showModal()
                }
              >
                Ask Question
              </button>
            </div>
            <hr />
            <div className="py-5">
              {QNA.length == 0 ? (
                <div>
                  <div className="w-36 h-36 bg-blue-50 mx-auto  rounded-full flex flex-col justify-around">
                    <RiMessage2Fill
                      size={70}
                      color="#3649BA"
                      className="mx-auto my-auto"
                    />
                  </div>
                  <h1 className="text-slate-600 text-center pt-4">
                    This item has no Question. Be first to ask a question!
                  </h1>
                </div>
              ) : (
                <div>
                  {QNA.map((item, index) => (
                    <div key={index}>
                      <div className="py-3 flex gap-5">
                        <div>
                          <img
                            src={item.userImage}
                            className="border-2 w-14 rounded-full p-1 mx-auto"
                            alt="User Photo"
                          />
                          <h1 className=" text-blue-700 text-xs ">
                            {item.userName}
                          </h1>
                        </div>
                        <div className="">
                          <h1 className="font-bold">✥ {item.Question} ?</h1>
                          <h1 className=" text-gray-600">
                            ➡ ️{" "}
                            {item.Ans == "no" ? "Waiting for Answer" : item.Ans}
                          </h1>
                        </div>
                      </div>
                      <hr />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ---------------------modal------------------------------ */}

            <dialog id="my_modal_2" className="modal">
              <div className="modal-box bg-indigo-50">
                <h3 className="font-bold text-gray-800 text-lg">Ask a Question!</h3>
                <form onSubmit={handleQnaSubmit}>
                  <input
                    type="text"
                    required={true}
                    name="inputText"
                    placeholder="Place your  question here..."
                    className="py-4 border-2 bg-white rounded-xl my-3 px-3 w-full border-blue-400 outline-none"
                  />
                  <input
                    type="submit"
                    value="Submit"
                    className="btn btn-primary "
                  />
                </form>
              </div>
              <form method="dialog" className="modal-backdrop">
                <button>close</button>
              </form>
            </dialog>
            {/* ------------------------------modal---------------------------- */}
          </section>
          <section ref={reviewRef} id="review">
            {/* <LaptopReview state={laptop._id} /> */}
            <AddReview state={laptop._id}/>
          </section>
        </div>
        <div className="">
          <h1 className=" text-blue-700 font-semibold text-center  bg-white text-xl rounded-md py-5">
            {" "}
            Related Products
          </h1>
          <hr />
          {relatedData?.map((item) => {
            return (
              <div key={item._id} className=" bg-white py-5 px-5">
                <div className=" flex gap-5 items-center">
                  <img src={item.imageLinks[0]} className="w-1/4" alt="" />
                  <div>
                    <Link to={`/laptopId/${item._id}`}>
                      <h1 className=" font-extrabold py-2 text-sm hover:underline hover:text-red-600 duration-200">
                        {item.keyFeatures.modelname} {item.keyFeatures.brand}{" "}
                        {item.processor.model} {item.keyFeatures.display}
                      </h1>
                    </Link>
                    <h1 className=" text-red-600">
                      {item.keyFeatures.discountedPrice}$
                    </h1>
                  </div>
                </div>
                <hr />
              </div>
            );
          })}
        </div>
      </div>

      <button
        className="fixed bottom-8 z-20 right-5 md:right-28 bg-blue-500 text-white py-2 px-4 rounded-full shadow-md transition-opacity duration-300 hover:opacity-30 animate-bounce"
        onClick={() => scrollToTop(100)} // Adjust speed by changing the argument (default: 20)
      >
        <FaArrowUp />
      </button>
    </>
  );
};

export default DetailPage;
