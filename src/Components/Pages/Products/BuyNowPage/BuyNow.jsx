import React, { useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
const stripePromise = loadStripe(import.meta.env.VITE_PK);
import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { InfinitySpin } from "react-loader-spinner";
import useAuth from "../../../Hooks/useAuth";
import ConfettiExplosion from "react-confetti-explosion";
import "./Custom.css";
import Swal from "sweetalert2";
import { useReactToPrint } from "react-to-print";
import { FaTrashAlt } from "react-icons/fa";

const CheckOutForm = ({

  Price,
  parameters,
  setCompleted,
  setPrint,
  setOrder,
  cart
}) => {
  const [ispaymentDone, setPaymentDoe] = useState(false);
  const { user } = useAuth();
  console.log(cart)
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [ClientSecret, setSecret] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    useAxiosPublic()
      .post("/payment", { Price })
      .then((res) => setSecret(res.data.clientSecret));
  }, []);

  const updateProductQuantity = async (element) => {
    const url = `http://localhost:5000/payment/update/${element.collection}/${element.id}`;
    // const updateValue = 20;
    const updateValue = element.quantity - 1;

    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          updateValue,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update quantity for ${element.name}`);
      }

      const data = await response.json();
      console.log(`Quantity updated for ${element.name}:`, data.modifiedCount);
      // Handle the response data as needed
    } catch (error) {
      console.error("Fetch request failed:", error.message);
      // Handle errors
    }
  };

  const ProductUpdate = async () => {
    try {
      for (const element of parameters) {
        await updateProductQuantity(element);
      }
    } catch (error) {
      console.error("Product update failed:", error.message);
    }
  };

  const SaveToDB = (data) => {
    fetch("http://localhost:5000/payment/save", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          console.log(data);
        }
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.elements.name.value;
    const phone = e.target.elements.phone.value;
    const email = e.target.elements.email.value;

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    const { error: confirmError, PaymentIntent } =
      await stripe.confirmCardPayment(ClientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user?.name,
            email: user?.email,
          },
        },
      });

    if (confirmError) {
      setMessage(confirmError.message);
    }

    if (error) {
      setMessage(error.message);
      setIsProcessing(false);
    } else {
      ProductUpdate();
      console.log(paymentMethod);
      const PaymentData = {
        userName: user?.displayName,
        userEmail: user?.email,
        CardEmail: email,
        CardUser: name,
        TotalCost: Price,
        TransectionId: paymentMethod.id,
        Card: paymentMethod?.card.brand,
        Phone: phone,
      };
      SaveToDB(PaymentData);
      setPrint(true);
      setOrder(PaymentData);

      setIsProcessing(false);
      setCompleted(true);
      setPaymentDoe(true);
    }
  };

  return (
    <div className="px-5">
      <form
        id="payment-form"
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >
        <label className="input hover:border-blue-500  input-bordered flex items-center gap-2 w-full">
          Name
          <input
            required
            name="name"
            type="text"
            className="grow outline-none px-5 w-full"
            placeholder="@Mr.Example"
          />
        </label>

        <div className="flex justify-between gap-4">
          <label className="input hover:border-blue-500 input-bordered flex items-center gap-2 w-full">
            Phone
            <input
              required
              name="phone"
              type="text"
              className="grow outline-none px-5 w-full"
              placeholder="@016XXXXXXX"
            />
          </label>

          <label className="input hover:border-blue-500 input-bordered flex items-center flex-grow gap-2 w-full">
            Email
            <input
              name="email"
              type="email"
              className="grow outline-none w-full"
              placeholder="@example@gmail.com"
              required
            />
          </label>
        </div>

        <label className="px-5 py-2 flex flex-col gap-2 hover:border-blue-500 border rounded-md input-bordered w-full">
          Card Number
          <CardElement options={{ style: { base: { fontSize: "16px" } } }} />
        </label>
        {ispaymentDone ? (
          <div className=" border mx-auto w-6/12 py-2 my-2 text-center rounded-md disabled text-white bg-[#36d636]">
            🎊 Payment Completed 🎊
          </div>
        ) : (
          <div className="flex justify-around">
            {!isProcessing ? (
              <button
                type="submit"
                className="bg-blue-600 px-3 py-2 my-4 rounded-md disabled:opacity-30 w-2/6  text-white hover:opacity-75"
                disabled={!stripe || !ClientSecret}
              >
                💵 {"Pay now"} {Price}$
              </button>
            ) : (
              <div className=" ">
                <InfinitySpin
                  visible={true}
                  hight="200"
                  width="200"
                  color="#4fa94d"
                  ariaLabel="infinity-spin-loading"
                />
                <h1 className="text-center text-xl text-green-600 blinking-glowing-text">
                  Processing
                </h1>
              </div>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

const BuyNow = () => {
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location.state);
  // const State = location.state;
  const [State, setPreState] = useState(location.state);
  const from = State ? State.from : "/";
  const [completed, setCompleted] = useState(false);
  const [Print, setPrint] = useState(false);
  const [Order, setOrder] = useState({});
  console.log("order", Order);
  const totalPrice = State?.prop.reduce((sum, item) => {
    return sum + item.price;
  }, 0);
  const printref = useRef();
  const handlePrint = useReactToPrint({
    content: () => printref.current,
  });
  const handleDelete = (index) => {
    Swal.fire({
      title: `Are you sure you don't want to purchase this right now?`,
      text: "This item will stay in your cart; you can purchase it later.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        if (index !== -1) {
          const updatedProp = [...State.prop];
          updatedProp.splice(index, 1);
          setPreState((prevState) => ({
            ...prevState,
            prop: updatedProp,
          }));
          Swal.fire({
            position: "center",
            icon: "success",
            title: `Successfully removed!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };

  return (
    <div className="bg-blue-100 px-10">
      <div className="grid grid-cols-2 w-full py-10 gap-5">
        <div id="detail" className=" pt-5 pb-5  bg-white rounded-md ">
          <h1 className="text-blue-700 text-xl font-bold  text-center">
            Products detail
          </h1>
          <hr className=" border-2 my-3" />
          {State.prop.length > 0 ? (
            <div>
              <div className="grid px-5 grid-cols-6">
                <div className="px-3 text-center">
                  {" "}
                  <h1> Image </h1>
                  <hr className=" border-2 my-3" />
                </div>
                <div className="px-3 col-span-3 text-center">
                  {" "}
                  <h1> Name </h1>
                  <hr className=" border-2 my-3" />
                </div>
                <div className="px-3 text-center">
                  {" "}
                  <h1> Price </h1>
                  <hr className=" border-2 my-3" />
                </div>
              </div>
              {State.prop?.map((item, index) => (
                <div key={index} className="grid px-5 items-center grid-cols-6">
                  <img src={item.image} className=" w-24 mx-auto" alt="" />
                  <h1 className=" text-center col-span-3 px-3">{item.name}</h1>
                  <h1 className=" text-center text-blue-700 px-3">
                    {item.price}$
                  </h1>
                  <FaTrashAlt
                    className="cursor-pointer mx-auto text-red-600"
                    onClick={() => handleDelete(index)}
                  />
                </div>
              ))}
              <hr className=" border-2 my-3" />
              <div className="grid grid-cols-6 px-5">
                <h1 className=" col-span-4 text-end">Total Price : </h1>{" "}
                <p className=" text-xl text-center font-bold text-red-700">
                  {totalPrice} $
                </p>
              </div>
              <div className="flex justify-around pt-3">
                <div
                  onClick={() => {
                    navigate(from);
                  }}
                  className="btn mx-auto bg-red-600 text-white hover:text-red-600 hover:border-red-600 shadow-lg border-2"
                >
                  Cancel & Go Back
                </div>
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
                No Products are selected !! 😔
              </h1>
              <div className="flex justify-around pt-3">
                <div
                  onClick={() => {
                    navigate("/");
                  }}
                  className="btn mx-auto bg-red-600 text-white hover:text-red-600 hover:border-red-600 shadow-lg border-2"
                >
                  Go Back
                </div>
              </div>
            </div>
          )}
        </div>
        {/* -------------------------------------Payment--------------------------------------------- */}
        <div id="detail" className=" pt-5 pb-5  bg-white rounded-md ">
          <h1 className="text-blue-700 text-xl font-bold  text-center">
            Payment Process
          </h1>
          <hr className=" border-2 my-3" />

          <div>
            <Elements stripe={stripePromise}>
              <CheckOutForm
                Price={totalPrice}
                parameters={State.prop}
                setCompleted={setCompleted}
                setPrint={setPrint}
                setOrder={setOrder}
                cart={State}
              />
            </Elements>
          </div>
        </div>
      </div>
      {/*  */}
      <div className=" ml-[600px]">
        {completed && (
          <ConfettiExplosion
            force={0.9}
            duration={2500}
            particleSize={20}
            particleCount={500}
            width={1600}
          />
        )}
      </div>
      {Object.keys(Order).length > 0 ? (
        <div ref={printref} className="bg-white py-6">
          <div className="  text-center py-4 rounded-md w-full text-4xl font-bold text-violet-700">
            Galaxytech
          </div>
          <hr className="border-2 my-2 mx-28 border-gray-600" />
          <div className=" grid grid-cols-4 bg-blue-300 items-center px-20">
            <h1 className=" text-4xl font-bold col-span-2 text-[#4749ce]">
              Invoice
            </h1>
            <div className=" text-end text-blue-800">
              <h1>📞 +88016XXXXXXXX</h1>
              <h1>✉️ gt@example.com</h1>
              <a className="underline">🌐 www.galaxytech.com</a>
            </div>
            <div className=" text-end text-blue-800">
              <h1>Address</h1>
              <h1>BaitulAman</h1>
              <h1>Faridpur</h1>
              <h1>Bangladesh</h1>
            </div>
          </div>
          <div className=" text-lg font-semibold py-3 px-20 grid grid-cols-2">
            <div className="">
              <div>
                {" "}
                <h1 className="text-center">Billed To</h1>
                <hr className="border-2 my-2 mx-20 border-gray-400" />
                <h1>Client Name: {Order?.userName}</h1>
                <h1>Client Email: {Order?.userEmail}</h1>
                <h1>Client Phone: {Order?.Phone}</h1>
              </div>

              <h1 className="text-center">Card Details</h1>
              <hr className="border-2 my-2 mx-20 border-gray-400" />
              <h1>Card Name: {Order?.Card}</h1>
              <h1>Card User: {Order?.CardUser}</h1>
              <h1>Card Email: {Order?.CardEmail}</h1>
            </div>
            <div>
              <h1 className="text-center">Invoice</h1>
              <hr className="border-2 my-2 mx-28 border-gray-600" />
              <h1>
                Invoice id :{" "}
                <span className="text-red-700 underline">
                  {Math.floor(10000000 + Math.random() * 90000000)}
                </span>
              </h1>
              <h1>
                Transaction id :{" "}
                <span className="text-red-700 underline">
                  {Order?.TransectionId}
                </span>
              </h1>
              <h1 className="py-5">
                Transaction Amount:{" "}
                <span className="text-4xl text-blue-600">
                  $ {parseFloat(Order?.TotalCost).toFixed(2)}
                </span>
              </h1>
            </div>
          </div>
          <div>
            <h1 className="text-blue-700 text-xl font-bold  text-center">
              Products detail
            </h1>
            <hr className=" border-2 my-3" />
            <div className="grid px-5 grid-cols-4">
              <div className="px-3 text-center">
                {" "}
                <h1> Image </h1>
                <hr className=" border-2 my-3" />
              </div>
              <div className="px-3 col-span-2 text-center">
                {" "}
                <h1> Name </h1>
                <hr className=" border-2 my-3" />
              </div>
              <div className="px-3 text-center">
                {" "}
                <h1> Price </h1>
                <hr className=" border-2 my-3" />
              </div>
            </div>
            {State.prop.map((item, index) => (
              <div key={index} className="grid px-5 items-center grid-cols-4">
                <img src={item.image} className=" w-24 mx-auto" alt="" />
                <h1 className=" text-center col-span-2 px-3">{item.name}</h1>
                <h1 className=" text-center text-blue-700 px-3">
                  {item.price}$
                </h1>
              </div>
            ))}
            <hr className=" border-2 my-3" />
            <div className="grid grid-cols-4 px-5">
              <h1 className=" col-span-3 text-end">Total Price : </h1>{" "}
              <p className=" text-xl text-center font-bold text-red-700">
                {totalPrice} $
              </p>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      <div>
        {Print ? (
          <div className="flex justify-around">
            <button
              onClick={handlePrint}
              className="text-xl font-bold px-5 py-2 my-5 rounded-md bg-green-600 text-white hover:bg-green-500 btn "
            >
              Print the receipt
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default BuyNow;
