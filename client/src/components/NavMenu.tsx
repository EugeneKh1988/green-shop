"use client"

import { ActionIcon, Badge, Button, Drawer, ScrollArea, Text, TextInput } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import SvgIcon from "./SvgIcon";
import { NavProps } from "./Nav";
import Link from "next/link";
import StrapiImage from "./StrapiImage";
import { getImageUrl } from "@/utils/utils";
import CartBadge from "./CartBadge";
import LoginOrRegister from "./LoginOrRegister";



const NavMenu: React.FC<NavProps> = ({
  header,
  images,
  className,
  activeMenuName,
}) => {
  const classNameValue = className ? `${className}` : "";
  const [opened, { open, close }] = useDisclosure(false);
  const isMaximumWidth = useMediaQuery("(max-width: 28.125em)");
  const isMobile = useMediaQuery("(max-width: 40em)");
  return (
    <div className={`${classNameValue}`}>
      <Drawer.Root
        opened={isMobile ? false :opened}
        onClose={close}
        position="right"
        size={isMaximumWidth ? "100%" : "28.125em"}
        scrollAreaComponent={ScrollArea.Autosize}
      >
        <Drawer.Overlay />
        <Drawer.Content>
          <Drawer.Header className="px-0 mx-25 py-15 md:py-25 md:mx-35 border-b border-b-chateau-green">
            <Drawer.Title>
              <Link href="/" className="block">
                <StrapiImage
                  src={getImageUrl(header.logoName, images)}
                  width={150}
                  height={34}
                  alt="Logo"
                />
              </Link>
            </Drawer.Title>
            <Drawer.CloseButton className="text-chateau-green" />
          </Drawer.Header>
          <Drawer.Body className="pb-25 px-25 md:pb-35 md:px-35">
            <div className="font-medium text-[18px] leading-24 text-tuatara border-b border-b-chateau-green">
              {header.nav.map((navItem) => (
                <Link
                  href={navItem.href}
                  key={navItem.name}
                  className={`px-5 py-20 block hover:bg-chateau-green hover:text-white ${activeMenuName == navItem.name ? "font-bold border-b-3 border-b-chateau-green" : ""}`}
                >
                  {navItem.name}
                </Link>
              ))}
            </div>
            <TextInput
              placeholder="Find your plants"
              rightSection={
                <ActionIcon variant="transparent" size={32}>
                  <SvgIcon iconName="find" />
                </ActionIcon>
              }
              classNames={{
                input:
                  "rounded-[10px] border-none bg-[#F8F8F8] placeholder:text-[#A5A5A5] min-h-45 text-tuatara",
                root: "py-20",
              }}
            />
            <div className="flex gap-30">
              <ActionIcon
                variant="transparent"
                size={32}
                className="relative overflow-visible"
              >
                <SvgIcon iconName="cart" />
                <CartBadge />
              </ActionIcon>
              <LoginOrRegister />
            </div>
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Root>

      <Button variant="transparent" onClick={open} className="text-tuatara">
        <SvgIcon iconName="bar" />
      </Button>
    </div>
  );
};

export default NavMenu;

