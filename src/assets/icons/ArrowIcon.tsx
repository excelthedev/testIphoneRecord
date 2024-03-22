const ArrowIcon = ({ className,onClick }: { className?: string; onClick?: ()=>void }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.63065 18.2385L0.999878 10M0.999878 10L9.63065 1.76154M0.999878 10L18.9998 10"
        stroke="#19213D"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ArrowIcon;
