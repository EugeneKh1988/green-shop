import { IContactItems, IHeader, IImage, INewsLetters } from "@/lib/Interfaces";
import Container from "@/components/Container";
import StrapiImage from "@/components/StrapiImage";
import { getImageHeight, getImageUrl, getImageWidth } from "@/utils/utils";
import SvgIcon from "./SvgIcon";
import Link from "next/link";

interface ContactsProps {
  header: IHeader;
  contacts: IContactItems;
  images: IImage[];
  className?: string;
}

const Contacts: React.FC<ContactsProps> = ({
  contacts,
  header,
  images,
  className,
}) => {
  const classNameValue = className ? `${className}` : "";

  return (
    <Container className={`${classNameValue}`}>
      <div className="bg-chateau-green/10 flex gap-35 p-25 flex-wrap xl:flex-nowrap items-center border-y-1 border-y-chateau-green/10">
        <div className="md:max-w-180 grow">
          <Link href="/">
            <StrapiImage
              src={getImageUrl(header.logoName, images)}
              width={150}
              height={34}
              alt="Logo"
            />
          </Link>
        </div>
        {contacts?.items?.map((contactItem, index) => (
          <div key={index} className="md:max-w-230 flex items-center gap-12">
            <SvgIcon
              iconName={contactItem?.iconName || ""}
              className="text-chateau-green shrink-0"
            />
            <p className="text-[14px] leading-22">{contactItem?.text}</p>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Contacts;
