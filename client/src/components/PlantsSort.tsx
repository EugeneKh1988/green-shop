import { Button, Combobox, useCombobox } from "@mantine/core";
import { useEffect } from "react";
import SvgIcon from "./SvgIcon";


interface PlantSortProps {
  onChangeSort: (sort: string) => void;
  currentSortValue: string;
  className?: string;
}

const PlantSort: React.FC<PlantSortProps> = ({
  onChangeSort,
  currentSortValue,
  className,
}) => {
  const classNameValue = className ? `${className}` : "";
  const values = [
    { name: "Ascending price", value: "price:asc" },
    { name: "Descending price", value: "price:desc" },
  ];
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: (eventSource) => {
      if (eventSource === "keyboard") {
        combobox.selectActiveOption();
      } else {
        combobox.updateSelectedOptionIndex("active");
      }
    },
  });

  const currentName = (value: string) => {
    const foundArr = values.filter(item => item.value === value);
    return foundArr.length > 0 ? foundArr[0].name : "";
  };

  return (
    <div className={`flex gap-8 items-center ${classNameValue}`}>
      <p className="text-[15px] leading-16">Sort by:</p>
      <Combobox
        store={combobox}
        width={250}
        position="bottom-end"
        onOptionSubmit={(val) => {
          onChangeSort(val);
          combobox.closeDropdown();
        }}
        classNames={{
          dropdown: "rounded-[4px]",
          option: "rounded-[4px] data-combobox-active:text-chateau-green",
        }}
      >
        <Combobox.Target>
          <Button
            variant="transparent"
            onClick={() => combobox.toggleDropdown()}
            rightSection={
              <SvgIcon
                iconName="arrowDown"
                className={`${combobox.dropdownOpened ? "rotate-180" : ""}`}
              />
            }
            classNames={{
              section: "ml-4",
              root: "px-0 py-0 text-[15px] leading-16 font-normal",
            }}
          >
            {currentName(currentSortValue)}
          </Button>
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Options>
            {values.map((item) => (
              <Combobox.Option
                value={item.value}
                key={item.value}
                active={item.value == currentSortValue}
              >
                {item.name}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </div>
  );
};

export default PlantSort;
