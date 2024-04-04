import { useEffect, useRef, useState } from "react";
import { setAllAppState, useGetDataQuery } from "../../store";
import Header from "./components/Header";
import { endpoints } from "../../store/api/endpoints";
import { Input, Progress, Select } from "antd";
import { userInfoObject } from "./components/Header";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Recording from "../../assets/icons/Recording";
import Translate from "../../assets/icons/Translate";
import Speak from "../../assets/icons/Speak";
import Button from "../../components/Button";
import Footer from "../Homepage/Components/Footer";
import WaveSurfer from "wavesurfer.js";
import DeleteIcon from "../../assets/icons/DeleteIcon";
import RecorderLine from "../../assets/svgs/recorder-line.svg";
import MicIconLarge from "../../assets/icons/MicIconLarge";
import stopRecordingIcon from "../../assets/svgs/stop-recording.svg";
import playRecordingIcon from "../../assets/svgs/play-recording.svg";
import pauseRecordeing from "../../assets/svgs/pause-recording.svg";
import RefreshIcon from "../../assets/icons/RefreshIcon";
import StopRecordingSmallIcon from "../../assets/icons/StopRecordingSmallIcon";
import TranslateIconSmall from "../../assets/icons/TranslateIconSmall";
import RecordingTransparentIcon from "../../assets/icons/RecordingTransparentIcon";
import TranslateIconWithBg from "../../assets/icons/TranslateIconWithBg";
import TranslateLargeIcon from "../../assets/icons/TranslateLargeIcon";
import AudioAnnotationSteps from "./components/AudioAnnotationSteps";

