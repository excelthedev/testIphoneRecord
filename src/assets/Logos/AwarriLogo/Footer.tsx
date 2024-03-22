import AwarriLogo from "./Group.png";

const Footer = () => {
  return (
    <div className="flex items-end gap-2 ">
      <p className=" font-[gilroy-medium] text-xs">Powered by</p>
      <img
        src={AwarriLogo}
        className="w-[3.75rem] h-[1.4rem]"
        alt="logo"
        loading="lazy"
      />
    </div>
  );
};

export default Footer;
