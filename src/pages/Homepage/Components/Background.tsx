import { Card } from "antd";
import Footer from "../../../assets/Logos/AwarriLogo/Footer";
import LangEasyLogo from "../../../assets/Logos/LangeasyLogo/LangEasyLogo";
import ArrowIcon from "../../../assets/icons/ArrowIcon";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../../../utils/routes";
import { useEffect } from "react";
import WelcomeText from "./WelcomeText";

const Background: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (
      // sessionStorage.getItem(import.meta.env.VITE_APP_USER_INFO) &&
      sessionStorage.getItem(import.meta.env.VITE_APP_TOKEN)
    ) {
      navigate(ROUTES.DASHBOARD, { replace: true });
    }
  }, [navigate]);

  return (
    <div className="  bg-gradient-to-tr from-[#0B6A96] from-1% via-[#d4effa] via-1% to-[#D0EBFF]  min-h-[100svh] relative">
      <div className="grid grid-rows-[4rem_1fr_2rem] min-h-[80svh] overflow-hidden ">
        <div className="flex justify-start px-3 pt-3 sm:px-8 ">
          <LangEasyLogo />
        </div>

        <div className="flex flex-col gap-[6rem] justify-center sm:flex-row items-center mx-10">
          <WelcomeText />
          <Card className=" h-[80svh] overflow-y-scroll bg-white rounded-3xl w-full">
            {location.pathname !== "/" && (
              <ArrowIcon
                className="cursor-pointer "
                onClick={() => {
                  navigate(ROUTES.HOMEPAGE);
                }}
              />
            )}

            <div className="w-full ">
              <Outlet />
            </div>
          </Card>
        </div>
        <div className="absolute flex items-start justify-end bottom-2 right-4">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Background;
