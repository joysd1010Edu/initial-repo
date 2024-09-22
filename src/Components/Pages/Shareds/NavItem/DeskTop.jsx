import React, {useState} from "react";
import {RxTriangleRight} from "react-icons/rx";
import {NavLink} from "react-router-dom";

const DeskTop = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [Submenu, setMenu] = useState(false);
    const subMenuHandlerOpen = () => {
        setMenu(true);
    };
    const subMenuHandlerClose = () => {
        setMenu(false);
    };

    const handleOpen = () => {
        setIsDropdownOpen(true);
    };
    const handleClose = () => {
        setIsDropdownOpen(false);
    };
    return (
    <div>
        <div className="dropdown dropdown-hover ">
            <label tabIndex={0}
                className={
                    ` hover:text-[#FF0303] ${
                        !isDropdownOpen ? " text-black" : "text-[#FF0303]"
                    } text-base font-semibold`
                }
                onMouseEnter={handleOpen}
                onMouseLeave={handleClose}>
                <NavLink to={"desktop"}>Desktop</NavLink>
            </label>
            <div onMouseEnter={handleOpen}
                onMouseLeave={handleClose}
                tabIndex={0}
                className="dropdown-content z-[1]  flex flex-col   bg-white shadow-md  border-t-4 border-t-[#FF0303] w-40">
                <div onMouseEnter={subMenuHandlerOpen}
                    onMouseLeave={subMenuHandlerClose}
                    className="dropdown dropdown-hover dropdown-right hover:text-white text-sm hover:bg-[#FF0303] py-1 px-3">
                    <div className="flex justify-between items-center">
                      <NavLink to={'desktopOffer'}>Desktop Offer</NavLink>   {
                        !Submenu && <RxTriangleRight className="text-gray-400"/>}
                    </div>

                    {
                    Submenu && (<ul tabindex="0" className="dropdown-content z-[1]  shadow  bg-white  w-40">
                        <li className=" text-black hover:text-white text-sm hover:bg-[#FF0303] py-1 px-3">
                           <NavLink to={'intelpc'}>Intel PC</NavLink> 
                        </li>
                        <li className=" text-black hover:text-white text-sm hover:bg-[#FF0303] py-1 px-3">
                        <NavLink to={'amdpc'}>AMD PC</NavLink>   
                        </li>
                    </ul>)
                } </div>
                <div className=" hover:text-white text-sm hover:bg-[#FF0303] py-1 px-3">
                    <NavLink to={'Brand'}> Brand PC</NavLink>
                   
                </div>
                 <div className=" hover:text-white text-sm hover:bg-[#FF0303] py-1 px-3">
                <NavLink to={'Apple'}>Apple iMac</NavLink>  
                </div>
                <div className="dropdown dropdown-hover hover:text-white text-sm hover:bg-[#FF0303] py-1 px-3">
                <NavLink to={'Mini'}>Mini PC</NavLink>  
                </div>
                <div className="dropdown dropdown-hover hover:text-white text-sm hover:bg-[#FF0303] py-1 px-3">
                <NavLink to={'AllPC'}>Show All PC</NavLink>  
                </div>
            </div>
        </div>
    </div>);
};

export default DeskTop;
