import React, { useEffect, useRef, useState } from "react";
import {
  Link,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { RiMessage2Fill } from "react-icons/ri";
import Swal from "sweetalert2";
import { FaArrowUp } from "react-icons/fa";
import useAuth from "../../../Hooks/useAuth";
import useQNA from "../../../Hooks/useQNA";
import AddReview from "../../../Hooks/AddReview";

const DetailpageG = () => {
  const GPU = useLoaderData();
  const location = useLocation();
  const navigate = useNavigate();
  // --------------------------------------------declaring all  the variables and functions---------------------------
  const {
    keyFeatures: {
      name,
      brandName,
      modelName,
      price: { regular, discount, emi },
      chipset,
      core,
      coreClockSpeed,
      cudaCores,
      displayPorts,
      memoryType,
      memorySize,
      memoryClock,
      memoryInterface,
      memoryBusType,
    },
    display: {
      hdmi,
      multiDisplay,
      connectors,
      recommendedPSU,
      resolution,
      specialFeatures,
    },
    api: { directX, openGL },
    physical: { dimension, weight },
    images,
    warrantyDetails: { warrantyPeriod, warrantyType },
    quantity,
  } = GPU;
console.log(connectors,multiDisplay)
  // // -----------------------------------------all handlers  are in this file------------------------------
  const [QNA, refetch] = useQNA(GPU._id);
  const [selectedImage, setSelectedImage] = useState(images[0]);

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
      Product: GPU._id,
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

  // ------------------------------------------------Function to handle Buy Now option click-----------------------------------------------------
  const handleBuyNowClick = () => {
    setBuyNowChecked(true);
    setEmiChecked(false);
  };

  // ------------------------------------------------ Function to handle EMI option click------------------------------------------------
  const handleEmiClick = () => {
    setEmiChecked(true);
    setBuyNowChecked(false);
  };
  useEffect(() => {
    const getRelated = async () => {
      try {
        const response = await useAxiosPublic().get(`/GPU/related`);

        setRelated(response.data);
      } catch (error) {
        console.error("Error fetching GPU data:", error);
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
    if (!emiChecked && !buyNowChecked) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please select one Payment Option...",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    const image = images[1];
    const ProductName = `${name} ${memorySize} ${memoryType} Graphics Card`;
    const ProductPrice = buyNowChecked ? discount : emi;
    navigate("/buynow", {
      state: {
        from: location.pathname,
        prop: [
          {
            price: ProductPrice,
            name: ProductName,
            image,
            quantity: quantity,
            id: GPU._id,
            collection: "GraphicsCard",
          },
        ],
      },
    });
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
    <>
      <div className=" px-5 md:px-10 grid grid-cols-1 md:grid-cols-2 pb-4">
        <div>
          <img
            src={selectedImage}
            className="md:ml-14 max-w-lg"
            alt="Main Image"
          />

          <div className=" flex gap-2 py-5 justify-center">
            {images.map((image, index) => (
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
            {name} {memorySize} {memoryType} Graphics Card
          </h1>
          <div className="flex flex-wrap gap-5 py-3">
            <h1 className=" bg-blue-50 px-3 text-sm text-slate-500 rounded-full">
              Price: <span className="text-lg text-black">{discount}$</span>
            </h1>
            <h1 className=" bg-blue-50 px-3  text-sm text-slate-500 rounded-full">
              Regular Price:{" "}
              <span className="text-lg text-black">{regular}$</span>
            </h1>
            <h1 className=" bg-blue-50 px-3 text-sm text-slate-500 rounded-full">
              Status:{" "}
              <span className="text-lg text-black">
                {quantity > 0 ? "In stock" : "Out of Stock"}
              </span>
            </h1>
            <h1 className=" bg-blue-50 px-3 text-sm text-slate-500 rounded-full">
              Brand: <span className="text-lg text-black">{brandName}</span>
            </h1>
          </div>
          <section>
            <h1 className="text-xl py-3">Key Features</h1>
            <h1 className=" pt-1">
              {" "}
              <span className=" text-slate-600"> Model Name :</span> {modelName}
            </h1>
            <h1 className=" pt-1">
              {" "}
              <span className=" text-slate-600"> Boost Clock :</span>{" "}
              {coreClockSpeed}
            </h1>
            <h1 className=" pt-1">
              {" "}
              <span className=" text-slate-600"> Type :</span> {memoryInterface}{" "}
              {memoryType}
            </h1>
            <h1 className=" pt-1">
              {" "}
              <span className=" text-slate-600"> Cuda Cores :</span>
              {cudaCores}
            </h1>
            <h1 className=" pt-1">
              {" "}
              <span className=" text-slate-600"> Display Ports :</span>{" "}
              {displayPorts.join(", ")}
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
                    <h1 className="text-xl">{discount}$</h1>
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
                    <h1 className="text-xl">{emi}$ / month</h1>
                    <h1>EMI in regular price</h1>
                    <h1 className="text-slate-400">{regular}$</h1>
                  </div>
                </label>
              </div>
            </section>
            <section className=" flex gap-3 py-5">
              <button
                type="submit"
                disabled={!quantity > 0}
                className="btn bg-blue-700 text-white hover:bg-white border-white border-2 hover:border-blue-700 hover:border-2 hover:text-blue-600"
              >
                Buy Now
              </button>
              <button
                disabled={!quantity > 0}
                className="btn bg-slate-300 hover:bg-gray-200 border-0 hover:text-black"
              >
                Add to cart
              </button>
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
                Video Memory Specifications
              </h1>
              <hr className="border-1" />
              <h1 className=" px-5  py-2  hover:bg-blue-50 grid grid-cols-3 gap-28">
                <span className=" text-slate-600">Memory Type</span>{" "}
                <span className=" col-span-2">{memoryType}</span>{" "}
              </h1>
              <hr className="border-1" />
              <h1 className=" px-5  py-2  hover:bg-blue-50 grid grid-cols-3 gap-28">
                <span className=" text-slate-600">Memory Size</span>{" "}
                <span className=" col-span-2">{memorySize}</span>{" "}
              </h1>
              <hr className="border-1" />
              <h1 className=" px-5  py-2  hover:bg-blue-50 grid grid-cols-3 gap-28">
                <span className=" text-slate-600">Resolution</span>{" "}
                <span className=" col-span-2">{resolution} </span>{" "}
              </h1>
              <hr className="border-1" />
              <h1 className=" px-5  py-2  hover:bg-blue-50 grid grid-cols-3 gap-28">
                <span className=" text-slate-600">Core</span>{" "}
                <span className=" col-span-2">{core}</span>{" "}
              </h1>
              <hr className="border-1" />
              <h1 className=" px-5  py-2  hover:bg-blue-50 grid grid-cols-3 gap-28">
                <span className=" text-slate-600">Memory Interface</span>{" "}
                <span className=" col-span-2">{memoryInterface}</span>{" "}
              </h1>
              <hr className="border-1" />
              <h1 className=" px-5  py-2  hover:bg-blue-50 grid grid-cols-3 gap-28">
                <span className=" text-slate-600">Memory Clock</span>{" "}
                <span className=" col-span-2">{memoryClock}</span>{" "}
              </h1>
              <hr className="border-1" />
              <h1 className=" px-5  py-2  hover:bg-blue-50 grid grid-cols-3 gap-28">
                <span className=" text-slate-600">Bus Type</span>{" "}
                <span className=" col-span-2">{memoryBusType}</span>{" "}
              </h1>
              <hr className="border-1" />
            </div>
            <div>
              <h1 className="bg-blue-50 mt-3  text-blue-700 px-5 py-2 rounded-md font-semibold">
                Display Ports
              </h1>
              <hr className="border-1" />
              <h1 className=" px-5 py-2  hover:bg-blue-50 grid grid-cols-3 gap-28">
                <span className=" text-slate-600">HDMI</span>{" "}
                <span className=" col-span-2">
                  {displayPorts.some((item) =>
                    item.toLowerCase().includes("hdmi")
                  )
                    ? "Yes"
                    : "No"}
                </span>{" "}
              </h1>
              <hr className="border-1" />
              <h1 className=" px-5 py-2  hover:bg-blue-50 grid grid-cols-3 gap-28">
                <span className=" text-slate-600">DVI</span>{" "}
                <span className=" col-span-2">
                  {displayPorts.some((item) =>
                    item.toLowerCase().includes("dvi")
                  )
                    ? "Yes"
                    : "No"}
                </span>{" "}
              </h1>
              <hr className="border-1" />
              <h1 className=" px-5 py-2  hover:bg-blue-50 grid grid-cols-3 gap-28">
                <span className=" text-slate-600">VGA</span>{" "}
                <span className=" col-span-2">
                  {displayPorts.some((item) =>
                    item.toLowerCase().includes("vga")
                  )
                    ? "Yes"
                    : "No"}
                </span>{" "}
              </h1>
              <hr className="border-1" />
              <h1 className=" px-5 py-2  hover:bg-blue-50 grid grid-cols-3 gap-28">
                <span className=" text-slate-600">DisplayPort</span>{" "}
                <span className=" col-span-2">
                  {displayPorts.some((item) =>
                    item.toLowerCase().includes("display")
                  )
                    ? "Yes"
                    : "No"}
                </span>{" "}
              </h1>
              <hr className="border-1" />
            </div>
            <div>
              <h1 className="bg-blue-50 mt-3  text-blue-700 px-5 py-2 rounded-md font-semibold">
              Power Specifications
              </h1>
              <hr className="border-1" />
              <h1 className=" px-5  py-2  hover:bg-blue-50 grid grid-cols-3 gap-28">
                <span className=" text-slate-600">Recommended PSU</span>{" "}
                <span className=" col-span-2">{recommendedPSU}</span>{" "}
              </h1>
              <hr className="border-1" />
            </div>
            
            <div>
              <h1 className="bg-blue-50 mt-3  text-blue-700 px-5 py-2 rounded-md font-semibold">
              Interface
              </h1>
              <hr className="border-1" />
              <h1 className=" px-5 py-2  hover:bg-blue-50 grid grid-cols-3 gap-28">
                <span className=" text-slate-600">HDMI</span>{" "}
                <span className=" col-span-2">
                  {/* {hdmiFeature ? "Yes" : "No"} */}

                  {hdmi}
                </span>{" "}
              </h1>
              <hr className="border-1" />
              <h1 className=" px-5 py-2  hover:bg-blue-50 grid grid-cols-3 gap-28">
                <span className=" text-slate-600">Ports</span>{" "}
                <span className=" col-span-2">{connectors.join(', ')}</span>{" "}
              </h1>
              
              <hr className="border-1" />
              <h1 className=" px-5 py-2  hover:bg-blue-50 grid grid-cols-3 gap-28">
                <span className=" text-slate-600">Multiple display</span>{" "}
                <span className=" col-span-2">{multiDisplay?"Yes":"No"}</span>{" "}

              </h1>
              
              <hr className="border-1" />
              
              
            </div>
            <div>
              <h1 className="bg-blue-50 mt-3  text-blue-700 px-5 py-2 rounded-md font-semibold">
              Application Programming Interfaces
              </h1>
              <hr className="border-1" />
              <h1 className=" px-5 py-2  hover:bg-blue-50 grid grid-cols-3 gap-28">
                <span className=" text-slate-600">Direct XL</span>{" "}
                <span className=" col-span-2">{directX}</span>{" "}
              </h1>
             
              <hr className="border-1" />
              <h1 className=" px-5 py-2  hover:bg-blue-50 grid grid-cols-3 gap-28">
                <span className=" text-slate-600">Open GL</span>{" "}
                <span className=" col-span-2">{openGL}</span>{" "}
              </h1>
              <hr className="border-1" />
            </div>
            <div>
              <h1 className="bg-blue-50 mt-3  text-blue-700 px-5 py-2 rounded-md font-semibold">
                Physical Details
              </h1>
              <hr className="border-1" />
             
              <h1 className=" px-5 py-2  hover:bg-blue-50 grid grid-cols-3 gap-28">
                <span className=" text-slate-600">Weight</span>{" "}
                <span className=" col-span-2">{weight}</span>{" "}
              </h1>
              
              <hr className="border-1" />
              <h1 className=" px-5 py-2  hover:bg-blue-50 grid grid-cols-3 gap-28">
                <span className=" text-slate-600">Dimension</span>{" "}
                <span className=" col-span-2">{dimension}</span>{" "}
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

            {/* ---------------------modal------------------------------*/}

            <dialog id="my_modal_2" className="modal">
              <div className="modal-box bg-indigo-50">
                <h3 className="font-bold text-gray-800 text-lg">
                  Ask a Question!
                </h3>
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
            <AddReview state={GPU._id} />
          </section>
        </div>
        <div className="">
          <h1 className=" text-blue-700 font-semibold text-center  bg-white text-xl rounded-md py-5">
            {" "}
            Related Products
          </h1>
          <hr />
          {/* {relatedData?.map((item) => {
            return (
              <div key={item._id} className=" bg-white py-5 px-5">
                <div className=" flex gap-5 items-center">
                  <img src={item.imageLinks[0]} className="w-1/4" alt="" />
                  <div>
                    <Link to={`/GPUId/${item._id}`}>
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
          })} */}
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

export default DetailpageG;
