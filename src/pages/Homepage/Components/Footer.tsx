import React from "react";
import AwarriLogo from "../../../assets/Logos/AwarriLogo/Group.png";

const Footer = () => {
  return (
    <>
      <hr className=" border bg-red-800 w-full"></hr>
      <div className=" flex justify-between flex-col gap-2 font-[gilroy-medium] sm:items-center sm:flex-row text-[12px] text-[#49494B] font-normal px-8">
        <p className=" text-center">@2024 LangEasy. All Rights Reserved</p>

        <ul className=" justify-between flex md:gap-7 gap-4 items-center">
          <li>About</li>
          <li>Terms of Use</li>
          <li>Privacy Policy</li>
        </ul>

        <span className=" flex items-center justify-end gap-2 ">
          <p>Powered by</p>
          <img
            src={AwarriLogo}
            alt=""
            className=" w-[3.125rem] h-[1.3125rem] object-contain"
          />
        </span>
      </div>
    </>
  );
};

export default Footer;
