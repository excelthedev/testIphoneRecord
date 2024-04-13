import Audio from '../../../assets/icons/Audio.tsx';
import Translate from '../../../assets/icons/Translate.tsx';
import Mic from '../../../assets/icons/Mic.tsx';
import { useLocation } from 'react-router-dom';

const welcomeIcons = [
  {
    logo: 'wave',
    icon: <Audio />,
    backgroundColor: "#ffffff",
  },
  {
    logo: "mic",
    icon: <Mic />,
    backgroundColor: "#096A95",
  },
  {
    logo: "translate",
    icon: <Translate />,
    backgroundColor: "#ffffff",
  },
];

const WelcomeText: React.FC = () => {
  const location = useLocation();

  return (
    <div className=" h-[478px]  w-[auto] hidden  rounded-md md:flex justify-center items-center lg:w-[100%] ">
      <div className=" w-[100%]">
        {location.pathname === '/signup' ? (
          <p className="text-[1.4rem] font-bold text-center text-[#19213D] font-[gilroy-bold] md:text-[2rem]">
            Welcome To LangEasy
          </p>
        ) : (
          <p className="text-[1.4rem] font-bold text-center text-[#19213D] font-[gilroy-bold] md:text-[2rem]">
            Welcome back to LangEasy
          </p>
        )}

        <p className=" text-center text-[0.9rem] font-normal w-[75%] m-auto text-[#333333] font-[gilroy-medium]">
          Transforming language learning by utilizing cutting-edge data
          collection and analysis methods.
        </p>
        <div className=" mt-5 flex flex-col gap-3">
          <div className=" md:w-[90%] sm:w-[60%] w-[90%] h-[14px] rounded-md bg-white m-auto"></div>
          <div className="  h-[50px] w-[60%] m-auto flex justify-between">
            {welcomeIcons.map((item, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: item.backgroundColor,
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {item.icon}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeText;
