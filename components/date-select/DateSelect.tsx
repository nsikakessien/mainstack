import { Listbox } from "@headlessui/react";
import moment from "moment";
import Image from "next/image";
import React, { useState } from "react";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import {
  Calendar,
  DayValue,
  utils,
} from "@hassanmojab/react-modern-calendar-datepicker";
import "./dateSelect.css";
import { CustomWeekdays } from "./locale";

interface Props {
  startValue: DayValue;
  endValue: DayValue;
  onChange: (value: any) => void;
  setStartValue: React.Dispatch<React.SetStateAction<DayValue>>;
  setEndValue: React.Dispatch<React.SetStateAction<DayValue>>;
}

const DateSelect = ({
  startValue,
  endValue,
  onChange,
  setStartValue,
  setEndValue,
}: Props) => {
  const [openStartCalender, setOpenStartCalender] = useState(false);
  const [openEndCalender, setOpenEndCalender] = useState(false);
  return (
    <Listbox
      value={startValue}
      onChange={onChange}
      className="relative w-full"
      as="div"
    >
      {({ open }) => (
        <>
          <Listbox.Button className="w-full flex gap-[6px]">
            <div
              className={`px-4 py-[14px] w-full flex justify-between items-center rounded-xl ${
                openStartCalender
                  ? "border-black-300 bg-white-100 border-[3px]"
                  : "border-gray-50 bg-gray-50 border"
              }`}
              onClick={() => {
                setOpenEndCalender(false);
                setOpenStartCalender(!openStartCalender);
              }}
            >
              <p className="text-sm font-medium text-black-300">
                {moment({
                  ...startValue,
                  month: (startValue?.month as number) - 1,
                }).format("DD MMM YYYY")}
              </p>
              <span
                className={`transition-all ${
                  openStartCalender ? "rotate-180" : ""
                }`}
              >
                <Image
                  src="./assets/icons/black-caret-down.svg"
                  alt="caret icon"
                  width={20}
                  height={20}
                />
              </span>
            </div>
            <div
              className={`px-4 py-[14px] w-full flex justify-between items-center rounded-xl ${
                openEndCalender
                  ? "border-black-300 bg-white-100 border-[3px]"
                  : "border-gray-50 bg-gray-50 border"
              }`}
              onClick={() => {
                setOpenStartCalender(false);
                setOpenEndCalender(!openEndCalender);
              }}
            >
              <p className="text-sm font-medium text-black-300">
                {moment({
                  ...endValue,
                  month: (endValue?.month as number) - 1,
                }).format("DD MMM YYYY")}
              </p>{" "}
              <span
                className={`transition-all ${
                  openEndCalender ? "rotate-180" : ""
                }`}
              >
                <Image
                  src="./assets/icons/black-caret-down.svg"
                  alt="caret icon"
                  width={20}
                  height={20}
                />
              </span>
            </div>
          </Listbox.Button>
          <Listbox.Options static className=" w-full">
            {openStartCalender && (
              <div className="calender-override w-full absolute right-0 left-0">
                <Calendar
                  value={startValue}
                  onChange={(val: DayValue) => {
                    setOpenStartCalender(!openStartCalender);
                    setStartValue(val);
                  }}
                  locale={CustomWeekdays}
                />
              </div>
            )}
            {openEndCalender && (
              <div className="calender-override w-full absolute right-0 left-0">
                <Calendar
                  value={endValue}
                  onChange={(val: DayValue) => {
                    setOpenEndCalender(!openEndCalender);
                    setEndValue(val);
                  }}
                  locale={CustomWeekdays}
                />
              </div>
            )}
          </Listbox.Options>
        </>
      )}
    </Listbox>
  );
};

export default DateSelect;
