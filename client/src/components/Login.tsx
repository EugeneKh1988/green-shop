
import { Button, TextInput, } from "@mantine/core";
import SvgIcon from "./SvgIcon";
import { useState } from "react";
import {isEmail, useForm} from "@mantine/form";
import Link from "next/link";

interface LoginProps {
  className?: string;
}

const Login: React.FC<LoginProps> = ({ className }) => {
  const classNameValue = className ? `${className}` : "";
  const [mode, setMode] = useState<"login" | "register">("login");
  const [shown, viewPassword] = useState(false);
  // form data
  const form = useForm({
    mode: "controlled",
    initialValues: { email: "", password: "" },
    validate: {
      email: isEmail("Invalid email"),
      password: (value) =>
        value && value.trim().length == 0 ? "Must not be empty" : null,
    },
  });

  return (
    <div className={`mt-40 ${classNameValue}`}>
      <p className="text-[13px] leading-16">
        Enter your username and password to login
      </p>
      <form className="mt-14">
        <TextInput
          placeholder="Email"
          key={form.key("email")}
          {...form.getInputProps("email")}
          classNames={{
            input:
              "rounded-[5px] border-[#EAEAEA] placeholder:text-[#A5A5A5] focus:border-chateau-green",
          }}
        />
        <TextInput
          placeholder="Password"
          type={shown ? "text" : "password"}
          key={form.key("password")}
          {...form.getInputProps("password")}
          classNames={{
            input:
              "rounded-[5px] border-[#EAEAEA] placeholder:text-[#A5A5A5] focus:border-chateau-green",
            root: "mt-17",
          }}
          rightSection={
            shown ? (
              <div onClick={() => viewPassword(!shown)}>
                <SvgIcon iconName="show" className="size-20 text-dove-gray" />
              </div>
            ) : (
              <div onClick={() => viewPassword(!shown)}>
                <SvgIcon iconName="hide" className="size-20 text-dove-gray" />
              </div>
            )
          }
        />
        <div className="text-right">
          <Link
            href="#"
            onClick={() => console.log("forgot password link")}
            className="text-[14px] leading-16 mt-14 text-chateau-green"
          >
            Forgot Password?
          </Link>
        </div>
        <Button
          classNames={{
            root: "mt-27 bg-chateau-green hover:bg-chateau-green-600 text-white font-medium text-[16px] leading-16 rounded-[5px] min-h-45 w-full",
          }}
        >
          Login
        </Button>
      </form>
      <div className="flex gap-10 items-center mt-45">
        <div className="grow h-1 bg-[#EAEAEA]"></div>
        <p className="text-[13px] leading-16">Or login with</p>
        <div className="grow h-1 bg-[#EAEAEA]"></div>
      </div>
      <Button
        classNames={{
          root: "mt-27 bg-transparent hover:bg-transparent text-dove-gray hover:text-dove-gray-500 font-medium text-[13px] leading-16 rounded-[5px] min-h-40 w-full border-[#EAEAEA]",
        }}
        leftSection={<SvgIcon iconName="google" />}
      >
        Login
      </Button>
      <Button
        classNames={{
          root: "mt-15 bg-transparent hover:bg-transparent text-dove-gray hover:text-dove-gray-500 font-medium text-[13px] leading-16 rounded-[5px] min-h-40 w-full border-[#EAEAEA]",
        }}
        leftSection={
          <SvgIcon iconName="facebookFill" className="text-[#3B5999]" />
        }
      >
        Login with Facebook
      </Button>
    </div>
  );
};

export default Login;
