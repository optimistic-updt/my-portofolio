import { FC } from "react";

export const Logo: FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      viewBox="0 0 124 147"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M43.7146 142.778L5.73746 76.7011C4.66194 74.8298 4.66382 72.5275 5.7424 70.6579L42.3231 7.2513C43.4045 5.37689 45.404 4.22205 47.568 4.22205H113.026C117.684 4.22205 120.598 9.26204 118.273 13.2988L83.6073 73.5M43.7146 142.778L83.6073 73.5M43.7146 142.778H113.026C117.684 142.778 120.598 137.738 118.273 133.701L83.6073 73.5"
        stroke="url(#paint0_linear)"
        strokeWidth="8"
      />
      <defs>
        <linearGradient
          id="paint0_linear"
          x1="63.75"
          y1="4.22205"
          x2="63.75"
          y2="142.778"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF69F0" />
          <stop offset="1" stopColor="#BB4DFF" />
        </linearGradient>
      </defs>
    </svg>
  );
};
