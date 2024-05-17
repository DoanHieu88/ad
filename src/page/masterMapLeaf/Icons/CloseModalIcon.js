import React from "react";

const CloseModalIcon = ({ color, width, height }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 10 10"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 1.4285L8.57133 0L5 3.5715L1.4285 0L0 1.4285L3.57133 5L0 8.5715L1.4285 10L5 6.4285L8.57133 10L10 8.5715L6.42833 5L10 1.4285Z"
        fill={color}
      />
    </svg>
  );
};

export default CloseModalIcon;
