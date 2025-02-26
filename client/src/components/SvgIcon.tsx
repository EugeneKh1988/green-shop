import React from "react";



const SvgIcon = ({
  iconName,
  className,
}: {
  iconName: string;
  className?: string;
}) => {
  const classNameValue = className ? { className } : {};
  // icons
  const icons: Record<string, React.ReactElement> = {
    bar: (
      <svg
        width="25"
        height="24"
        viewBox="0 0 25 24"
        fill="currentColor"
        stroke="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        {...classNameValue}
      >
        <path
          d="M4.5 18L14.5 18"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4.5 12L20.5 12"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4.5 6L10.5 6"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  };

  const Icon = icons[iconName];
  return <>{Icon}</>;
};

export default SvgIcon;
