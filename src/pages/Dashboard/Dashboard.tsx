import { useEffect, useState } from "react";
import { setAllAppState, useGetDataQuery } from "../../store";
import Header from "./components/Header";

import { endpoints } from "../../store/api/endpoints";
import { Progress, Spin } from "antd";
import { userInfoObject } from "./components/Header";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Recording from "../../assets/icons/Recording";
import Translate from "../../assets/icons/Translate";
import Speak from "../../assets/icons/Speak";
import SentenceBank from "./components/SentenceBank";
import MicIcon from "../../assets/icons/MicIcon";
import Button from "../../components/Button";
import Footer from "../Homepage/Components/Footer";

const Dashboard = () => {
  const { data, isFetching, isLoading } = useGetDataQuery({
    getUrl: endpoints.user.getUserInfo,
  });
  const [userInfo, setUserInfo] = useState<userInfoObject>();
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => {
    return state.app;
  });
  useEffect(() => {
    // if (sessionStorage.getItem(import.meta.env.VITE_APP_USER_INFO)) {
    const loginResponse = data?.data;

    loginResponse && setUserInfo(loginResponse);
    userInfo?._id &&
      dispatch(
        setAllAppState({
          ...state,
          userId: userInfo?._id,
          request: {
            ...state.request,
            userId: userInfo?._id,
          },
        })
      );

    // } else {
    //   window.location.href = ROUTES.HOMEPAGE;
    // }
  }, [data, dispatch, userInfo?._id]);

  return (
    <div className=" min-h-[100svh] bg-[#F7F8FA] md:p-10 p-5">
      <Header
        email={userInfo?.email ?? ""}
        firstname={userInfo?.firstname ?? ""}
        lastname={userInfo?.lastname ?? ""}
        _id={userInfo?._id ?? ""}
      />

      <section className=" min-h-[80svh]">
        <div className="grid gap-6 mt-6 md:grid-cols-2 place-items-center md:gap-0">
          <div className="flex gap-5 h-max">
            <span className="md:py-2 md:px-4 p-2 bg-white text-[#19213D] rounded-xl flex justify-center cursor-pointer items-center w-max text-sm font-[gilroy-medium] gap-2">
              <Recording />
              <p className="hidden sm:block">Record</p>
            </span>
            <span className="md:py-2 md:px-4 p-2 bg-white text-[#19213D] rounded-xl flex justify-center cursor-pointer items-center w-max text-sm font-[gilroy-medium] gap-2">
              <Translate />
              <p className="hidden sm:block">Translate</p>
            </span>
            <span className="md:py-2 md:px-4 p-2 bg-white text-[#19213D] rounded-xl flex justify-center cursor-pointer items-center w-max text-sm font-[gilroy-medium] gap-2">
              <Speak />
              <p className="hidden sm:block"> Speak</p>
            </span>
          </div>
          <div className=" text-[#333333] md:w-[70%] gap-3 w-full ">
            <span className="flex items-center justify-between text-sm">
              <p>Total Task</p>
              <p>50</p>
            </span>
            <span className="flex">
              <p className="text-3xl ">14</p>
              <p className="text-3xl ">/</p>
              <p className="text-base align-text-bottom">50</p>
            </span>
            <Progress percent={70} showInfo={false} />
          </div>
        </div>
        <span className="flex flex-col sm:flex-row items-center justify-center mt-20 text-[#333333] text-xs md:text-base font-[gilroy-medium] text-center ">
          <span className="flex items-center justify-center">
            Click <Speak />
          </span>
          <span>and read the sentence aloud in the displayed language</span>
        </span>
        <SentenceBank />
        <div className="mt-10 w-[80%] sm:w-[60%] mx-auto relative">
          <hr />
          <span className="p-3 sm:p-4 rounded-[50%] bg-[#096A95] flex justify-center items-center absolute right-[50%] top-[-20px] ">
            <MicIcon />
          </span>
        </div>
        <div className="flex justify-center gap-5 mt-10 md:justify-end">
          <Button className=" border border-[#E3E6EA] text-[#096A95] text-base font-semi-bold font-[gilroy-semibold] !py-2 !px-4">
            Skip {">>"}
          </Button>
          <Button className=" border bg-[#096A9540] text-[#19213D] text-base font-semi-bold font-[gilroy-semibold] !py-2 !px-5">
            Save
          </Button>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Dashboard;
