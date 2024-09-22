import React, { useEffect, useState } from "react";
import logo from "./../../../assets/Tech shop2.png";
import { BsSearch } from "react-icons/bs";
import { FaGift, FaTrashAlt, FaUser } from "react-icons/fa";
import { AiTwotoneThunderbolt } from "react-icons/ai";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { FaCartShopping } from "react-icons/fa6";
import useCart from "../../Hooks/useCart";
import Swal from "sweetalert2";
import { GiSplitCross } from "react-icons/gi";
import { ImMenu } from "react-icons/im";const Header = () => {
  const { user, logOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [Cart, refetch] = useCart();

  const cartCall = () => {
    if (!user) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please Login to use Cart!",
        showConfirmButton: false,
        timer: 2500,
      });
      navigate('/login', { state: { from: location.pathname } });    }
    document.getElementById("my_modal_6").showModal();
  };
  const handleDeletFromcart = (ItemId) => {
    console.log("Clicked on ", ItemId);
    document.getElementById("my_modal_6").close();

    Swal.fire({
      title: "Are you sure to remove this?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/cart/${ItemId}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              refetch();
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Successfully removed from Cart",
                showConfirmButton: false,
                timer: 1500,
              });
              setTimeout(function () {
                document.getElementById("my_modal_6").showModal();
              }, 1000);
            }
          });
      }
    });
  };
  const [menu, setMenu] = useState(true);
  const handleMenuOpen = () => {
    setMenu(false);
  };
  const handleMenuClose = () => {
    setMenu(true);
  };

  return (
    <div className="md:px-10 px-5 py-3 bg-[#270722]">
      <div className="flex items-center justify-between  ">
        <div className=" flex items-center gap-3">
          {" "}
          <Link to={"/"}>
            {" "}
            <img src={logo} className=" w-20  md:w-36" />
          </Link>
          <div className=" flex">
            <input
              type="text"
              placeholder=" Search"
              className=" md:w-[400px] inset-x-0 inset-y-0 dark:shadow-gray-800 bg-white outline-none shadow-inner rounded-lg pl-3 py-2 "
            />
            <button className="relative right-5 md:right-7">
              <BsSearch />
            </button>
          </div>
        </div>

        <div className={`z-50 flex flex-col bg-[#270722] md:flex-row md:static absolute gap-5 md:gap-10 items-center ${ !menu
              ? "top-16 right-0 md:px-0 px-5  py-2 duration-700 "
              : "right-0 -top-60 duration-1000"} `}>
          <div>
            {" "}
            {location.pathname != "/buynow" ? (
              <div
                onClick={() => cartCall()}
                className=" cursor-pointer flex items-center gap-3"
              >
                <FaCartShopping color="red" size={25} />
                <div>
                  <h1 className="text-lg font-bold text-white hover:text-red-600">
                    Cart
                  </h1>
                  <p className=" text-xs text-white">View your cart</p>
                </div>
              </div>
            ) : (
              <div className=" opacity-30 flex items-center gap-3">
                <FaCartShopping color="red" size={25} />
                <div>
                  <h1 className="text-lg font-bold text-white ">Cart</h1>
                  <p className=" text-xs text-white">View your cart</p>
                </div>
              </div>
            )}
          </div>

          <div className=" flex items-center gap-3">
            <div className="animate-pulse">
              <AiTwotoneThunderbolt color="red" size={25} />
            </div>

            <div
              className=" cursor-pointer"
              onClick={() => navigate("/", { state:1})}
            >
              <h1 className="text-lg font-bold text-white hover:text-red-600">
                Flash Sell
              </h1>
              <p className=" text-xs text-white">Special deals</p>
            </div>
          </div>
          <div className=" flex items-center gap-3">
            {user ? (
              <div className=" border-4 border-red-500  rounded-full ">
                <img
                  className=" w-20 p-2 rounded-full"
                  src={user.photoURL}
                  alt=""
                />
              </div>
            ) : (
              <FaUser color="red" size={25} />
            )}

            <div>
              {" "}
              <h1 className="text-lg font-bold text-white">
                {user ? user.displayName : "Account"}
              </h1>
              {user ? (
                <h1
                  onClick={logOut}
                  className=" hover:text-red-400 text-xs text-white cursor-pointer"
                >
                  LogOut
                </h1>
              ) : (
                <div className="flex gap-1">
                  <p
                    onClick={() => {
                      navigate('/login', { state: { from: location.pathname } });                    }}
                    className=" cursor-pointer hover:text-red-400 text-xs text-white"
                  >
                    Log in
                  </p>
                  <p className=" text-xs text-white"> Or</p>{" "}
                  <p
                    onClick={() => {
                      navigate('/login', { state: { from: location.pathname } });                    }}
                    className=" cursor-pointer hover:text-red-400 text-xs text-white"
                  >
                    Sign Up
                  </p>
                </div>
              )}
            </div>
          </div>
          <Link>
            <button className="group relative px-5 py-2.5 inline-flex justify-center items-center  rounded-md bg-gradient-to-r from-blue-800 via-red-500 to-violet-800 tracking-wide text-base text-white font-medium antialiased overflow-hidden active:top-0.5 focus:outline-none">
              {/* button::before */}
              <span className="absolute top-1/2 left-0 w-full opacity-0 transition-all duration-300 ease-in-out transform -translate-x-full -translate-y-1/2 group-hover:opacity-100 group-hover:translate-x-0">
                Custom PC
              </span>
              <span className="transition-all duration-500 ease-in-out transform group-hover:opacity-0 group-hover:translate-x-full group-hover:translate-y-0">
                PC Builder
              </span>
            </button>
          </Link>
        </div>
        <div color="white" className=" md:hidden ml-5">
          {menu ? (
            <div className=" rotate-180 duration-300 rounded-lg">
              <ImMenu color="white" onClick={handleMenuOpen} size={25} />
            </div>
          ) : (
            <div className=" rotate-90 duration-300  rounded-lg">
              <GiSplitCross color="white" onClick={handleMenuClose} size={25} />
            </div>
          )}
        </div>
      </div>
      {/* ----------------------------------------CartModal--------------------------------------------------- */}
      <dialog id="my_modal_6" className="modal mx-auto w-2/3">
        <div className="modal-box w-11/12 max-w-5xl">
          <h1 className="text-blue-700 pb-5 text-2xl font-bold text-center">
            Products in Cart
          </h1>
          <hr className="border-2 mb-2" />
          {Cart.length > 0 ? (
            <div>
              <div className="grid grid-cols-8 gap-2">
                <div className=" col-span-2">
                  <h1 className=" text-center text-gray-800">Image</h1>{" "}
                  <hr className=" border mx-8" />
                </div>
                <div className=" col-span-4">
                  <h1 className=" text-center text-gray-800">Name</h1>{" "}
                  <hr className=" border mx-2/3" />
                </div>
                <div className=" col-span-1">
                  <h1 className=" text-center text-gray-800">Price</h1>{" "}
                  <hr className=" border" />
                </div>
                <div>
                  <h1 className=" text-center text-gray-800"></h1>{" "}
                </div>
              </div>
              <div>
                {Cart.map((item) => (
                  <div key={item._id}>
                    {" "}
                    <div className=" grid grid-cols-8 items-center">
                      <img
                        className="w-16 col-span-2 mx-auto"
                        src={item.image}
                        alt=""
                      />
                      <p className=" col-span-4">{item.name}</p>
                      <p className=" text-end text-red-600 font-bold text-lg">
                        ${item.price}
                      </p>
                      <button className="flex hover:text-red-600 justify-end px-3">
                        <FaTrashAlt
                          className=""
                          onClick={() => handleDeletFromcart(item._id)}
                        />
                      </button>
                    </div>
                    <hr />
                  </div>
                ))}
              </div>

              <div className=" flex justify-around py-3">
                {location.pathname === "/buynow" ? (
                  ""
                ) : (
                  <button
                    onClick={() => {
                      navigate("/buynow", {
                        state: {
                          from: "/",
                          prop: Cart,
                          
                        },
                      });
                      document.getElementById("my_modal_6").close();
                    }}
                    className=" mx-auto px-8 bg-blue-500 text-white py-2 rounded-md btn hover:bg-blue-400"
                  >
                    Go for Check Out
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div>
              <img
                className=" w-2/4 mx-auto"
                src="https://cdn.dribbble.com/users/2046015/screenshots/5973727/06-loader_telega.gif"
                alt=""
              />
              <h1 className=" text-xl text-center font-bold">
                Your Cart is empty !! 😔
              </h1>
            </div>
          )}

          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button, it will close the modal */}
              <button className="btn btn-error text-white">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Header;
