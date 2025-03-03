import { IImage, IInfo } from "@/lib/Interfaces";
import Container from "@/components/Container";
import StrapiImage from "@/components/StrapiImage";
import Link from "next/link";
import { Button, } from "@mantine/core";
import SvgIcon from "./SvgIcon";
import { getImageUrl } from "@/utils/utils";

interface InfoProps {
  info: IInfo;
  images: IImage[];
  className?: string;
}

const Info: React.FC<InfoProps> = ({
  info,
  images,
  className,
}) => {
  const classNameValue = className ? `${className}` : "";

  return (
    <Container className={`my-40 lg:mt-94 md:mb-130 ${classNameValue}`}>
      <div className="flex flex-col lg:flex-row gap-28">
        {info?.items?.map((infoItem, index) => (
          <div className="grow relative sm:min-h-250 lg:min-h-300 xl:min-h-250 bg-alabaster" key={index}>
            <div className="sm:absolute flex bottom-0 left-0 right-0 items-center">
              <StrapiImage
                src={getImageUrl(infoItem?.imageName || "", images)}
                width={292}
                height={292}
                alt="Info Image"
                className="hidden sm:block"
              />
              <div className="text-right p-10 sm:pr-30 mt-15">
                <p className="font-bold text-[18px] leading-24">
                  {infoItem?.title}
                </p>
                <p className="text-[14px] leading-24 text-dove-gray mt-5">
                  {infoItem?.description}
                </p>
                <Button
                  component={Link}
                  href={infoItem?.button?.href || "#"}
                  rightSection={<SvgIcon iconName="arrowRight" />}
                  classNames={{
                    root: "mt-15 bg-chateau-green hover:bg-chateau-green-600 text-white font-medium text-[14px] leading-20 rounded-[6px]",
                    section: "ml-4",
                  }}
                >
                  {infoItem?.button?.name}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Info;
