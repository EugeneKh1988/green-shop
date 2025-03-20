import Link from "next/link";
import SvgIcon from "./SvgIcon";


interface AccountSideProps {
  activeMenu: string;
  menu: { name: string; href: string, icon: string }[];
  className?: string;
}

const AccountSide: React.FC<AccountSideProps> = ({
  activeMenu,
  menu,
  className,
}) => {
  const classNameValue = className ? `${className}` : "";

  return (
    <div className={`bg-alabaster min-w-310 ${classNameValue}`}>
      <h2 className="font-bold text-[18px] leading-16 pt-17 pl-18">
        My Account
      </h2>
      <ul className="mt-18 text-[15px] leading-45">
        {menu.map((item, index) => (
          <li
            className={`${activeMenu === item.name ? 'text-chateau-green font-bold bg-white border-l-5 border-l-chateau-green' : ""} pl-23`}
            key={index}
          >
            <Link href={item.href} className="flex gap-10 w-full cursor-pointer items-center">
              <SvgIcon iconName={item.icon} className="size-18" />
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AccountSide;
