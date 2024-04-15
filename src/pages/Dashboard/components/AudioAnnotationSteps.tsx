import { Select, Input } from "antd";
import DeleteIcon from "../../../assets/icons/DeleteIcon";
import MicIconLarge from "../../../assets/icons/MicIconLarge";
import RefreshIcon from "../../../assets/icons/RefreshIcon";
import Speak from "../../../assets/icons/Speak";
import StopRecordingSmallIcon from "../../../assets/icons/StopRecordingSmallIcon";
import TranslateIconSmall from "../../../assets/icons/TranslateIconSmall";
import TranslateLargeIcon from "../../../assets/icons/TranslateLargeIcon";
import RecorderLine from "../../../assets/svgs/recorder-line.svg";
import stopRecordingIcon from "../../../assets/svgs/stop-recording.svg";
import playRecordingIcon from "../../../assets/svgs/play-recording.svg";
import pauseRecordeing from "../../../assets/svgs/pause-recording.svg";
import React from "react";
import useFieldRequest from "../../../hooks/useFieldRequest";
import { useAppSelector } from "../../../store/hooks";

type Props = {
  isRecording: boolean;
  audioUrl?: string | null;
  isPlaying: boolean;
  stopRecording: () => void;
  startRecording: () => void;
  togglePlayPause: () => void;
  handleRestartRecording: () => void;
  resetRecording: () => void;
  waveformRef: any;
  currentTime: number;
  formatTime?: (currentTime: number) => string;
  userId: string | undefined;
  data: any;
};

const AudioAnnotationSteps: React.FC<Props> = ({
  isRecording,
  audioUrl,
  isPlaying,
  startRecording,
  stopRecording,
  togglePlayPause,
  handleRestartRecording,
  resetRecording,
  currentTime,
  waveformRef,
  formatTime,
  userId,
  data,
}) => {
  const { setRequest } = useFieldRequest();
  const state = useAppSelector((state) => {
    return state.app;
  });
  return (
    <div>
      {(data?.data?.taskStage === 1 ) && !isRecording && (
        <span className="flex flex-col sm:flex-row items-center justify-center mt-20 text-[#333333] text-xs md:text-base font-[gilroy-medium] text-center ">
          <span className="flex items-center justify-center">
            Click <Speak />
          </span>
          <span>and read the sentence aloud</span>
        </span>
      )}
      {(data?.data?.taskStage === 1 || 3) && isRecording && (
        <span className="flex flex-col sm:flex-row items-center justify-center mt-20 text-[#333333] text-xs md:text-base font-[gilroy-medium] text-center ">
          <span className="flex items-center justify-center">
            Click <StopRecordingSmallIcon />
          </span>
          <span>when you’re done recording</span>
        </span>
      )}
      {data?.data?.taskStage === 2 && (
        <span className="flex flex-col sm:flex-row items-center justify-center mt-20 text-[#333333] text-xs md:text-base font-[gilroy-medium] text-center ">
          <span className="flex items-center justify-center gap-2 mr-2">
            Translate <TranslateIconSmall />
          </span>
          <span>the displayed sentence in the language of your choosing</span>
        </span>
      )}
       {(data?.data?.taskStage === 3 ) && !isRecording && (
        <span className="flex flex-col sm:flex-row items-center justify-center mt-20 text-[#333333] text-xs md:text-base font-[gilroy-medium] text-center ">
          <span className="flex items-center justify-center">
            Click <Speak />
          </span>
          <span>and read the sentence aloud in {state.request?.language}</span>
        </span>
      )}
      <div className="flex items-center space-between sm:w-[60%] mx-auto">
        <div className=" w-full mt-2 p-3 text-center mx-auto bg-white rounded-2xl border flex items-center border-[#E3E6EA] overflow-hidden">
          <p className="text-center flex-grow w-full text-[#333333] font-[gilroy-bold] text-2xl">
            {data?.data?.text}
          </p>
        </div>
        {/* <div className=" mt-2 p-3 text-center mx-auto bg-white rounded-2xl border flex items-center border-[#E3E6EA] overflow-hidden">
          <p className="opacity-50 ">
            {data?.data[state.currentDialog + 1]?.text}
          </p>
        </div> */}
      </div>
      {data?.data?.taskStage === 1 && (
        <div className="w-full ">
          {!isRecording && !audioUrl && (
            <div className="mt-[5rem] w-full mx-auto  relative">
              <img src={RecorderLine} alt="" className="mx-auto" />
              <button
                onClick={startRecording}
                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full top-1/2 left-1/2"
                // className=" rounded-[50%] flex justify-center items-center absolute -translate-x-1/2  transform left-1/2  top-[-30px]"
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
                    {/* {formatTime(currentTime)} */}
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
      {data?.data?.taskStage === 2 && (
        <div className="w-[80%] sm:w-[60%] mx-auto my-3 bg-white p-4 rounded-2xl">
          <span className="flex items-center justify-between mb-4">
            <Select
              className="w-[10rem] max-w-3/12"
              placeholder="Select Language"
              onChange={(e) => {
                setRequest("language", e);
              }}
            >
              <Select.Option value={"Yoruba"}>Yoruba</Select.Option>
              <Select.Option value={"Igbo"}>Igbo</Select.Option>
              <Select.Option value={"Hausa"}>Hausa</Select.Option>
            </Select>
            <TranslateLargeIcon />
          </span>
          <hr className="my-4" />
          <Input.TextArea
            className="border-none outline-none focus:border-none text-[#867F7F] font-[gilroy-medium] text-sm font-normal focus:outline-none resize-none"
            rows={8}
            placeholder="Enter your translation here ........"
            onChange={(e) => {
              setRequest("translateText", e.target.value);
            }}
          ></Input.TextArea>
        </div>
      )}
      {data?.data?.taskStage === 3 && (
        <div className="">
          {!isRecording && !audioUrl && (
            <div className="mt-[5rem] w-[80%] sm:w-[60%] mx-auto bg-white p-6 rounded-2xl">
              <Select
                className="w-[10rem] text-[#19213D] font-[gilroy-medium] text-xs font-normal mb-4 h-10 max-w-3/12"
                placeholder="Select Language"
                defaultValue={state.request?.language}
                 onChange={(e) => {
              setRequest("translateText", e.target.value);
            }}
              >
                <Select.Option value={"Yoruba"}>Yoruba</Select.Option>
                <Select.Option value={"Igbo"}>Igbo</Select.Option>
                <Select.Option value={"Hausa"}>Hausa</Select.Option>
              </Select>
              <div className="relative p-6 ">
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
                onChange={(e) => {
              setRequest("translateText", e.target.value);
            }}
                defaultValue={state.request?.language}
              >
                <Select.Option value={"Yoruba"}>Yoruba</Select.Option>
                <Select.Option value={"English"}>English</Select.Option>
                <Select.Option value={"Hausa"}>Hausa</Select.Option>
              </Select>

              <div className="relative p-6">
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
                 onChange={(e) => {
              setRequest("translateText", e.target.value);
            }}
                defaultValue={state.request?.language}
              >
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
                    {/* {formatTime(currentTime)} */}
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
    </div>
  );
};

export default AudioAnnotationSteps;
