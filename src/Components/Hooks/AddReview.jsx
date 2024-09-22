import React, { useState } from "react";
import ReactStars from "react-rating-stars-component";
import useReview from "./useReview";
import { TbReportSearch } from "react-icons/tb";
import useAuth from "./useAuth";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";

const AddReview = ({ state }) => {
  const [Rating, setRating] = useState(0);

  const [Review, refetch] = useReview(state);
  const { user } = useAuth();
  const navigate = useNavigate();

  const ratingChanged = (newRating) => {
    setRating(newRating);
  };

  const handleReviewSubmit = (e) => {
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
    if (Rating === 0) {
      document.getElementById("errorMessage").innerText =
        "Please provide a rating!";
      return; // Exit the function if rating is not provided
    }

    // Clear the error message if rating is provided
    document.getElementById("errorMessage").innerText = "";
    const newReview = {
      userImage: user?.photoURL,
      email: user?.email,
      Review: inputValue,
      userName: user?.displayName,
      Product: state,
      Rating: Rating,
    };

    fetch("http://localhost:5000/review", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newReview),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          e.target.reset();
          document.getElementById("my_modal_3").close();
          refetch();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Thanks for your Review",
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

  return (
    <div className=" bg-white  rounded-md">
      <section className="bg-white rounded-md py-5 px-5 mt-5">
        <div className="flex justify-between items-center pb-3">
          <div>
            <h1 className="text-xl font-semibold">Reviews ({Review.length})</h1>
            <p className=" text-slate-600">All reviews of Consumers</p>
          </div>
          <button
            className="bg-white duration-500 border-2 border-blue-700 text-blue-700 hover:text-white hover:bg-blue-700 rounded-md px-3 py-2 "
            onClick={() => document.getElementById("my_modal_3").showModal()}
          >
            Place Review
          </button>
        </div>
        <hr />
        <div className="py-5">
          {Review.length == 0 ? (
            <div>
              <div className="w-36 h-36 bg-blue-50 mx-auto  rounded-full flex flex-col justify-around">
                <TbReportSearch
                  size={70}
                  color="#3649BA"
                  className="mx-auto my-auto"
                />
              </div>
              <h1 className="text-slate-600 text-center pt-4">
                This item has no Review. Be first to Place a Review.
              </h1>
            </div>
          ) : (
            <div>
              {Review.map((item, index) => (
                <div key={index}>
                  <div className="py-3 flex items-center gap-5">
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
                      <h1 className="font-bold">◈ {item.Review} </h1>
                      <ReactStars
                        count={5}
                        value={item.Rating}
                        size={24}
                        isHalf={true}
                        emptyIcon={<i className="far fa-star"></i>}
                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                        fullIcon={<i className="fa fa-star"></i>}
                        activeColor="#ffd700"
                        color="#C4E4FF"
                        edit={false}
                      />
                    </div>
                  </div>
                  <hr />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ---------------------modal------------------------------ */}

        <dialog id="my_modal_3" className="modal ">
          <div className="modal-box bg-indigo-50">
            <h3 className="font-bold text-lg text-gray-800">Place a Review!</h3>
            <form onSubmit={handleReviewSubmit}>
              <input
                type="text"
                required={true}
                name="inputText"
                placeholder="Express  your thoughts for this product here..."
                className="py-4 text-black border-2 rounded-xl my-3 px-3 w-full bg-white border-blue-400 outline-none"
              />
              <h1 className=" text-gray-700">Give a rating </h1>
              <ReactStars
                count={5}
                onChange={ratingChanged}
                size={30}
                isHalf={true}
                emptyIcon={<i className="far fa-star"></i>}
                halfIcon={<i className="fa fa-star-half-alt"></i>}
                fullIcon={<i className="fa fa-star"></i>}
                activeColor="#ffd700"
                color="#86A7FC"
              />
              <input
                type="submit"
                value="Submit"
                className="btn btn-primary my-3"
              />
              <div id="errorMessage" className="text-red-600"></div>
            </form>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
        {/* ------------------------------modal---------------------------- */}
      </section>
    </div>
  );
};

export default AddReview;
