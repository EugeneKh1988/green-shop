import Image from "next/image";
import * as React from "react";

interface StrapiImageProps {
    width: number,
    height: number,
    src: string,
    alt:string,
    className?: string,
}


const StrapiImage: React.FC<StrapiImageProps> = (props) => {
  const src = { src: `${process.env.NEXT_PUBLIC_HOST}${props.src}` };
  const newProps = { ...props, ...src };
  return <Image {...newProps} />;
};

export default StrapiImage;

