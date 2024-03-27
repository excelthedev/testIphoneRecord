import { useState } from "react";
import LangEasyLogo from "../../../assets/Logos/LangeasyLogo/LangEasyLogo";
import DropdownIcon from "../../../assets/icons/DropdownIcon";
import LogoutIcon from "../../../assets/icons/LogoutIcon";
import { PageModal } from "../../../components/Modal";
import { Popover } from "antd";
import { useNavigate } from "react-router";
import { ROUTES } from "../../../utils/routes";

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

  return (
    <>
      <div className="bg-[#FFFFFF] py-3 sm:py-6 px-2 md:px-8 flex justify-between items-center border-[0.6px] rounded-xl  transition-all w-full ">
        <LangEasyLogo />
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-5">
          <span className="flex items-center gap-2 font-[gilroy-medium] cursor-pointer">
            <p className="w-3 h-3 rounded-[50%] bg-black"></p>
            <p className="text-xs font-semibold lg:text-lg"> Text Collection</p>
          </span>
          <span className="flex items-center gap-2 font-[gilroy-medium] cursor-pointer">
            <p className="w-3 h-3 rounded-[50%] border border-[#666F8D]"></p>
            <p className=" text-xs lg:text-lg font-semibold text-[#666F8D]">
              Audio Collection
            </p>
          </span>
        </div>
        <div className="flex items-center gap-2">
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
              <span className="p-2 border rounded-[50%] h-10 w-10 flex items-center justify-center">
                {firstname?.charAt(0) + " " + lastname?.charAt(0)}
              </span>
              <div className="cursor-pointer ">
                <p className="text-[#19213D] font-[gilroy-medium] hidden md:text-base font-normal md:flex items-center gap-1 ">
                  <span>
                    {firstname} {lastname}
                  </span>{" "}
                  <DropdownIcon />
                </p>
                <p className="text-[#666F8D] text-[10px] md:text-xs font-normal hidden md:block">
                  {email}
                </p>
              </div>
            </div>
          </Popover>
        </div>
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
