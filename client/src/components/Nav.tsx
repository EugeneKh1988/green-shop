import { IHeader, IImage } from "@/lib/Interfaces";
import Container from "@/components/Container";
import StrapiImage from "@/components/StrapiImage";
import Link from "next/link";
import { ActionIcon, Badge, Button, TextInput } from "@mantine/core";
import SvgIcon from "./SvgIcon";
import NavMenu from "./NavMenu";
import { getImageUrl } from "@/utils/utils";
import Image from "next/image";
import footer from "../../public/footer.svg";

interface NavProps {
  header: IHeader;
  images: IImage[];
  activeMenuName: string;
  className?: string;
}

const Nav: React.FC<NavProps> = ({
  header,
  images,
  className,
  activeMenuName,
}) => {
  const classNameValue = className ? `${className}` : "";

  return (
    <>
      <Container className={`${classNameValue}`}>
        <div className="flex justify-between items-center md:py-10 lg:py-0 md:border-b-[0.3px] md:border-b-chateau-green/50">
          <Link href="/" className="hidden md:block">
            <StrapiImage
              src={getImageUrl(header.logoName, images)}
              width={150}
              height={34}
              alt="Logo"
            />
          </Link>
          <ul className="hidden lg:block">
            {header.nav.map((linkItem, index) => (
              <li
                key={index}
                className={`inline-block mr-50 last:mr-0 py-25 ${activeMenuName == linkItem.name ? "border-b-3 border-b-chateau-green font-bold" : ""}`}
              >
                <Link href={linkItem.href} className="block text-[16px]">
                  {linkItem.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="hidden lg:flex gap-30">
            <ActionIcon variant="transparent" size={32}>
              <SvgIcon iconName="find" />
            </ActionIcon>
            <ActionIcon
              variant="transparent"
              size={32}
              className="relative overflow-visible"
            >
              <SvgIcon iconName="cart" />
              <Badge
                circle
                className="absolute bg-chateau-green size-12 text-[10px] font-medium top-5 right-0"
              >
                6
              </Badge>
            </ActionIcon>
            <Button
              leftSection={<SvgIcon iconName="logout" />}
              classNames={{
                root: "bg-chateau-green hover:bg-chateau-green-600 text-white font-medium text-[16px] leading-20 rounded-[6px]",
                section: "mr-4",
              }}
            >
              Login
            </Button>
          </div>
          {/*for tablets */}
          <NavMenu
            header={header}
            images={images}
            activeMenuName={activeMenuName}
            className="hidden md:block lg:hidden"
          />
        </div>
        {/*for mobile devices */}
        <div className="flex md:hidden gap-8 py-20 items-center w-full">
          <TextInput
            placeholder="Find your plants"
            leftSection={
              <ActionIcon variant="transparent" size={32}>
                <SvgIcon iconName="find" />
              </ActionIcon>
            }
            classNames={{
              input:
                "rounded-[10px] border-none bg-[#F8F8F8] placeholder:text-[#A5A5A5] min-h-45 text-tuatara",
              root: "block w-full",
            }}
          />
          <ActionIcon
            variant="gradient"
            size={45}
            gradient={{ from: "#46A35873", to: "#46a358", deg: 90 }}
            className="shadow-xl shadow-chateau-green/30"
          >
            <SvgIcon iconName="filter" className="text-white" />
          </ActionIcon>
        </div>
      </Container>
      <div className="z-10 fixed  md:hidden bottom-0 left-0 right-0">
        <div className="relative">
          <Image src={footer} alt="Footer" className="w-full" />
          <div className="absolute bottom-30 left-0 right-0">
            <div className="flex">
              <div className="basis-1/2 flex justify-around px-20">
                <ActionIcon variant="transparent" size={32}>
                  <SvgIcon
                    iconName="home"
                    className={`${activeMenuName == "Home" ? "text-chateau-green" : ""}`}
                  />
                </ActionIcon>
                <ActionIcon variant="transparent" size={32}>
                  <SvgIcon iconName="heart" className="text-[#D9D9D9]" />
                </ActionIcon>
              </div>
              <div className="basis-1/2 flex justify-around px-20">
                <ActionIcon variant="transparent" size={32}>
                  <SvgIcon iconName="fillCart" className="text-[#D9D9D9]" />
                </ActionIcon>
                <ActionIcon variant="transparent" size={32}>
                  <SvgIcon iconName="user" className="text-[#D9D9D9]" />
                </ActionIcon>
              </div>
            </div>
          </div>
          <div className="absolute top-30 max-[228px]:hidden min-[338px]:top-30 min-[633px]:top-50 left-0 right-0">
            <div className="flex justify-center">
              <ActionIcon
                variant="gradient"
                size={65}
                gradient={{ from: "#46A35866", to: "#46a358", deg: 90 }}
                className="shadow-xl shadow-chateau-green/30 rounded-full"
              >
                <SvgIcon iconName="open" className="text-white" />
              </ActionIcon>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
