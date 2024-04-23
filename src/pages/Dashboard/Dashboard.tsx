import { useEffect, useRef, useState } from "react";
import {
  setAllAppState,
  useGetDataQuery,
  usePostDataMutation,
} from "../../store";
import Header from "./components/Header";
import { endpoints } from "../../store/api/endpoints";
import { Progress, Spin } from "antd";
import { userInfoObject } from "./components/Header";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Recording from "../../assets/icons/Recording";
import Translate from "../../assets/icons/Translate";
import Button from "../../components/Button";
import Footer from "../Homepage/Components/Footer";
import WaveSurfer from "wavesurfer.js";
import RecordingTransparentIcon from "../../assets/icons/RecordingTransparentIcon";
import TranslateIconWithBg from "../../assets/icons/TranslateIconWithBg";
import AudioAnnotationSteps from "./components/AudioAnnotationSteps";
import { useToast } from "../../hooks/useToast";
import { useGetDialogueDataQuery } from "../../store/api/api.config";

const Dashboard = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const waveformRef = useRef<HTMLDivElement>(null);
  const waveSurfer = useRef<WaveSurfer | null>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);

  const { data, error: getUserDataError } = useGetDataQuery({
    getUrl: endpoints.user.getUserInfo,
  });
  const [handleSkiptask, result] = usePostDataMutation();

  const [handleSaveRecording, handleSaveRecordingResult] =
    usePostDataMutation();

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
        const audioBlob = new Blob(chunks, { type: "audio/webm" });
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
  const {
    data: dialogData,
    isFetching,
    isLoading,
  } = useGetDialogueDataQuery({
    getUrl: `${endpoints.getSingleTask}/${userInfo?._id}`,
  });
  const {
    data: taskCountData,
    isFetching: taskCountDataIsFetching,
    isLoading: taskCountDataIsLoading,
  } = useGetDialogueDataQuery({
    getUrl: `${endpoints.getTaskCount}/${userInfo?._id}`,
  });

  const { error, warning, success } = useToast();
  useEffect(() => {
    //@ts-ignore
    if (getUserDataError && getUserDataError.status === 403) {
      //@ts-ignore
      warning(getUserDataError?.data?.responseMessage);
    }
  }, [getUserDataError]);

  useEffect(() => {
    if (dialogData && dialogData.responseCode === 209) {
      warning(dialogData?.responseMessage);
    }
  }, [dialogData]);

  useEffect(() => {
    if ("data" in result) {
      const apiResponse = result?.data;
      if (apiResponse.responseCode === 200) {
        success(apiResponse.responseMessage);
      } else {
        error(apiResponse.responseMessage);
      }
    }
    if (result.isError) {
      error("Something went Wrong!");
    }
  }, [result, dialogData]);

  useEffect(() => {
    if ("data" in handleSaveRecordingResult) {
      const apiResponse = handleSaveRecordingResult?.data;
      if (apiResponse.responseCode === 200) {
        success(apiResponse.responseMessage);
      } else {
        error(apiResponse.responseMessage);
      }
    }
    if (handleSaveRecordingResult.isError) {
      error("Something went Wrong!");
    }
  }, [handleSaveRecordingResult]);

  useEffect(() => {
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
  }, [data, dispatch, userInfo?._id]);

  return (
    <div className=" min-h-[100svh] bg-[#F7F8FA] md:p-10 p-5">
      <Header
        email={userInfo?.email ?? ""}
        firstname={userInfo?.firstname ?? ""}
        lastname={userInfo?.lastname ?? ""}
        _id={userInfo?._id ?? ""}
      />
      <Spin
        spinning={
          isLoading ||
          isFetching ||
          result.isLoading ||
          taskCountDataIsFetching ||
          taskCountDataIsLoading ||
          handleSaveRecordingResult.isLoading
        }
      >
        <section className=" min-h-[80svh] ">
          <div className="grid gap-6 mt-6 md:grid-cols-2 place-items-center md:gap-0">
            <div className="flex gap-5 h-max">
              <span className="md:py-2 md:px-4 p-2 bg-white text-[#19213D] rounded-xl flex justify-center cursor-pointer items-center w-max text-sm font-[gilroy-medium] gap-2">
                {dialogData?.data?.taskStage === 1 ? (
                  <Recording />
                ) : (
                  <RecordingTransparentIcon />
                )}

                <p className="hidden sm:block">Record</p>
              </span>
              <span className="md:py-2 md:px-4 p-2 bg-white text-[#19213D] rounded-xl flex justify-center cursor-pointer items-center w-max text-sm font-[gilroy-medium] gap-2">
                {dialogData?.data?.taskStage === 2 ? (
                  <TranslateIconWithBg />
                ) : (
                  <Translate />
                )}

                <p className="hidden sm:block">Translate</p>
              </span>
              <span className="md:py-2 md:px-4 p-2 bg-white text-[#19213D] rounded-xl flex justify-center cursor-pointer items-center w-max text-sm font-[gilroy-medium] gap-2">
                {dialogData?.data?.taskStage === 3 ? (
                  <Recording />
                ) : (
                  <RecordingTransparentIcon />
                )}
                <p className="hidden sm:block"> Speak</p>
              </span>
            </div>
            <div className=" text-[#333333] md:w-[70%] gap-3 w-full px-3 md:px-0 ">
              <span className="flex items-center justify-between text-sm font-[gilroy-medium]">
                <p>Total Task</p>
                <p>{taskCountData?.data?.totalTasks}</p>
              </span>
              <span className="flex items-baseline">
                <p className="text-3xl ">{taskCountData?.data?.doneTasks}</p>
                <p className="text-3xl ">/</p>
                <p className="text-base align-text-bottom">
                  {taskCountData?.data?.totalTasks}
                </p>
              </span>
              <Progress
                percent={
                  (taskCountData?.data?.doneTasks /
                    taskCountData?.data?.totalTasks) *
                  100
                }
                showInfo={false}
              />
            </div>
          </div>
          {dialogData?.responseCode === 209 ? (
            <div className="w-full sm:w-[60%] mx-auto my-8 bg-white p-4 rounded-2xl text-center font-[gilroy-medium]">
              {dialogData?.responseMessage}
            </div>
          ) : (
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
              userId={userInfo?._id}
              data={dialogData}
            />
          )}
          <div className="flex justify-center gap-5 mt-20 mb-6 md:justify-end">
            {dialogData?.data?.taskStage === 1 && (
              <Button
                className=" border border-[#E3E6EA] text-[#096A95] text-base font-semi-bold font-[gilroy-semibold] !py-2 !px-4"
                onClick={() => {
                  handleSkiptask({
                    ...state,
                    postUrl: endpoints.skipTask,
                    request: {
                      userId: userInfo?._id,
                      subDialogueId: dialogData?.data?.subDialogueId,
                      taskId: dialogData?.data?.taskId,
                    },
                  });
                }}
              >
                Skip {">>"}
              </Button>
            )}
            {dialogData?.responseCode !== 209 && (
              <Button
                disabled={
                  (dialogData?.data?.taskStage === 1 && !audioUrl) ||
                  (dialogData?.data?.taskStage === 3 && !audioUrl) ||
                  (dialogData?.data?.taskStage === 2 &&
                    (!state.request?.language || !state.request?.translateText))
                }
                className=" border bg-[#096A9540] text-[#19213D] text-base font-semi-bold font-[gilroy-semibold] !py-2 !px-5 disabled:cursor-not-allowed"
                onClick={() => {
                  if (
                    dialogData?.data?.taskStage > 3 ||
                    dialogData?.data?.taskStage < 1
                  ) {
                    return;
                  }
                  if (dialogData?.data?.taskStage === 1) {
                    handleSaveRecording({
                      ...state,
                      postUrl: endpoints.recordTask,
                      request: {
                        userId: userInfo?._id,
                        subDialogueId: dialogData?.data?.subDialogueId,
                        dialogueId: dialogData?.data?.dialogueId,
                        taskId: dialogData?.data?.taskId,
                        taskStage: dialogData?.data?.taskStage,
                        filePath: `http://commondatastorage.googleapis.com/${Math.random()}codeskulptor-assets/Evillaugh.ogg`,
                      },
                    });
                  }
                  if (dialogData?.data?.taskStage === 2) {
                    handleSaveRecording({
                      ...state,
                      postUrl: endpoints.translateTask,
                      request: {
                        userId: userInfo?._id,
                        subDialogueId: dialogData?.data?.subDialogueId,
                        dialogueId: dialogData?.data?.dialogueId,
                        taskId: dialogData?.data?.taskId,
                        taskStage: dialogData?.data?.taskStage,
                        translateText: state.request.translateText,
                        language: state.request.language,
                      },
                    });
                    resetRecording();
                    resetRecording();
                  }
                  if (dialogData?.data?.taskStage === 3) {
                    handleSaveRecording({
                      ...state,
                      postUrl: endpoints.speakTask,
                      request: {
                        userId: userInfo?._id,
                        subDialogueId: dialogData?.data?.subDialogueId,
                        dialogueId: dialogData?.data?.dialogueId,
                        taskId: dialogData?.data?.taskId,
                        taskStage: dialogData?.data?.taskStage,
                        language: state.request.language,
                        filePath: `http://commondatastorage.googleapis.com/${Math.random()}codeskulptor-assets/Evillaugh.ogg`,
                      },
                    });
                  }
                  resetRecording();
                  resetRecording();
                }}
              >
                Save
              </Button>
            )}
          </div>
        </section>
      </Spin>
      <Footer />
    </div>
  );
};

export default Dashboard;
