import { Breadcrumbs } from "@mantine/core";
import Link from "next/link";
import React from "react";


const BreadCrumbs = ({
  links,
  className,
}: {
  links: {name: string, href?: string}[],
  className?: string;
}) => {
  const classNameValue = className ? className : '';
  return (
    <div className={`text-[15px] leading-16 ${classNameValue}`}>
      <Breadcrumbs separatorMargin="6px">
        {links.map((item, index) => (
          <React.Fragment key={index}>
            {item.href ? (
              <Link href={item.href} className={`${index === 0 ? 'font-bold': 'font-normal'}`}>
                {item.name}
              </Link>
            ) : (
              <p>{item.name}</p>
            )}
          </React.Fragment>
        ))}
      </Breadcrumbs>
    </div>
  );
};

export default BreadCrumbs;
