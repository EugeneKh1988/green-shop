import { Button, TextInput } from "@mantine/core";
import { isEmail, useForm } from "@mantine/form";

interface ForgetPasswordProps {
  className?: string;
}

const ForgetPassword: React.FC<ForgetPasswordProps> = ({ className }) => {
  const classNameValue = className ? `${className}` : "";
  // form data
  const form = useForm({
    mode: "controlled",
    initialValues: { email: "" },
    validate: {
      email: isEmail("Invalid email"),
    },
  });

  return (
    <div className={`mt-40 ${classNameValue}`}>
      <p className="text-[13px] leading-16">
        Enter your email to restore password
      </p>
      <form className="mt-14" onSubmit={form.onSubmit(console.log)}>
        <TextInput
          placeholder="Email"
          key={form.key("email")}
          {...form.getInputProps("email")}
          classNames={{
            input:
              "rounded-[5px] border-[#EAEAEA] placeholder:text-[#A5A5A5] focus:border-chateau-green",
          }}
        />
        <Button
          type="submit"
          classNames={{
            root: "mt-27 bg-chateau-green hover:bg-chateau-green-600 text-white font-medium text-[16px] leading-16 rounded-[5px] min-h-45 w-full",
          }}
        >
          Send code
        </Button>
      </form>
    </div>
  );
};

export default ForgetPassword;
