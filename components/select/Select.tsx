import { Listbox } from "@headlessui/react";
import React, { useState } from "react";
import Image from "next/image";

export type Data = Record<string, any>;

interface Props {
  value: Data[];
  placeholder: string;
  multiSelect?: boolean;
  field?: string;
  onChange: (value: Data) => void;
  list: Data[];
}

const Select = ({
  value,
  onChange,
  list,
  placeholder,
  multiSelect = false,
}: Props) => {
  const [openList, setOpenList] = useState(false);
  return (
    <Listbox
      as="div"
      value={value}
      onChange={(value: Data) => {
        onChange(value);
      }}
      className="relative"
    >
      {({ open }) => (
        <>
          <Listbox.Button
            className={`pl-4 pr-9 py-[14px] relative w-full flex items-center rounded-xl ${
              openList
                ? "border-black-300 bg-white-100 border-[3px]"
                : "border-gray-50 bg-gray-50 border"
            }`}
            onClick={() => setOpenList(!openList)}
          >
            {value.length === 0 && (
              <p className="text-sm font-medium text-black-300">
                {placeholder}
              </p>
            )}
            {value.length > 0 && (
              <>
                {multiSelect ? (
                  <p
                    className="text-sm font-medium text-black-300"
                    style={{
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {value.map((val) => val.name).join(", ")}
                  </p>
                ) : (
                  <p className="text-sm font-medium text-black-300">
                    {value[0].name}
                  </p>
                )}
              </>
            )}
            <span
              className={`absolute right-4 transition-all ${
                openList ? "rotate-180" : ""
              }`}
            >
              <Image
                src="./assets/icons/black-caret-down.svg"
                alt="caret icon"
                width={20}
                height={20}
              />
            </span>
          </Listbox.Button>
          {openList && (
            <Listbox.Options
              static
              className="bg-white-100 rounded-xl z-30 p-2 shadow-[0px_6px_12px_0px_rgba(92,115,131,0.08), 0px_4px_8px_0px_rgba(92,115,131,0.08)]"
            >
              {list.map((item) => (
                <Listbox.Option
                  key={item.id}
                  value={item}
                  className="p-[14px] flex gap-3 items-center cursor-pointer"
                >
                  <input
                    type="checkbox"
                    name={item.name as string}
                    checked={
                      value.find((val) => val.name === item.name) ? true : false
                    }
                    className="accent-black-300 h-[20px] w-[20px]"
                  />
                  <p>{item.name}</p>
                </Listbox.Option>
              ))}
            </Listbox.Options>
          )}
        </>
      )}
    </Listbox>
  );
};

export default Select;
