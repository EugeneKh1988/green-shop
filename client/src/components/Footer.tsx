import { IFooterGroups } from "@/lib/Interfaces";
import Container from "@/components/Container";
import SvgIcon from "./SvgIcon";
import Link from "next/link";
import Image from "next/image";
import pay from "../../public/pay.png";

interface FooterProps {
  footer: IFooterGroups;
  className?: string;
}

const Footer: React.FC<FooterProps> = ({
  footer,
  className,
}) => {
  const classNameValue = className ? `${className}` : "";

  return (
    <Container className={`${classNameValue}`}>
      <div className="bg-alabaster flex gap-35 p-25 flex-wrap xl:flex-nowrap pb-27 border-b-1 border-b-chateau-green/20">
        {footer?.blocks?.map((contactItem, index) => (
          <div key={index} className="md:max-w-210 grow">
            <h2 className="text-[18px] font-bold">{contactItem?.groupName}</h2>
            <ul className="mt-5">
              {contactItem?.links?.map((linkItem, linkIndex) => (
                <li key={linkIndex}>
                  <Link
                    href={linkItem?.href}
                    className="text-[14px] leading-30"
                  >
                    {linkItem?.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <h2 className="text-[18px] font-bold">Social Media</h2>
          <div className="flex gap-10 mt-20">
            {footer?.social?.map((social, index) => (
              <Link
                key={index}
                href={social?.href || "#"}
                className="size-30 rounded-[4px] border-1 border-chateau-green/20 text-chateau-green/60 flex justify-center items-center"
              >
                <SvgIcon iconName={social?.iconName || ""} />
              </Link>
            ))}
          </div>
          <h2 className="text-[18px] font-bold mt-33">We accept</h2>
          <Image src={pay} alt="Payment companies" className="mt-13" />
        </div>
      </div>
      <p className="text-center mt-7 text-[14px] leading-30">© 2021 GreenShop. All Rights Reserved.</p>
    </Container>
  );
};

export default Footer;
