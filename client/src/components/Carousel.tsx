"use client";

import Container from "./Container";
import { Carousel } from "@mantine/carousel";
import { Button, Text } from "@mantine/core";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  ICarousel,
  ICarouselSlide,
  ICarouselTitle,
  IImage,
} from "@/lib/Interfaces";
import Link from "next/link";
import SvgIcon from "./SvgIcon";
import StrapiImage from "./StrapiImage";
import { getImageUrl } from "@/utils/utils";

interface CarouselProps {
  carousel: ICarousel;
  images: IImage[];
  className?: string;
}

const CarouselBlock: React.FC<CarouselProps> = ({
  className,
  carousel,
  images,
}) => {
  const classNameValue = className ? `${className}` : "";
  const autoplay = useRef(Autoplay({ delay: 15000 }));

  const getTitle = (title: string | ICarouselTitle | undefined) => {
    const classes =
      "text-[24px] leading-29 font-bold lg:text-[70px] lg:leading-70";
    if (title && title instanceof Object) {
      return (
        <div className="mt-7">
          <Text className={`${classes} text-dove-gray-900 inline`}>
            {title?.part1 || ""}
          </Text>
          <Text className={`${classes} text-chateau-green inline`}>
            {" " + title?.part2 || ""}
          </Text>
        </div>
      );
    }
    if (title) {
      return <Text className={`${classes} text-dove-gray-900 mt-7`}>{title}</Text>;
    }
    return <Text className={`${classes} text-dove-gray-900 mt-7`}>Title</Text>;
  };

  return (
    <div className={`mt-12 ${classNameValue}`}>
      <Carousel
        align="start"
        speed={1}
        loop
        withControls={false}
        withIndicators
        plugins={[autoplay.current]}
        classNames={{
          indicator:
            "w-[10px] h-[10px] data-[active=true]:bg-chateau-green transition duration-300 border-solid border-2 border-chateau-green",
          indicators: "gap-6",
        }}
      >
        {carousel.content?.map((slide: ICarouselSlide, index) => (
          <Carousel.Slide key={index}>
            <Container>
              <div className="flex flex-nowrap rounded-[30px] items-center bg-linear-to-r from-[#F5F5F580] to-[#F5F5F580] px-40 overflow-hidden">
                <div className="basis-1/2">
                  <Text className="text-dove-gray-900 text-[11px] font-medium leading-16 uppercase md:text-[14px] md:tracking-[0.1em]">
                    {slide?.subtitle}
                  </Text>
                  {getTitle(slide?.title)}
                  <Text className="mt-3 md:mt-5 text-dove-gray text-[12px] leading-18 md:text-[14px] md:leading-24 line-clamp-1 md:line-clamp-none">
                    {slide?.description}
                  </Text>
                  <Button className="hidden md:inline-block mt-44 bg-chateau-green hover:bg-chateau-green-600 text-white font-bold text-[16px] leading-20 rounded-[6px]">
                    {slide?.button?.name}
                  </Button>
                  <Link
                    href={slide?.button?.href || "/"}
                    className="md:hidden mt-11 text-chateau-green text-[12px] leading-14 font-bold"
                  >
                    {slide?.button?.name}
                    <SvgIcon
                      iconName="arrowRight"
                      className="ml-2 inline-block"
                    />
                  </Link>
                </div>
                <div className="basis-1/2 flex items-baseline">
                  <StrapiImage
                    src={getImageUrl(slide?.imageName || "", images)}
                    width={518}
                    height={518}
                    alt={`Slide ${index} image`}
                  />
                </div>
              </div>
            </Container>
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselBlock;
