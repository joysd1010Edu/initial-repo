import React, { useState } from "react";
import { RxTriangleRight } from "react-icons/rx";
import { NavLink } from "react-router-dom";
const Components = () => { const [isDropdownOpen, setIsDropdownOpen] = useState(false);
 

    const handleOpen = () => {
      setIsDropdownOpen(true);
    };
    const handleClose = () => {
      setIsDropdownOpen(false);
    };
    return (
      <div>
        <div className="dropdown dropdown-hover ">
          <label
            tabIndex={0}
            className={` hover:text-[#FF0303] ${
              !isDropdownOpen ? " text-black" : "text-[#FF0303]"
            } text-base font-semibold`}
            onMouseEnter={handleOpen}
            onMouseLeave={handleClose}
          >
            <NavLink to={"laptop"}>Components</NavLink>
          </label>
          <div
            onMouseEnter={handleOpen}
            onMouseLeave={handleClose}
            tabIndex={0}
            className="dropdown-content z-[1]  flex flex-col   shadow-md bg-base-100 border-t-4 border-t-[#FF0303] w-36"
          >
            <div className=" hover:text-white text-sm hover:bg-[#FF0303] py-1 px-3">
              <NavLink to={"Asus"}>Asus</NavLink>
            </div>
            <div className=" hover:text-white text-sm hover:bg-[#FF0303] py-1 px-3">
              <NavLink to={"HP"}> HP</NavLink>
            </div>
            <div className=" hover:text-white text-sm hover:bg-[#FF0303] py-1 px-3">
              <NavLink to={"Dell"}>Dell</NavLink>
            </div>
            <div className=" hover:text-white text-sm hover:bg-[#FF0303] py-1 px-3">
              <NavLink to={"MacBook"}>MacBook</NavLink>
            </div>
            
          </div>
        </div>
      </div>
    );
  };

export default Components;