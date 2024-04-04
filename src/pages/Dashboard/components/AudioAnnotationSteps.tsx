import { Select, Input } from "antd";
import DeleteIcon from "../../../assets/icons/DeleteIcon";
import MicIconLarge from "../../../assets/icons/MicIconLarge";
import RefreshIcon from "../../../assets/icons/RefreshIcon";
import Speak from "../../../assets/icons/Speak";
import StopRecordingSmallIcon from "../../../assets/icons/StopRecordingSmallIcon";
import TranslateIconSmall from "../../../assets/icons/TranslateIconSmall";
import TranslateLargeIcon from "../../../assets/icons/TranslateLargeIcon";
import { useAppSelector } from "../../../store/hooks";
import RecorderLine from "../../../assets/svgs/recorder-line.svg";
import stopRecordingIcon from "../../../assets/svgs/stop-recording.svg";
import playRecordingIcon from "../../../assets/svgs/play-recording.svg";
import pauseRecordeing from "../../../assets/svgs/pause-recording.svg";

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
}) => {
  const state = useAppSelector((state) => {
    return state.app;
  });
  return (
    <div>
      {state.currentStep !== 2 && (
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
      {state.currentStep === 2 && (
        <div className="w-[80%] sm:w-[60%] mx-auto my-3 bg-white p-4 rounded-2xl">
          <span className="flex items-center justify-between mb-4">
            <Select
              className="w-[10rem] max-w-3/12"
              placeholder="Select Language"
            >
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
                placeholder="Select Language"
              >
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
                placeholder="Select Language"
              >
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
                placeholder="Select Language"
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
