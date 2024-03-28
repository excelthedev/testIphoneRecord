import { useState } from "react";
import LangEasyLogo from "../../../assets/Logos/LangeasyLogo/LangEasyLogo";
import DropdownIcon from "../../../assets/icons/DropdownIcon";
import LogoutIcon from "../../../assets/icons/LogoutIcon";
import { PageModal } from "../../../components/Modal";
import { Popover } from "antd";
import { useNavigate } from "react-router";
import { ROUTES } from "../../../utils/routes";
import HamburgerIcon from "../../../assets/icons/HamburgerIcon";

export type userInfoType = {
  _id?: string;
  firstname?: string;
  lastname?: string;
  email: string;
  gender?: string;
  dateOfBirth?: string;
  stateOfOrigin?: string;
  tribe?: string;
  ethnicity?: string;
};
export type userInfoObject = {
  _id?: string;
  firstname: string;
  lastname: string;
  email: string;
};

const Header: React.FC<userInfoObject> = ({ email, firstname, lastname }) => {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);
  // const state = useAppSelector((state) => {
  //   return state.app;
  // });
  // const [logoutHandler, result] = useAuthPostDataMutation();

  const handleLogout = () => {
    // logoutHandler({
    //   ...state,
    //   postUrl: endpoints.auth.logout,
    //   request: {
    //     _id: _id,
    //   },
    // });
    sessionStorage.clear();
    navigate(ROUTES.HOMEPAGE, { replace: true });
  };
  const menushowStyle = ` ${openMenu ? `flex` : `hidden`} `;

  return (
    <>
      <div className="bg-[#FFFFFF] relative py-3 px-2 md:px-6 border-[0.6px] rounded-xl transition-all w-full flex justify-between items-center z-[3]  ">
        <LangEasyLogo />

        <ul
          className={
            menushowStyle +
            ` md:w-full max-w-[65%] md:border-none md:flex md:flex-row md:justify-between md:max-w-[65%]  md:bg-inherit md:relative md:top-[0px] md:right-[0px] md:p-0 md:rounded-none rounded-xl flex-col gap-3 top-14 bg-white w-max absolute right-0 text-center   border p-3  `
          }
        >
          <li className="flex items-center gap-2 font-[gilroy-medium] cursor-pointer justify-center">
            <p className="w-3 h-3 rounded-[50%] bg-black"></p>
            <p className="text-xs font-semibold sm:text-sm md:text-lg">
              Text Collection
            </p>
          </li>
          <li className="flex items-center gap-2 font-[gilroy-medium] cursor-pointer justify-center">
            <p className="w-3 h-3 rounded-[50%] border border-[#666F8D]"></p>
            <p className=" text-xs sm:text-sm md:text-lg font-semibold text-[#666F8D]">
              Audio Collection
            </p>
          </li>
          <li className="flex items-center gap-2">
            <Popover
              showArrow={false}
              content={
                <div
                  className="bg-[#FFFFFF] flex items-center mx-4 my-2 gap-2 cursor-pointer"
                  onClick={() => {
                    setOpenModal(!openModal);
                  }}
                >
                  <p>Log out</p>
                  <LogoutIcon />
                </div>
              }
            >
              <div className="flex gap-2">
                <span className="p-2 border rounded-[50%] h-10 w-10 hidden  md:flex items-center justify-center">
                  {firstname?.charAt(0) + " " + lastname?.charAt(0)}
                </span>
                <div className="cursor-pointer ">
                  <p className="text-[#19213D] font-[gilroy-medium] text-sm  md:text-base font-normal flex items-center gap-1 ">
                    <span>
                      {firstname} {lastname}
                    </span>{" "}
                    <DropdownIcon />
                  </p>
                  <p className="text-[#666F8D] text-[10px] sm:text-xs font-normal ">
                    {email}
                  </p>
                </div>
              </div>
            </Popover>
          </li>
        </ul>

        <HamburgerIcon
          className="z-10 block md:hidden"
          onClick={() => {
            setOpenMenu(!openMenu);
          }}
        />
      </div>
      <PageModal
        openModal={openModal}
        handleCancel={() => {
          setOpenModal(!openModal);
        }}
        onOk={() => {
          handleLogout();
        }}
      >
        <p className="text-center font-[gilroy-regular]">
          Are you sure you want to log out ?
        </p>
      </PageModal>
    </>
  );
};

export default Header;
