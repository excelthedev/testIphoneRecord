import React from "react";
import AwarriLogo from "../../../assets/Logos/AwarriLogo/Group.png";

const Footer = () => {
  return (
    <div className=" flex justify-between font-[gilroy-regular] text-[12px] px-8 py-10 flex-wrap text-[#49494B]">
      <p>@2024 LangEasy. All Rights Reserved</p>

      <span className=" flex flex-wrap gap-7">
        <p>About</p>
        <p>Terms of Use</p>
        <p>Privacy Policy</p>
      </span>

      <span className=" flex flex-wrap">
        <p>Powered by</p>
        <img src={AwarriLogo} alt="" className=" w-[3.125rem] h-[1.3125rem]" />
      </span>
    </div>
  );
};

export default Footer;
