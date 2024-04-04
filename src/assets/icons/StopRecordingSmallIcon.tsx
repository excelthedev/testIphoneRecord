const StopRecordingSmallIcon = () => {
  return (
    <svg
      width="23"
      height="23"
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_dii_797_16953)">
        <rect x="5.5" y="4" width="12" height="12" rx="3.2" fill="#096A95" />
      </g>
      <defs>
        <filter
          id="filter0_dii_797_16953"
          x="0.7"
          y="0.8"
          width="21.6"
          height="21.6"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="1.6" />
          <feGaussianBlur stdDeviation="2.4" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.248578 0 0 0 0 0.511194 0 0 0 0 0.93916 0 0 0 0.18 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_797_16953"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_797_16953"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="1.2" />
          <feGaussianBlur stdDeviation="0.4" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.22 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect2_innerShadow_797_16953"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="-1.2" />
          <feGaussianBlur stdDeviation="0.12" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.0543472 0 0 0 0 0.219226 0 0 0 0 0.489388 0 0 0 0.18 0"
          />
          <feBlend
            mode="normal"
            in2="effect2_innerShadow_797_16953"
            result="effect3_innerShadow_797_16953"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default StopRecordingSmallIcon;
