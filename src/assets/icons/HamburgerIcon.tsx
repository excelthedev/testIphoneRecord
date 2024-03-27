const HamburgerIcon = ({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <svg
      width="20"
      height="15"
      viewBox="0 0 20 15"
      fill="none"
      className={className}
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 1.5H15"
        stroke="#096A95"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1 7.5H19"
        stroke="#096A95"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1 13.5H11"
        stroke="#096A95"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default HamburgerIcon;
