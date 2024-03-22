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
      <div className="bg-[#F7F8FA] py-4 px-2 md:px-8 flex justify-between items-center border-b-2  transition-all">
        <LangEasyLogo />
        <div className="flex items-center gap-2">
          <span className="p-2 border rounded-[50%] h-10 w-10 flex items-center justify-center">
            {firstname?.charAt(0) + " " + lastname?.charAt(0)}
          </span>
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
            <div
              className="cursor-pointer "
              // onClick={() => {
              //   setShowLogOutBox(!showLogOutBox);
              // }}
            >
              <p className="text-[#19213D] font-[gilroy-medium] text-xs md:text-base font-normal flex items-center gap-1 ">
                <span>
                  {firstname} {lastname}
                </span>{" "}
                <DropdownIcon />
              </p>
              <p className="text-[#666F8D] text-[10px] md:text-xs font-normal">
                {email}
              </p>
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
