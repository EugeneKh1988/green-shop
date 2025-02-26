import * as React from "react";

interface ContainerProps {
    children: React.ReactNode,
    className?: string,
}


const Container: React.FC<ContainerProps> = ({ children, className }) => {
  const classNameValue = className ? `${className}` : "";
  return (
    <div
      className={`container px-24 md:px-50 2xl:px-120 mx-auto ${classNameValue}`}
    >
      {children}
    </div>
  );
};

export default Container;

