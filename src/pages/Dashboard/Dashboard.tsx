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
    <div className=" min-h-[100svh] bg-[#F7F8FA] p-10">
      <Header
        email={userInfo?.email ?? ""}
        firstname={userInfo?.firstname ?? ""}
        lastname={userInfo?.lastname ?? ""}
        _id={userInfo?._id ?? ""}
      />

      <section>
        <div className="grid grid-cols-2 mt-6 place-items-center place-content-center">
          <div className="flex flex-wrap gap-5 h-max">
            <span className="py-2 px-4 bg-white text-[#19213D] rounded-xl flex justify-center items-center w-max text-sm font-[gilroy-medium] gap-2">
              <Recording />
              <p>Record</p>
            </span>
            <span className="py-2 px-4 bg-white text-[#19213D] rounded-xl flex justify-center items-center w-max text-sm font-[gilroy-medium] gap-2">
              <Translate />
              <p>Translate</p>
            </span>
            <span className="py-2 px-4 bg-white text-[#19213D] rounded-xl flex justify-center items-center w-max text-sm font-[gilroy-medium] gap-2">
              <Speak />
              Speak
            </span>
          </div>
          <div className=" text-[#333333] w-[70%] gap-3 ">
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
        <span className="flex items-center justify-center gap-2 mt-20 text-[#333333] text-xs md:text-base font-[gilroy-medium] ">
          <p>Click</p>
          <Speak />
          <p> and read the sentence aloud in the displayed language</p>
        </span>
        <SentenceBank />
        <div className="mt-10 w-[80%] sm:w-[60%] mx-auto">
          <hr />
          <div className="flex items-center justify-center">
            <span className="w-16 h-16 rounded-[50%] bg-[#096A95] flex justify-center items-center ">
              <MicIcon />
            </span>
          </div>
        </div>
        <div className="flex justify-end gap-5 mt-10">
          <Button className=" border border-[#E3E6EA] text-[#096A95] text-base font-semi-bold font-[gilroy-semibold] !py-2 !px-4">
            {" "}
            Skip {">>"}{" "}
          </Button>
          <Button className=" border bg-[#096A9540] text-[#19213D] text-base font-semi-bold font-[gilroy-semibold] !py-2 !px-5">
            Save
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
