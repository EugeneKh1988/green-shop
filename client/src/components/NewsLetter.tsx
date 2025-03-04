import { IImage, INewsLetters } from "@/lib/Interfaces";
import Container from "@/components/Container";
import StrapiImage from "@/components/StrapiImage";
import { getImageHeight, getImageUrl, getImageWidth } from "@/utils/utils";
import { Button, TextInput } from "@mantine/core";

interface NewsLetterProps {
  newsletter: INewsLetters;
  images: IImage[];
  className?: string;
}

const NewsLetter: React.FC<NewsLetterProps> = ({ newsletter,images, className }) => {
  const classNameValue = className ? `${className}` : "";

  return (
    <Container className={`${classNameValue}`}>
      <div className="bg-alabaster flex gap-35 p-25 flex-wrap xl:flex-nowrap">
        {newsletter?.features?.map((feature, index, features) => (
          <div
            key={index}
            className={`md:max-w-230 md:pr-24 ${features.length - 1 != index ? "md:border-r-1 md:border-r-chateau-green/10" : ""}`}
          >
            <StrapiImage
              src={getImageUrl(feature?.imageName || "#", images)}
              width={getImageWidth(feature?.imageName || "#", images) || 0}
              height={getImageHeight(feature?.imageName || "#", images) || 0}
              alt={feature?.imageName || "Image"}
            />
            <h3 className="font-bold text-[17px] mt-18">{feature?.title}</h3>
            <p className="text-[14px] leading-22 text-dove-gray mt-9">
              {feature?.description}
            </p>
          </div>
        ))}
        <div className="xl:grow">
          <h1 className="font-bold text-[18px]">
            Would you like to join newsletters?
          </h1>
          <div className="flex mt-18">
            <TextInput
              placeholder="enter your email address..."
              classNames={{
                input:
                  "rounded-l-[6px] rounded-r-none placeholder:text-silver-chalice border-0",
                root: "grow",
              }}
            />
            <Button className="bg-chateau-green hover:bg-chateau-green-600 text-white font-bold text-[18px] rounded-l-none rounded-r-[6px]">
              Join
            </Button>
          </div>
          <p className="mt-17 text-[13px] leading-22 text-dove-gray">
            We usually post offers and challenges in newsletter. We're your
            online houseplant destination. We offer a wide range of houseplants
            and accessories shipped directly from our (green)house to yours!
          </p>
        </div>
      </div>
    </Container>
  );
};

export default NewsLetter;
