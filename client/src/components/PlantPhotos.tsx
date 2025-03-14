"use client"

import { useState } from "react";
import { Carousel } from "@mantine/carousel";
import { IImage } from "@/lib/Interfaces";
import StrapiImage from "./StrapiImage";
import { useMediaQuery } from "@mantine/hooks";

interface PlantPhotosProps {
  photos?: IImage[];
  className?: string;
}

const PlantPhotos: React.FC<PlantPhotosProps> = ({ className, photos }) => {
  const classNameValue = className ? `${className}` : "";
  const [currentPhotoIndex, setCurrentPhoto] = useState(0);
  const isMobile = useMediaQuery("(max-width: 48rem)");

  const currentPhoto = () => {
    if (photos && photos.length > 0) {
      return photos[currentPhotoIndex % photos.length];
    }
    return null;
  };

  return (
    <div
      className={`flex flex-col md:flex-row gap-29 overflow-hidden items-start ${classNameValue}`}
    >
      <Carousel
        withIndicators={false}
        height={isMobile ? 100 : 444}
        slideGap={16}
        slideSize={isMobile ? "100px" : "10%"}
        onSlideChange={(index) => setCurrentPhoto(index)}
        loop
        orientation={isMobile ? "horizontal" : "vertical"}
        align="start"
        classNames={{ slide: "max-w-100", root: "md:shrink-0" }}
      >
        {photos &&
          photos.map((photo, index) => (
            <Carousel.Slide key={index} onClick={() => setCurrentPhoto(index)}>
              <StrapiImage
                src={photo?.url || ""}
                width={photo?.width || 0}
                height={photo?.height || 0}
                alt={photo?.name || ""}
              />
            </Carousel.Slide>
          ))}
      </Carousel>
      {currentPhoto() ? (
        <StrapiImage
          src={currentPhoto()?.url || ""}
          width={currentPhoto()?.width || 0}
          height={currentPhoto()?.height || 0}
          alt={currentPhoto()?.name || ""}
          className="xl:max-w-444"
        />
      ) : null}
    </div>
  );
};

export default PlantPhotos;
