import { useCallback, useEffect, useRef, useState } from "react";
import { setAllAppState, useGetDataQuery } from "../../store";
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
import { baseUrl } from "../../store/api/api.config";
import { Encryption } from "../../utils/encryption";

const Dashboard = () => {
  const { error, warning, success } = useToast();

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [blobUrl, setBlobUrl] = useState<Blob | null>();
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const waveformRef = useRef<HTMLDivElement>(null);
  const waveSurfer = useRef<WaveSurfer | null>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [userInfo, setUserInfo] = useState<userInfoObject>();
  const [taskCountData, setTaskCountData] = useState<any>();
  const [dialogData, setDialogDetails] = useState<any>();
  const [loading, setIsLoading] = useState<boolean>(false);

  const { data, error: getUserDataError } = useGetDataQuery({
    getUrl: endpoints.user.getUserInfo,
  });

  const token = JSON.parse(
    Encryption.decrypt(
      sessionStorage.getItem(import.meta.env.VITE_APP_TOKEN) as string
    )
  );
  const getUserTasks = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${baseUrl}${endpoints.getSingleTask}/${userInfo?._id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setIsLoading(false);
      if (response.ok) {
        setDialogDetails(data);
      }
      if (!response.ok) {
        error("Something went wrong!");
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const getData = useCallback(async () => {
    if (!userInfo?._id) {
      return;
    }
    setIsLoading(true);
    try {
      await getUserTasks();
      const response = await fetch(
        `${baseUrl}${endpoints.getTaskCount}/${userInfo?._id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setIsLoading(false);
      if (response.ok) {
        setTaskCountData(data);
      }
      if (!response.ok) {
        error("Something went wrong!");
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }, [userInfo?._id]);

  const handleSaveTranslation = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${baseUrl}${endpoints.translateTask}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userInfo?._id,
          subDialogueId: dialogData?.data?.subDialogueId,
          dialogueId: dialogData?.data?.dialogueId,
          taskId: dialogData?.data?.taskId,
          taskStage: dialogData?.data?.taskStage,
          translateText: state.request.translateText,
          language: state.request.language,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        success(data?.responseMessage);
        getData();
        resetRecording();
      }
      if (!response.ok) {
        error(data?.responseMessage);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      console.log(error);
    }
  };
  const handleSkipTask = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${baseUrl}${endpoints.skipTask}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userInfo?._id,
          subDialogueId: dialogData?.data?.subDialogueId,
          taskId: dialogData?.data?.taskId,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        success(data?.responseMessage);
        getData();
      }
      if (!response.ok) {
        error(data?.responseMessage);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      console.log(error);
    }
  };
  useEffect(() => {
    if (data && !getUserDataError) {
      getData();
    }
  }, [data, getUserDataError, getData]);

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

  const recordFormSubmitHandler = async () => {
    setIsLoading(true);
    const formData = new FormData();
    userInfo?._id && formData.append("userId", String(userInfo?._id));
    dialogData?.data?.subDialogueId &&
      formData.append("subDialogueId", String(dialogData?.data?.subDialogueId));
    dialogData?.data?.dialogueId &&
      formData.append("dialogueId", String(dialogData?.data?.dialogueId));
    dialogData?.data?.taskId &&
      formData.append("taskId", String(dialogData?.data?.taskId));
    dialogData?.data?.taskStage &&
      formData.append("taskStage", String(dialogData?.data?.taskStage));
    formData.append("task", "Record");
    blobUrl && formData.append("file", blobUrl, "record.webm");
    try {
      const token = JSON.parse(
        Encryption.decrypt(
          sessionStorage.getItem(import.meta.env.VITE_APP_TOKEN) as string
        )
      );
      const response = await fetch(`${baseUrl}task/record`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const formResponseData = await response.json();
      setIsLoading(false);
      if (!response.ok) {
        error(formResponseData?.responseMessage);
      }
      if (response.ok) {
        getData();
        success(formResponseData?.responseMessage);
        resetRecording();
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      throw error;
    }
  };
  const speakFormSubmitHandler = async () => {
    setIsLoading(true);
    const formData = new FormData();
    userInfo?._id && formData.append("userId", String(userInfo?._id));
    dialogData?.data?.subDialogueId &&
      formData.append("subDialogueId", String(dialogData?.data?.subDialogueId));
    dialogData?.data?.dialogueId &&
      formData.append("dialogueId", String(dialogData?.data?.dialogueId));
    dialogData?.data?.taskId &&
      formData.append("taskId", String(dialogData?.data?.taskId));
    state.request.language &&
      formData.append("language", String(state.request.language));
    dialogData?.data?.taskStage &&
      formData.append("taskStage", String(dialogData?.data?.taskStage));
    formData.append("task", "Speak");
    blobUrl && formData.append("file", blobUrl, "speak.webm");
    try {
      const token = JSON.parse(
        Encryption.decrypt(
          sessionStorage.getItem(import.meta.env.VITE_APP_TOKEN) as string
        )
      );
      const response = await fetch(`${baseUrl}task/speak`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          // "Content-Type": "multipart/form-data",
        },
        body: formData,
      });
      const formResponseData = await response.json();
      setIsLoading(false);
      if (!response.ok) {
        error(formResponseData?.responseMessage);
      }
      if (response.ok) {
        getData();
        success(formResponseData?.responseMessage);
        resetRecording();
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      throw error;
    }
  };

  const getDeviceOS = () => {
    const userAgent = navigator.userAgent;
    if (
      userAgent.includes("iPhone") ||
      userAgent.includes("iPad") ||
      userAgent.includes("iPod")
    ) {
      return "iOS";
    } else if (userAgent.includes("Android")) {
      return "Android";
    } else {
      return "Unknown";
    }
  };

  //OLD START RECORD

  const startRecording = async () => {
    setIsRecording(true);
    const deviceOS = getDeviceOS();
    if (deviceOS === "iOS") {
      //useWebAudioApi
      try {
        const audioContext = new AudioContext();
        await audioContext.audioWorklet.addModule("./AudioProcessor.js"); // Path to your processor file
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        const source = audioContext.createMediaStreamSource(stream);
        const processor = new AudioWorkletNode(audioContext, "audio-processor");

        let chunks: BlobPart[] = []; // Adjust according to what you are actually collecting

        processor.port.onmessage = (event) => {
          // Handle data from processor, if needed
          chunks.push(event.data);
        };

        source.connect(processor);
        processor.connect(audioContext.destination); // Connect to output if needed, or just to keep alive

        // Setup logic to invoke stopRecording appropriately
      } catch (error) {
        console.error("Error recording audio:", error);
      }
    } else {
      //useMediaRecorderAPI

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        setMediaStream(stream);

        const recorder = new MediaRecorder(stream);
        const chunks: BlobPart[] = [];

        recorder.ondataavailable = (e) => {
          chunks.push(e.data);
        };

        recorder.onstop = async () => {
          const newAudioBlob = new Blob(chunks, { type: "audio/webm" });
          const newBlobUrl = URL.createObjectURL(newAudioBlob);
          setBlobUrl(newAudioBlob);
          setAudioUrl(newBlobUrl);
        };

        recorder.start();
      } catch (error) {
        console.error("Error recording audio:", error);
        setIsRecording(false);
      }
    }
  };

  const stopRecording = async () => {
    const deviceOS = getDeviceOS();
    if (deviceOS === "iOS") {
      //useWebAudioAPI
      const audioContext = new AudioContext();
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const source = audioContext.createMediaStreamSource(stream);

      await audioContext.audioWorklet.addModule("./AudioProcessor.js");
      const processor = new AudioWorkletNode(audioContext, "audio-processor");
      processor.disconnect();
      source.disconnect();
      audioContext.close();

      let chunks: BlobPart[] = [];
      // Convert the collected chunks into a Blob
      const audioBlob = new Blob(chunks, { type: "audio/webm" });
      const blobUrl = URL.createObjectURL(audioBlob);

      setBlobUrl(audioBlob);
      setAudioUrl(blobUrl);
      // Example of how you might use this Blob in a FormData for submission:

      // Here you would submit your formData to a server or handle it according to your application's requirements
    } else {
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => {
          track.stop();
        });
      }
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

  const handleRestartRecording = () => {
    resetRecording();
    startRecording();
  };

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
      <Spin spinning={loading}>
        <section className=" min-h-[80svh] ">
          <div className="grid gap-6 mt-6 md:grid-cols-2 place-items-center md:gap-0">
            <div className="flex gap-5 h-max">
              <span className="md:py-2 md:px-4 p-2 bg-white text-[#19213D] rounded-xl flex justify-center items-center w-max text-sm font-[gilroy-medium] gap-2">
                {dialogData?.data?.taskStage === 1 ? (
                  <Recording />
                ) : (
                  <RecordingTransparentIcon />
                )}

                <p className="hidden sm:block">Record</p>
              </span>
              <span className="md:py-2 md:px-4 p-2 bg-white text-[#19213D] rounded-xl flex justify-center items-center w-max text-sm font-[gilroy-medium] gap-2">
                {dialogData?.data?.taskStage === 2 ? (
                  <TranslateIconWithBg />
                ) : (
                  <Translate />
                )}

                <p className="hidden sm:block">Translate</p>
              </span>
              <span className="md:py-2 md:px-4 p-2 bg-white text-[#19213D] rounded-xl flex justify-center items-center w-max text-sm font-[gilroy-medium] gap-2">
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
            <div className="w-full sm:w-[60%] mx-auto my-8 bg-white p-4 rounded-2xl text-center  font-bold text-[#333333] font-[gilroy-bold] sm:text-2xl text-lg px-5 py-10">
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
                className=" border border-[#E3E6EA] text-[#096A95] text-base font-[gilroy-medium] !py-2 !px-4"
                onClick={() => {
                  handleSkipTask();
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
                className=" border bg-[#096A9540] text-[#19213D] text-base  font-[gilroy-medium] !py-2 !px-5 disabled:cursor-not-allowed"
                onClick={async () => {
                  if (
                    dialogData?.data?.taskStage > 3 ||
                    dialogData?.data?.taskStage < 1
                  ) {
                    return;
                  }
                  if (dialogData?.data?.taskStage === 1) {
                    recordFormSubmitHandler();
                  }
                  if (dialogData?.data?.taskStage === 2) {
                    handleSaveTranslation();
                  }
                  if (dialogData?.data?.taskStage === 3) {
                    speakFormSubmitHandler();
                  }
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
