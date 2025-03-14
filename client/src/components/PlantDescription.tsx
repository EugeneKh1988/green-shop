"use client";

import { ITextBlock } from "@/lib/Interfaces";
import { Tabs } from "@mantine/core";
import React from "react";

interface PlantDescriptionProps {
  description?: ITextBlock[];
  className?: string;
}

const PlantDescription: React.FC<PlantDescriptionProps> = ({
  description,
  className,
}) => {
  const classNameValue = className ? `${className}` : "";

  const getParagraph = (item?: ITextBlock) => {
    if (item && item.type == "paragraph") {
      return item.children;
    }
    return [];
  };

  const getParagraphItem = ({type, text, bold}: {type?: string, text?: string, bold?: boolean}) => {
    if(type && type == "text") {
        return <p className={`${bold ? 'font-bold mt-18 text-tuatara': 'font-normal'} text-[14px] leading-24 text-dove-gray`}>{text}</p>
    }
    return null;
  };

  return (
    <Tabs
      defaultValue="description"
      classNames={{
        root: `mt-50 xl:mt-92 ${classNameValue}`,
        tab: "data-active:border-b-3 data-active:border-chateau-green data-active:text-chateau-green",
        tabLabel: "text-[17px] leading-16",
        list: "before:border-b-chateau-green/50 before:border-b-[0.3px]",
        panel: "pt-18",
      }}
    >
      <Tabs.List>
        <Tabs.Tab value="description">Product Description</Tabs.Tab>
        <Tabs.Tab value="reviews">Reviews</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="description">
        <div>
          {description?.map((item: ITextBlock, index: number) => (
            <React.Fragment key={index}>
              {getParagraph(item)?.map((paragraphItem, indexParagraph) => (
                <React.Fragment key={indexParagraph}>
                  {getParagraphItem(paragraphItem)}
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
        </div>
      </Tabs.Panel>
      <Tabs.Panel value="reviews">
        <div></div>
      </Tabs.Panel>
    </Tabs>
  );
};

export default PlantDescription;
