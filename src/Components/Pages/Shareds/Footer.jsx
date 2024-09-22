import React from "react";
import { FaFacebook, FaPhoneAlt, FaTwitter, FaYoutube } from "react-icons/fa";
import { LiaAppStoreIos } from "react-icons/lia";
import { BiLogoGmail } from "react-icons/bi";
import { PiGooglePlayLogo } from "react-icons/pi";
import { Link } from "react-router-dom";
import { AiOutlineCopyright } from "react-icons/ai";

const Footer = () => {
  // ======================== To do ==========================
  // # make use of email.js
  // # make use of phone call, implement facility to make phone call
  return (
    <div className="bg-[#120f39] px-6 md:px-20 text-gray-400 py-3 md:py-8">
      <div className="flex md:flex-row flex-col gap-5 md:gap-0 ">
        

        <div className="flex flex-col gap-5">
          <h3 className="text-white tracking-[3px]">SUPPORT </h3>
          <a href="tel:+8801580812107" className=" rounded-[50px] cursor-pointer hover:border-red-500 border-gray-800 border-2 py-3 pl-3 pr-10 flex gap-3 items-center">
            {" "}
            <FaPhoneAlt size={20} color="white" />
            <div className=" h-[3em] w-px  bg-gradient-to-tr from-transparent via-neutral-700 to-transparent opacity-100 dark:opacity-100"></div>
            <div className="flex flex-col items-start">
              <p className="text-xs">10 AM - 7 PM</p>
              <h3 className=" text-xl font-semibold text-red-500">01580812107</h3>
            </div>
          </a>
          <a href="mailto:joysutradharaj@gmail.com" className=" rounded-[50px] hover:border-red-500 border-gray-800 border-2 py-3 pl-3 pr-10 flex gap-3 items-center">
            {" "}
            <BiLogoGmail size={20} color="white" />
            <div className=" h-[3em] w-px  bg-gradient-to-tr from-transparent via-neutral-700 to-transparent opacity-100 dark:opacity-100"></div>
            <div className="flex flex-col items-start">
              <p className="text-xs">Mail Us At</p>
              <h3 className=" text-xl font-semibold text-red-500">
                gt@example.com
              </h3>
            </div>
          </a>
        </div>
        <div className="flex md:ml-16 flex-col gap-5">
          <h3 className="text-white tracking-[3px]">ABOUT US </h3>
          <div className="flex gap-5
          0">
            <div className=" flex flex-col items-start gap-7">
              <Link className=" hover:text-red-500 hover:underline text-sm">
                EMI Terms
              </Link>
              <Link className=" hover:text-red-500 hover:underline text-sm">
                Privacy Policy
              </Link>
              <Link className=" hover:text-red-500 hover:underline text-sm">
                GT Points Policy
              </Link>
              <Link className=" hover:text-red-500 hover:underline text-sm">
                Brands
              </Link>
            </div>
            <div className=" flex flex-col items-start gap-7">
              <Link className=" hover:text-red-500 hover:underline text-sm">
                About Us
              </Link>
              <Link className=" hover:text-red-500 hover:underline text-sm">
                Terms and conditions
              </Link>
              <Link className=" hover:text-red-500 hover:underline text-sm">
                Online Service Support
              </Link>
              <Link className=" hover:text-red-500 hover:underline text-sm">
                Blogs
              </Link>
            </div>
            <div className=" flex flex-col items-start gap-7">
              <Link className=" hover:text-red-500 hover:underline text-sm">
                Online Delivery
              </Link>
              <Link className=" hover:text-red-500 hover:underline text-sm">
                Return and Refund Policy
              </Link>
              <Link className=" hover:text-red-500 hover:underline text-sm">
                Contact Us
              </Link>
              <Link className=" hover:text-red-500 hover:underline text-sm">
                Complain/Advice
              </Link>
            </div>
          </div>
        </div>
        <div className="flex md:w-1/4 md:ml-20 flex-col gap-5">
          <h3 className="text-white tracking-[3px]">STAY CONNECTED </h3>
          <p className=" text-white text-sm">Galaxy Tech Ltd</p>
          <p className="hover:text-red-500 text-sm">
            Head Office: 28 Kazi Nazrul Islam Ave,Navana Zohura Square, Dhaka
            1000(Just kidding)
          </p>
          <p className="text-sm">Email: </p>
          <p className="hover:text-red-500 text-sm">
            galaxytechweb@example.com{" "}
          </p>
        </div>
      </div>
      <hr className="my-3 h-0.5 border-t-0 bg-gray-800 opacity-100 dark:opacity-50" />
      <div className="flex md:flex-row flex-col md:justify-between">
      <div className=" flex py-5 md:py-0 md:items-center md:flex-row flex-col gap-5">
        <><p className=" text-xs">
          Experience the Galaxy Tech mobile app. Get it on :
        </p></>
        <><button className="rounded-xl hover:border-red-500 border-[1px] w-36 border-gray-400 flex items-center gap-2 p-2">
          <PiGooglePlayLogo size={25} />
          <div className=" flex flex-col items-start leading-[12px]">
            <p className=" text-[10px]">Download from</p>{" "}
            <h1 className="font-semibold text-white">Google Play</h1>
          </div>
        </button>
        <button className="rounded-xl hover:border-red-500 border-[1px] w-36 border-gray-400 flex items-center gap-2 p-2">
          <LiaAppStoreIos size={25} />
          <div className=" flex flex-col items-start leading-[12px]">
            <p className=" text-[10px]">Download from</p>{" "}
            <h1 className="font-semibold text-white">Apple Store</h1>
          </div>
        </button></>
        
        
      </div>
      <div className="flex gap-2 items-center">
        <FaFacebook size={40}/>
        <FaYoutube size={40}/>
        <FaTwitter size={40}/>
      </div>

      </div>
      <hr className="my-3 h-0.5 border-t-0 bg-gray-800 opacity-100 dark:opacity-50" />
<div className="flex justify-between text-xs">
    <div className="flex items-center gap-1"><AiOutlineCopyright/> 2023 Galaxy Tech | All right reserved ❤️Joy SD❤️</div>
    <div>Powered by : Galaxy Tech</div>
</div>
    </div>
  );
};

export default Footer;
