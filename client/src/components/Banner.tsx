import { IBanner, IImage } from "@/lib/Interfaces";
import Link from "next/link";
import StrapiImage from "./StrapiImage";
import { getImageUrl } from "@/utils/utils";


interface BannerProps {
  banner: IBanner;
  images: IImage[];
  className?: string;
}

const Banner: React.FC<BannerProps> = ({ banner, images, className }) => {
  const classNameValue = className ? `${className}` : "";

  return (
    <div
      className={`text-center bg-linear-to-t from-chateau-green/3 to-chateau-green/10 ${classNameValue}`}
    >
      <h1 className="text-[50px] leading-50 pt-15 text-chateau-green">
        {banner.title}
      </h1>
      <Link
        href={banner?.href || "#"}
        className="text-[23px] leading-23 font-bold block mt-12"
      >
        {banner?.offer}
      </Link>
      <StrapiImage
        src={getImageUrl(banner?.imageName || "", images)}
        width={370}
        height={370}
        alt="Banner"
        className="mt-6 mix-blend-multiply"
      />
    </div>
  );
};

export default Banner;
