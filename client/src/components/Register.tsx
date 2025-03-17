import { Button, TextInput } from "@mantine/core";
import SvgIcon from "./SvgIcon";
import { useState } from "react";
import { hasLength, isEmail, matchesField, useForm } from "@mantine/form";
import Link from "next/link";

interface RegisterProps {
  className?: string;
}

const Register: React.FC<RegisterProps> = ({ className }) => {
  const classNameValue = className ? `${className}` : "";
  const [mode, setMode] = useState<"login" | "register">("login");
  const [shown, viewPassword] = useState(false);
  // form data
  const form = useForm({
    mode: "controlled",
    initialValues: { name: "", email: "", password: "", confirm: "" },
    validate: {
      email: isEmail("Invalid email"),
      password: (value) =>
        value.trim().length < 8 ? "Must be at least 8 characters" : null,
      name: hasLength({ min: 3 }, "Must be at least 3 characters"),
      confirm: matchesField("password", "Passwords are not the same"),
    },
  });

  return (
    <div className={`mt-40 ${classNameValue}`}>
      <p className="text-[13px] leading-16">
        Enter your email and password to register.
      </p>
      <form className="mt-14" onSubmit={form.onSubmit(console.log)}>
        <TextInput
          placeholder="Username"
          key={form.key("name")}
          {...form.getInputProps("name")}
          classNames={{
            input:
              "rounded-[5px] border-[#EAEAEA] placeholder:text-[#A5A5A5] focus:border-chateau-green",
          }}
        />
        <TextInput
          placeholder="Enter your email address"
          key={form.key("email")}
          {...form.getInputProps("email")}
          classNames={{
            input:
              "rounded-[5px] border-[#EAEAEA] placeholder:text-[#A5A5A5] focus:border-chateau-green",
            root: "mt-17",
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
        <TextInput
          placeholder="Confirm Password"
          type={shown ? "text" : "password"}
          key={form.key("confirm")}
          {...form.getInputProps("confirm")}
          classNames={{
            input:
              "rounded-[5px] border-[#EAEAEA] placeholder:text-[#A5A5A5] focus:border-chateau-green",
            root: "mt-17",
          }}
        />
        <Button
          type="submit"
          classNames={{
            root: "mt-27 bg-chateau-green hover:bg-chateau-green-600 text-white font-medium text-[16px] leading-16 rounded-[5px] min-h-45 w-full",
          }}
        >
          Register
        </Button>
      </form>
      <div className="flex gap-10 items-center mt-45">
        <div className="grow h-1 bg-[#EAEAEA]"></div>
        <p className="text-[13px] leading-16">Or register with</p>
        <div className="grow h-1 bg-[#EAEAEA]"></div>
      </div>
      <Button
        classNames={{
          root: "mt-27 bg-transparent hover:bg-transparent text-dove-gray hover:text-dove-gray-500 font-medium text-[13px] leading-16 rounded-[5px] min-h-40 w-full border-[#EAEAEA]",
        }}
        leftSection={<SvgIcon iconName="google" />}
      >
        Continue with Google
      </Button>
      <Button
        classNames={{
          root: "mt-15 bg-transparent hover:bg-transparent text-dove-gray hover:text-dove-gray-500 font-medium text-[13px] leading-16 rounded-[5px] min-h-40 w-full border-[#EAEAEA]",
        }}
        leftSection={
          <SvgIcon iconName="facebookFill" className="text-[#3B5999]" />
        }
      >
        Continue with Facebook
      </Button>
    </div>
  );
};

export default Register;
