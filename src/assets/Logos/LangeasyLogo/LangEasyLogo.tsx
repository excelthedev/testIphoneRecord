import { Link, useLocation } from "react-router-dom";
import logo from "./Logo.png";
import { ROUTES } from "../../../utils/routes";
const LangEasyLogo = () => {
  const location = useLocation();

  return (
    <Link
      to={
        location.pathname === ROUTES.DASHBOARD
          ? ROUTES.DASHBOARD
          : ROUTES.HOMEPAGE
      }
    >
      <img
        src={logo}
        className="w-[6rem] sm:w-[12rem] h-7 sm:h-11 object-contain"
        alt="logo"
        loading="lazy"
      />
    </Link>
  );
};

export default LangEasyLogo;
