import { useNavigate } from "react-router-dom";
import Error404 from "../../../assets/Images/404.png";
import ArrowIcon from "../../../assets/icons/ArrowIcon";
import { ROUTES } from "../../../utils/routes";

const Error = () => {
  const navigate = useNavigate();
  return (
    <div className=" gap-3 grid max-h-[100svh] my-5 text-[#333333] place-content-center">
      <div className="flex flex-col justify-center text-center">
        <h1 className=" font-[gilroy-bold] text-4xl">Ooops !</h1>
        <p className=" font-[gilroy-medium] text-base">
          This page doesn’t exist
        </p>
      </div>

      <div className="flex justify-center">
        <img
          src={Error404}
          alt=""
          className=" w-[44.5rem] object-contain "
        />
      </div>

      <div
        className="flex items-center justify-center gap-3"
        onClick={() => {
          navigate(ROUTES.HOMEPAGE);
        }}
      >
        <ArrowIcon className="cursor-pointer " />
        <button className="font-[gilroy-medium] text-[#333333] text-base cursor-pointer">
          Go back to homepage
        </button>
      </div>
    </div>
  );
};

export default Error;
