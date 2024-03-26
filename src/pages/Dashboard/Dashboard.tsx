import { useEffect, useState } from "react";
import { setAllAppState, useGetDataQuery } from "../../store";
import Header from "./components/Header";
import Recorder from "./components/Recorder";
import Welcome from "./components/Welcome";
import WordBank from "./components/WordBank";
import { endpoints } from "../../store/api/endpoints";
import { Spin } from "antd";
import { userInfoObject } from "./components/Header";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import AudioChunker from "./components/RecordChunker";
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
    <div className=" min-h-[100svh] bg-[#F7F8FA]">
      <Header
        email={userInfo?.email ?? ""}
        firstname={userInfo?.firstname ?? ""}
        lastname={userInfo?.lastname ?? ""}
        _id={userInfo?._id ?? ""}
      />
      <Spin spinning={false}>
        <div className="grid max-w-5xl m-auto h-[762px]">
          <Welcome />
          <AudioChunker />
          <WordBank />
          <Recorder />
        </div>
      </Spin>
      <Footer />
    </div>
  );
};

export default Dashboard;
