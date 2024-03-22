import { Select } from "antd";
import Button from "./Button";
import SendIcon from "../assets/icons/SendIcon";
import useSetRequest from "../hooks/useSetRequest";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setAllAppState } from "../store/slice/app-slice";
import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import RecorderDark from "../assets/icons/RecorderDark";
import PauseIcon from "../assets/icons/PauseIcon";
import PlayIcon from "../assets/icons/PlayIcon";
import CheckMark from "../assets/icons/CheckMark";
import DeleteIcon from "../assets/icons/DeleteIcon";

const Recorder = () => {
  // const [recording, setRecording] = useState<Blob | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
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
  const formData = new FormData();
  // async function convertBlobToMp3(blobUrl: string): Promise<Blob> {
  //   const audio = new Audio();
  //   audio.src = blobUrl;

  //   return new Promise((resolve, reject) => {
  //     audio.addEventListener("canplaythrough", async () => {
  //       const mediaStream = audio.captureStream();
  //       const mediaRecorder = new MediaRecorder(mediaStream);
  //       const audioChunks: BlobPart[] = [];

  //       mediaRecorder.addEventListener("dataavailable", (event: BlobEvent) => {
  //         audioChunks.push(event.data);
  //       });

  //       mediaRecorder.addEventListener("stop", () => {
  //         const audioBlob = new Blob(audioChunks, { type: "audio/mpeg" });
  //         resolve(audioBlob);
  //       });

  //       mediaRecorder.start();
  //       audio.play();

  //       setTimeout(() => {
  //         mediaRecorder.stop();
  //       }, audio.duration * 1000); // Record for the duration of the audio
  //     });

  //     audio.addEventListener("error", (error) => {
  //       reject(error);
  //     });
  //   });
  // }

  const recordSubmitHandler = async () => {
    if (!audioUrl) return;
    try {
      audioUrl && formData.append("upload_preset", "dsqred2k");
      audioUrl && formData.append("file", audioUrl);
      fetch(`${cloudinaryBaseUrl}${cloudinaryCloudName}/image/upload`, {
        body: formData,
        method: "POST",
      })
        .then((res) => res.json())
        .then((respose) => console.log(respose));
    } catch (error) {
      console.log("error", error);
    }
    // fetch("https://awarrillm.onrender.com/api/audio", {
    //   body: JSON.stringify({ wordName: state.request?.selectedWord }),
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
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
        const audioBlob = new Blob(chunks, { type: "audio/wav" });
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
    <div className="p-3">
      <div className="flex flex-wrap items-center justify-center gap-8 sm:justify-between sm:gap-4 bg-[#F7F8FA] ">
        <div className="flex items-center gap-8 ">
          <Select
            placeholder={"Select Language"}
            className="font-[gilroy-medium] text-[#262626] text-xs bg-[#F7F8FA] rounded-lg "
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
              {isRecording ? "Stop Recording" : <RecorderDark />}
            </button>
            {isRecording && <span className="pulsating-icon"></span>}
          </div>
        </div>
        <Button
          className="flex items-center gap-3 whitespace-nowrap"
          onClick={recordSubmitHandler}
        >
          <SendIcon /> Save Audio
        </Button>
      </div>
      <div className="flex items-center gap-6">
        {audioUrl && (
          <button onClick={togglePlayPause} className="">
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>
        )}
        <div ref={waveformRef} className="w-full cursor-pointer"></div>
        {audioUrl && (
          <p className="text-lg text-[#666F8D] font-Inter font-medium">
            {formatTime(currentTime)}
          </p>
        )}
      </div>
      {audioUrl && (
        <div className="flex items-center justify-between mb-4">
          <CheckMark className="cursor-pointer" />
          <DeleteIcon className="cursor-pointer" onClick={resetRecording} />
        </div>
      )}
    </div>
  );
};

export default Recorder;
