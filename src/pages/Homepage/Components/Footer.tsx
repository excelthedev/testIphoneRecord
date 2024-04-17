import AwarriLogo from "../../../assets/Logos/AwarriLogo/Group.png";
import Term from "./Term";
import Privacy from "./Privacy";
import { useState } from "react";
const Footer = () => {
  const [openTermModal, setOpenTermModal] = useState<boolean>(false);
  const [openPrivacyModal, setOpenPrivacyModal] = useState<boolean>(false);
  return (
    <div className=" flex justify-between flex-col gap-2 font-[gilroy-medium] sm:items-center sm:flex-row text-[12px] text-[#49494B] font-normal px-8 border-t-2 border-gradient-to-tr from-[#0B6A96] from-1% via-[#d4effa] via-1% to-[#D0EBFF] h-max">
      {openTermModal && (
        <Term openModal={openTermModal} setOpenModal={setOpenTermModal} />
      )}
      {openPrivacyModal && (
        <Privacy
          openModal={openPrivacyModal}
          setOpenModal={setOpenPrivacyModal}
        />
      )}
      <p className=" text-center">@2024 LangEasy. All Rights Reserved</p>

      <ul className=" justify-between flex flex-col md:flex-row sm:flex-row md:gap-7 gap-1 items-center">
        <a href="">
          <li>About</li>
        </a>

        <li
          className=" font-[gilroy-medium] text-black cursor-pointer"
          onClick={() => {
            setOpenTermModal(true);
          }}
        >
          Terms of Use
        </li>

        <li
          className=" font-[gilroy-medium] text-black cursor-pointer"
          onClick={() => {
            setOpenPrivacyModal(true);
          }}
        >
          Privacy Policy
        </li>
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
  );
};

export default Footer;
