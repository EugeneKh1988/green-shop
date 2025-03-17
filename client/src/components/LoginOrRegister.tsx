"use client";

import { Button, Modal } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import SvgIcon from "./SvgIcon";
import { useState } from "react";
import Login from "./Login";


interface LoginOrRegisterProps {
  className?: string;
}

const LoginOrRegister: React.FC<LoginOrRegisterProps> = ({
  className,
}) => {
  const classNameValue = className ? `${className}` : "";
  const [opened, { open, close }] = useDisclosure(false);
  const isMobile = useMediaQuery("(max-width: 48rem)");
  const [mode, setMode] = useState<"login" | "register">("login");

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title=""
        fullScreen={isMobile}
        transitionProps={{ transition: "fade", duration: 200 }}
        centered
        classNames={{
          overlay: "bg-[#0A0D1240]",
          close: "text-chateau-green",
          content: "rounded-none min-w-500",
          body: "px-100 border-b-10 border-b-chateau-green",
          root: `${classNameValue}`,
        }}
      >
        <div className="flex justify-center gap-12 text-[20px] leading-16 font-medium">
          <p
            className={`${mode == "login" ? "text-chateau-green" : "text-tuatara"} cursor-pointer`}
            onClick={() => setMode("login")}
          >
            Login
          </p>
          <p>|</p>
          <p
            className={`${mode == "register" ? "text-chateau-green" : "text-tuatara"} cursor-pointer`}
            onClick={() => setMode("register")}
          >
            Register
          </p>
        </div>
        {mode === "login" ? <Login /> : null}
      </Modal>

      <Button
        leftSection={<SvgIcon iconName="logout" />}
        classNames={{
          root: "bg-chateau-green hover:bg-chateau-green-600 text-white font-medium text-[16px] leading-20 rounded-[6px]",
          section: "mr-4",
        }}
        onClick={open}
      >
        Login
      </Button>
    </>
  );
};

export default LoginOrRegister;