const Dashboard = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const waveformRef = useRef<HTMLDivElement>(null);
  const waveSurfer = useRef<WaveSurfer | null>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);

  const { data } = useGetDataQuery({
    getUrl: endpoints.user.getUserInfo,
  });

  const [userInfo, setUserInfo] = useState<userInfoObject>();
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => {
    return state.app;
  });

  useEffect(() => {
    if (audioUrl && waveformRef.current) {
      waveSurfer.current = WaveSurfer.create({
        container: waveformRef.current!,
        waveColor: "#8DC1FF",
        progressColor: "#0A3546",
        cursorWidth: 0,
        interact: true, // Disable interaction to prevent conflicts with play controls
      });
      if (audioUrl && waveSurfer.current) {
        waveSurfer?.current.load(audioUrl);
      }
      if (waveSurfer.current) {
        waveSurfer.current.on("audioprocess", () => {
          setCurrentTime(waveSurfer.current?.getCurrentTime() || 0);
        });
      }
      // waveformRef?.current!.addEventListener("click", togglePlayPause);
      waveSurfer.current.on("finish", () => {
        setIsPlaying(false);
      });
      return () => {
        if (waveSurfer.current) {
          waveSurfer.current.destroy();
          waveSurfer.current = null;
        }
        // if (waveformRef?.current) {
        //   waveformRef?.current.removeEventListener("click", togglePlayPause);
        // }
      };
    }
  }, [audioUrl]);

  const togglePlayPause = () => {
    if (waveSurfer.current) {
      if (isPlaying) {
        waveSurfer.current.pause();
      } else {
        waveSurfer.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const startRecording = async () => {
    setIsRecording(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setMediaStream(stream);

      const recorder = new MediaRecorder(stream);
      const chunks: BlobPart[] = [];

      recorder.ondataavailable = (e) => {
        chunks.push(e.data);
      };

      recorder.onstop = async () => {
        const audioBlob = new Blob(chunks, { type: "audio/mp3" });
        // setRecording(audioBlob);
        setAudioUrl(URL.createObjectURL(audioBlob));
      };

      recorder.start();
      // Stop recording after 5 seconds
      // setTimeout(() => {
      //   recorder.stop();
      //   stream.getTracks().forEach((track) => {
      //     track.stop();
      //   });
      //   setIsRecording(false);
      // }, 5000);
    } catch (error) {
      console.error("Error recording audio:", error);
      setIsRecording(false);
    }
  };
  const stopRecording = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => {
        track.stop();
      });
    }
    setIsRecording(false);
  };
  const resetRecording = () => {
    // setRecording(null);
    setAudioUrl(null);
    setIsPlaying(false);
    setCurrentTime(0);
    if (waveSurfer.current) {
      waveSurfer.current.empty();
    }
  };
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  const handleRestartRecording = () => {
    resetRecording();
    startRecording();
  };

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
              {state.currentStep === 1 ? (
                <Recording />
              ) : (
                <RecordingTransparentIcon />
              )}

              <p className="hidden sm:block">Record</p>
            </span>
            <span className="md:py-2 md:px-4 p-2 bg-white text-[#19213D] rounded-xl flex justify-center cursor-pointer items-center w-max text-sm font-[gilroy-medium] gap-2">
              {state.currentStep === 2 ? (
                <TranslateIconWithBg />
              ) : (
                <Translate />
              )}

              <p className="hidden sm:block">Translate</p>
            </span>
            <span className="md:py-2 md:px-4 p-2 bg-white text-[#19213D] rounded-xl flex justify-center cursor-pointer items-center w-max text-sm font-[gilroy-medium] gap-2">
              {state.currentStep === 3 ? (
                <Recording />
              ) : (
                <RecordingTransparentIcon />
              )}
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

        {/* {(state.currentStep === 1 || 3) && !isRecording && (
          <span className="flex flex-col sm:flex-row items-center justify-center mt-20 text-[#333333] text-xs md:text-base font-[gilroy-medium] text-center ">
            <span className="flex items-center justify-center">
              Click <Speak />
            </span>
            <span>and read the sentence aloud in the displayed language</span>
          </span>
        )}
        {(state.currentStep === 1 || 3) && isRecording && (
          <span className="flex flex-col sm:flex-row items-center justify-center mt-20 text-[#333333] text-xs md:text-base font-[gilroy-medium] text-center ">
            <span className="flex items-center justify-center">
              Click <StopRecordingSmallIcon />
            </span>
            <span>when you’re done recording</span>
          </span>
        )}
        {state.currentStep === 2 && (
          <span className="flex flex-col sm:flex-row items-center justify-center mt-20 text-[#333333] text-xs md:text-base font-[gilroy-medium] text-center ">
            <span className="flex items-center justify-center gap-2 mr-2">
              Translate <TranslateIconSmall />
            </span>
            <span>the displayed sentence in the language of your choosing</span>
          </span>
        )}
        <div className=" mt-2 sm:w-[60%] p-3 text-center mx-auto bg-white rounded-2xl border border-[#E3E6EA]">
          <p className="text-[#333333] font-[gilroy-medium] text-sm md:text-xl font-normal">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi velit
            ipsam, animi molestiae, neque tempore aliquid in saepe, ex enim
            voluptas at quod? Maxime veniam autem cumque voluptatum, nemo amet.
          </p>
        </div>
        {state.currentStep === 1 && (
          <div className="">
            {!isRecording && !audioUrl && (
              <div className="mt-[5rem] w-[80%] sm:w-[60%] mx-auto  relative">
                <img src={RecorderLine} alt="" />
                <button
                  onClick={startRecording}
                  className=" rounded-[50%] flex justify-center items-center absolute -translate-x-1/2  transform left-1/2  top-[-30px]"
                >
                  <MicIconLarge className="shadow-xl" />
                </button>
              </div>
            )}
            {isRecording && !audioUrl && (
              <div className="mt-[5rem] w-[80%] sm:w-[60%] mx-auto  relative">
                <img src={RecorderLine} alt="" />
                <button
                  onClick={stopRecording}
                  className="rounded-[50%] flex justify-center items-center absolute -translate-x-1/2  transform left-1/2 top-[-30px] glow"
                >
                  <img src={stopRecordingIcon} alt="" />
                </button>
              </div>
            )}

            {audioUrl && (
              <div className="">
                <div className="mt-[5rem] w-[80%] sm:w-[60%] mx-auto  relative">
                  <button
                    onClick={togglePlayPause}
                    className="rounded-[50%] flex justify-center items-center  absolute -translate-x-1/2  transform left-1/2 top-[-30px]"
                  >
                    <img
                      src={isPlaying ? pauseRecordeing : playRecordingIcon}
                      alt=""
                    />
                  </button>
                  <div className="flex items-center mt-8">
                    <div
                      ref={waveformRef}
                      className="w-full cursor-pointer"
                    ></div>
                    <p className="text-lg text-[#666F8D] font-Inter font-medium">
                      {formatTime(currentTime)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between w-[20rem] mx-auto max-w-full">
                  <RefreshIcon
                    className="cursor-pointer"
                    onClick={handleRestartRecording}
                  />{" "}
                  <DeleteIcon
                    className="cursor-pointer"
                    onClick={resetRecording}
                  />
                </div>
              </div>
            )}
          </div>
        )}
        {state.currentStep === 2 && (
          <div className="w-[80%] sm:w-[60%] mx-auto my-3 bg-white p-4 rounded-2xl">
            <span className="flex items-center justify-between mb-4">
              <Select className="w-[10rem] max-w-3/12" defaultActiveFirstOption>
                <Select.Option value={""}>Select Language</Select.Option>
                <Select.Option value={"Yoruba"}>Yoruba</Select.Option>
                <Select.Option value={"English"}>English</Select.Option>
                <Select.Option value={"Hausa"}>Hausa</Select.Option>
              </Select>
              <TranslateLargeIcon />
            </span>
            <hr className="my-4" />
            <Input.TextArea
              className="border-none outline-none focus:border-none text-[#867F7F] font-[gilroy-medium] text-sm font-normal focus:outline-none resize-none"
              rows={8}
              placeholder="Enter your translation here ........"
            ></Input.TextArea>
          </div>
        )}
        {state.currentStep === 3 && (
          <div className="">
            {!isRecording && !audioUrl && (
              <div className="mt-[5rem] w-[80%] sm:w-[60%] mx-auto bg-white p-6 rounded-2xl">
                <Select
                  className="w-[10rem] text-[#19213D] font-[gilroy-medium] text-xs font-normal mb-4 h-10 max-w-3/12"
                  defaultActiveFirstOption
                >
                  <Select.Option value={""}>Select Language</Select.Option>
                  <Select.Option value={"Yoruba"}>Yoruba</Select.Option>
                  <Select.Option value={"English"}>English</Select.Option>
                  <Select.Option value={"Hausa"}>Hausa</Select.Option>
                </Select>
                <div className=" relative  p-6">
                  <img src={RecorderLine} alt="" />
                  <button
                    onClick={startRecording}
                    className=" rounded-[50%] flex justify-center items-center absolute -translate-x-1/2  transform left-1/2  top-[-10px]"
                  >
                    <MicIconLarge className="shadow-xl" />
                  </button>
                </div>
              </div>
            )}
            {isRecording && !audioUrl && (
              <div className="mt-[5rem] w-[80%] sm:w-[60%] mx-auto bg-white p-6 rounded-2xl">
                <Select
                  className="w-[10rem] text-[#19213D] font-[gilroy-medium] text-xs font-normal mb-4 h-10 max-w-3/12"
                  defaultActiveFirstOption
                >
                  <Select.Option value={""}>Select Language</Select.Option>
                  <Select.Option value={"Yoruba"}>Yoruba</Select.Option>
                  <Select.Option value={"English"}>English</Select.Option>
                  <Select.Option value={"Hausa"}>Hausa</Select.Option>
                </Select>

                <div className="relative  p-6">
                  <img src={RecorderLine} alt="" />
                  <button
                    onClick={stopRecording}
                    className="rounded-[50%] flex justify-center items-center absolute -translate-x-[60%]  transform left-1/2 top-[-10px] glow"
                  >
                    <img src={stopRecordingIcon} alt="" />
                  </button>
                </div>
              </div>
            )}

            {audioUrl && (
              <div className="mt-[5rem] w-[80%] sm:w-[60%] mx-auto bg-white p-6 rounded-2xl">
                <Select
                  className="w-[10rem] text-[#19213D] font-[gilroy-medium] text-xs font-normal mb-4 h-10 max-w-3/12"
                  defaultActiveFirstOption
                >
                  <Select.Option value={""}>Select Language</Select.Option>
                  <Select.Option value={"Yoruba"}>Yoruba</Select.Option>
                  <Select.Option value={"English"}>English</Select.Option>
                  <Select.Option value={"Hausa"}>Hausa</Select.Option>
                </Select>
                <div className="relative">
                  <button
                    onClick={togglePlayPause}
                    className="rounded-[50%] flex justify-center items-center  absolute -translate-x-1/2  transform left-1/2 top-[-30px]"
                  >
                    <img
                      src={isPlaying ? pauseRecordeing : playRecordingIcon}
                      alt=""
                    />
                  </button>
                  <div className="flex items-center mt-8">
                    <div
                      ref={waveformRef}
                      className="w-full cursor-pointer"
                    ></div>
                    <p className="text-lg text-[#666F8D] font-Inter font-medium">
                      {formatTime(currentTime)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between w-[20rem] mx-auto max-w-full">
                  <RefreshIcon
                    className="cursor-pointer"
                    onClick={handleRestartRecording}
                  />{" "}
                  <DeleteIcon
                    className="cursor-pointer"
                    onClick={resetRecording}
                  />
                </div>
              </div>
            )}
          </div>
        )} */}
        <AudioAnnotationSteps
          audioUrl={audioUrl}
          currentTime={currentTime}
          // formatTime={formatTime()}
          handleRestartRecording={handleRestartRecording}
          isPlaying={isPlaying}
          isRecording={isRecording}
          resetRecording={resetRecording}
          startRecording={startRecording}
          stopRecording={stopRecording}
          togglePlayPause={togglePlayPause}
          waveformRef={waveformRef}
        />
        <div className="flex justify-center gap-5 mt-20 mb-6 md:justify-end">
          <Button className=" border border-[#E3E6EA] text-[#096A95] text-base font-semi-bold font-[gilroy-semibold] !py-2 !px-4">
            Skip {">>"}
          </Button>
          <Button
            className=" border bg-[#096A9540] text-[#19213D] text-base font-semi-bold font-[gilroy-semibold] !py-2 !px-5"
            onClick={() => {
              if (state.currentStep == 3) {
                return;
              }
              dispatch(
                setAllAppState({ ...state, currentStep: state.currentStep + 1 })
              );
            }}
          >
            Save
          </Button>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Dashboard;
