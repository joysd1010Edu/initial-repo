import React from "react";
import { FaCartPlus } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import useCart from "../../../Hooks/useCart";

const LapTopCard = ({ state }) => {
  const {
    discountedPrice,
    ramType,
    generation,
    modelname,
    display,
    ram,
    specialFeatures,
  } = state.keyFeatures;
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const getRandomIndex = (max) => Math.floor(Math.random() * max);
  const getRandomData = () => {
    const randomIndex = getRandomIndex(state.imageLinks.length);
    return state.imageLinks[randomIndex];
  };
  const image = getRandomData();

  const { brand, model, clockSpeed, cache, core, thread } = state.processor;
  const { storageType, storageSize } = state.memory;
  const LaptopName = `${modelname} ${brand} ${model} ${display} Laptop`;
  const [, refetch] = useCart();

  const handleNavigate = () => {
    if (!user) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please Login to  Continue!",
        showConfirmButton: false,
        timer: 2500,
      });

      navigate("/login", { state: { from: location.pathname } });
    } else {
      navigate("/buynow", {
        state: {
          from: "/",
          prop: [
            {
              price: discountedPrice,
              name: LaptopName,
              image: image,
              quantity: state.quantity,
              id: state._id,
              collection: "Laptop",
            },
          ],
        },
      });
    }
  };

  const addToCartHandler = () => {
    const newData = {
      price: discountedPrice,
      name: LaptopName,
      image: image,
      quantity: state.quantity,
      id: state._id,
      collection: "Laptop",
      email: user?.email,
    };
    if (!user) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please Login to  Continue!",
        showConfirmButton: false,
        timer: 2500,
      });

      navigate("/login", { state: { from: location.pathname } });
    } else {
      fetch("http://localhost:5000/cart", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(newData),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            refetch();
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Product added to cart",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
    }
  };

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
        <Link to={`/laptopId/${state._id}`}>
          <h1 className=" font-extrabold py-2 text-sm hover:underline hover:text-red-600 duration-200">
            {modelname} {brand} {model} {display}
          </h1>
        </Link>
      </div>
      <div className=" flex flex-col gap-2 pt-2 pb-4 text-sm text-[#666767]">
        <div className=" flex gap-2 items-center">
          <p className="text-xs">■</p>{" "}
          <h1>
            {" "}
            Processor : {brand} {model} {generation}gen ({core}C/{thread}T,{" "}
            {clockSpeed}MHz,{cache}MB L3)
          </h1>
        </div>
        <div className=" flex gap-2 items-center">
          <p className="text-xs">■</p>
          <h1>
            {" "}
            RAM : {ram} GB {ramType} , Storage:{" "}
            {storageSize > 2 ? `${storageSize} MB ` : `${storageSize} TB `}{" "}
            {storageType}{" "}
          </h1>
        </div>
        <div className=" flex gap-2 items-center">
          <p className="text-xs">■</p>{" "}
          <h1>
            {" "}
            Display : {display} GB {ramType}{" "}
          </h1>
        </div>
        <div className=" flex gap-2 items-center">
          <p className="text-xs">■</p>{" "}
          <h1>
            {" "}
            Features : {specialFeatures[1]}, {specialFeatures[0]}{" "}
          </h1>
        </div>
      </div>
      <div className="py-5">
        <hr />
        <h1 className=" text-xl text-center font-extrabold py-3  text-[#F04B22]">
          {discountedPrice} $
        </h1>
        <div className="flex justify-around">
          <div
            onClick={() => handleNavigate()}
            className=" flex gap-2 md:px-14 px-8 text-sm py-2 rounded-md cursor-pointer text-blue-700 hover:text-white hover:bg-blue-700 transition duration-500 bg-indigo-50"
          >
            <IoMdCart size={20} /> <h1> Buy Now</h1>
          </div>
        </div>

        <div
          onClick={addToCartHandler}
          className=" flex gap-2 md:px-12 md:mx-1 px-7 text-sm py-2 rounded-md mt-2 text-[#535656] cursor-pointer hover:bg-slate-300 duration-500 "
        >
          <FaCartPlus size={20} /> <h1> Add to Cart</h1>
        </div>
      </div>
    </div>
  );
};
//    navigate('/buynow',{state:{from:location.pathname,prop:[{price,name,image,quantity:laptop.quantity ,id:laptop._id,collection:'Laptop'}]}})

export default LapTopCard;
