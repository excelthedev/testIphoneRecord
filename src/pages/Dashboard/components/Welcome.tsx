// import { useAppSelector } from "../../../store/hooks";

const Welcome: React.FC = () => {
  // const state = useAppSelector((state) => {
  //   return state.app;
  // });
  return (
    <div className="bg-[#0A3546] text-center grid gap-4 p-4 rounded-2xl mt-4 mx-3">
      <h1 className="font-[gilroy-bold] text-white font-normal text-2xl ">
        Welcome To LangEasy Audio Data Collection
      </h1>
      <p className="text-[#CDD0DA] font-[gilroy-medium] text-sm font-normal">
        Join LangEasy to revolutionize language learning and global <br />
        communication. Your voice matters as we unlock the power of <br />
        multilingual expression together.
      </p>
      {/* {state.selectedWord && (
        <div className="flex justify-center  items-center  rounded-2xl bg-white p-3 w-full font-[gilroy-bold] text-xl   max-w-[35rem] m-auto">
          {state.selectedWord?.toUpperCase()}
        </div>
      )} */}
    </div>
  );
};

export default Welcome;
