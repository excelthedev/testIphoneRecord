import { Select, Spin } from "antd";
import Button from "../../../components/Button";
import SendIcon from "../../../assets/icons/SendIcon";
import useSetRequest from "../../../hooks/useSetRequest";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setAllAppState } from "../../../store/slice/app-slice";
import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import RecorderDark from "../../../assets/icons/RecorderDark";
import PauseIcon from "../../../assets/icons/PauseIcon";
import PlayIcon from "../../../assets/icons/PlayIcon";
import CheckMark from "../../../assets/icons/CheckMark";
import DeleteIcon from "../../../assets/icons/DeleteIcon";
import { usePostDataMutation } from "../../../store";
import { endpoints } from "../../../store/api/endpoints";
import { useToast } from "../../../hooks/useToast";
import { RESPONSE_CODE } from "../../../utils/helpers";

const Recorder = () => {
  // const [recording, setRecording] = useState<Blob | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const waveformRef = useRef<HTMLDivElement>(null);
  const waveSurfer = useRef<WaveSurfer | null>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const { setFieldChange } = useSetRequest();
  const state = useAppSelector((state) => {
    return state.app;
  });
  const dispatch = useAppDispatch();
  const cloudinaryBaseUrl = import.meta.env.VITE_APP_CLOUDINARY_API_BASE_URL;
  const cloudinaryCloudName = import.meta.env.VITE_APP_CLOUDINARY_CLOUD_NAME;
  const cloudinaryUploadPreset = import.meta.env
    .VITE_APP_CLOUDINARY_UPLOAD_PRESET;
  const { error, success, warning } = useToast();

  const [saveRecording, result] = usePostDataMutation();
  useEffect(() => {
    if ("data" in result) {
      const apiResponse = result.data;
      if (apiResponse.responseCode === RESPONSE_CODE.successful) {
        success(apiResponse.responseMessage);
        setMediaStream(null);
        setAudioUrl(null);
      } else {
        error(apiResponse.responseMessage);
      }
    }
    if (result.isError) {
      error("Something went Wrong!");
    }
  }, [result]);

  const handleFileUpload = async (blobUrl: string) => {
    if (!blobUrl) {
      warning("Please click a word, select a language and record an audio ");
      return;
    }
    try {
      setIsSaving(true);
      const response = await fetch(blobUrl);
      const blobData = await response.blob();

      const formData = new FormData();
      formData.append("file", blobData, "audio_file");
      formData.append("upload_preset", cloudinaryUploadPreset);
      formData.append("resource_type", "auto");

      const uploadResponse = await fetch(
        `${cloudinaryBaseUrl}${cloudinaryCloudName}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (uploadResponse.ok) {
        const data = await uploadResponse.json();
        await saveRecording({
          ...state,
          postUrl: endpoints.saveRecording,
          request: {
            userId: state.request?.userId,
            wordId: state.request?.selectedWord,
            languageTranslatedTo: state.selectedLanguage,
            recordedVoice: data?.secure_url,
          },
        });
        setMediaStream(null);
        setAudioUrl(null);
        resetRecording();
      } else {
        error("Upload failed, Please try again!");
      }
      setIsSaving(false);
    } catch (error) {
      setIsSaving(false);
      console.error("Error uploading file:", error);
    }
  };

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

  // OLD START RECORDING (WHICH WAS NOT WORKING ON IOS)

  // const startRecording = async () => {
  //   setIsRecording(true);
  //   try {
  //     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  //     setMediaStream(stream);

  //     const recorder = new MediaRecorder(stream);
  //     const chunks: BlobPart[] = [];

  //     recorder.ondataavailable = (e) => {
  //       chunks.push(e.data);
  //     };

  //     recorder.onstop = async () => {
  //       const audioBlob = new Blob(chunks, { type: "audio/mp3" });
  //       // setRecording(audioBlob);
  //       setAudioUrl(URL.createObjectURL(audioBlob));
  //     };

  //     recorder.start();
  //     // Stop recording after 5 seconds
  //     setTimeout(() => {
  //       recorder.stop();
  //       stream.getTracks().forEach((track) => {
  //         track.stop();
  //       });
  //       setIsRecording(false);
  //     }, 5000);
  //   } catch (error) {
  //     console.error("Error recording audio:", error);
  //     setIsRecording(false);
  //   }
  // };

  //NEW START RECORDING FIX (compatible ios fix)
  const startRecording = async () => {
    setIsRecording(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setMediaStream(stream);

      let mimeType = "audio/webm"; // Default to webm if no preference
      if (MediaRecorder.isTypeSupported("audio/mp3")) {
        mimeType = "audio/mp3";
      } else if (MediaRecorder.isTypeSupported("audio/webm")) {
        mimeType = "audio/webm";
      }

      const options = { mimeType };
      const recorder = new MediaRecorder(stream, options);
      const chunks: BlobPart[] = []; // Explicitly typed as an array of BlobPart

      recorder.ondataavailable = (e) => {
        chunks.push(e.data);
      };

      recorder.onstop = async () => {
        const audioBlob = new Blob(chunks, { type: mimeType });
        setAudioUrl(URL.createObjectURL(audioBlob));
      };

      recorder.start();
      // Stop recording after 5 seconds
      setTimeout(() => {
        recorder.stop();
        stream.getTracks().forEach((track) => track.stop());
        setIsRecording(false);
      }, 5000);
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

  // const downloadRecording = () => {
  //   if (recording) {
  //     const url = URL.createObjectURL(recording);
  //     const a = document.createElement("a");
  //     a.href = url;
  //     a.download = "recorded_audio.wav";
  //     document.body.appendChild(a);
  //     a.click();
  //     URL.revokeObjectURL(url);
  //   }
  // };

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

  return (
    <Spin spinning={result.isLoading || isSaving}>
      <div className="p-4 mx-2 bg-white rounded-xl">
        <div className="flex flex-wrap items-center w-full gap-8 sm:justify-between sm:gap-4 sm:flex-nowrap">
          <div className="flex items-center w-full gap-5 sm:w-max">
            <Select
              placeholder={"Select Language"}
              className="font-[gilroy-medium] text-[#19213D] font-normal text-xs bg-[#F7F8FA] rounded-lg p-1 sm:p-0 "
              onChange={(e: string) => {
                setFieldChange("language", e);
                dispatch(setAllAppState({ ...state, selectedLanguage: e }));
              }}
            >
              <Select.Option value="yoruba">Yoruba</Select.Option>
              <Select.Option value="hausa">Hausa</Select.Option>
              <Select.Option value="igbo">Igbo</Select.Option>
              {/* <Select.Option value="pidgin">Pidgin</Select.Option>
            <Select.Option value="ibibio">Ibibio</Select.Option> */}
            </Select>
            <div className="flex items-center">
              <button onClick={isRecording ? stopRecording : startRecording}>
                {isRecording ? "Recording" : <RecorderDark />}
              </button>
              {isRecording && <span className="pulsating-icon"></span>}
            </div>
          </div>
          <Button
            className="flex items-center gap-3 whitespace-nowrap bg-[#096A95] disabled:bg-[#b7e2f5] text-[#FFFFFF] mx-auto !p-2 sm:py-0 sm:mx-0"
            onClick={() => {
              handleFileUpload(audioUrl ?? "");
            }}
            disabled={isRecording || !audioUrl}
          >
            <SendIcon /> Save Audio
          </Button>
        </div>
        {audioUrl && (
          <div className="gap-6 px-2 py-1 my-2 mt-3 border rounded-lg shadow-lg">
            <div className="flex items-center ">
              <button onClick={togglePlayPause} className="">
                {isPlaying ? <PauseIcon /> : <PlayIcon />}
              </button>
              <div ref={waveformRef} className="w-full cursor-pointer"></div>

              <p className="text-lg text-[#666F8D] font-Inter font-medium">
                {formatTime(currentTime)}
              </p>
            </div>
            <div className="flex items-center justify-between mt-[-2px]">
              <CheckMark className="cursor-pointer" />
              <DeleteIcon className="cursor-pointer" onClick={resetRecording} />
            </div>
          </div>
        )}
      </div>
    </Spin>
  );
};

export default Recorder;
