const CheckMark = ({
  onClick,
  className,
}: {
  onClick?: () => void;
  className?: string;
}) => {
  return (
    <svg
      width="18"
      height="14"
      viewBox="0 0 18 14"
      fill="none"
      onClick={onClick}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.5 8.21996L5.47059 12.6317L16.5 1.16113"
        stroke="#4F5158"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CheckMark;
