type buttonProps = {
  children?: string | React.ReactNode;
  value?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  id?: string;
};

const Button: React.FC<buttonProps> = ({
  children,
  value,
  onClick,
  className,
  disabled,
  id,
}) => {
  return (
    <button
      id={id}
      value={value}
      onClick={onClick}
      className={`border-[#0a354648] text-[#0A3546] border-[0.2px] rounded-lg py-3 px-4 text-base font-[gilroy-medium] font-normal hover:scale-90 transition-all ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
