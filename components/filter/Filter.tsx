import DateSelect from "@components/date-select/DateSelect";
import Modal from "@components/modal/Modal";
import Select, { Data } from "@components/select/Select";
import React, { useState } from "react";
import { DayValue } from "react-modern-calendar-datepicker";
import { uuid } from "uuidv4";

interface Props {
  visible: boolean;
  onclose: (shouldClose: boolean) => void;
  startDate: DayValue;
  endDate: DayValue;
  setStartDate: React.Dispatch<React.SetStateAction<DayValue>>;
  setEndDate: React.Dispatch<React.SetStateAction<DayValue>>;
  setApplyFilter: React.Dispatch<React.SetStateAction<boolean>>;
  clearFilter: () => void;
  handleTransactionSelect: (value: Data) => void;
  handleTransactionStatusSelect: (value: Data) => void;
  transactionType: Data[];
  transactionStatus: Data[];
}

const transactionFilters = [
  {
    id: uuid(),
    name: "Store Transactions",
    value: "store",
  },
  {
    id: uuid(),
    name: "Get Tipped ",
    value: "tip",
  },
  {
    id: uuid(),
    name: "Withdrawals",
    value: "withdrawal",
  },
  {
    id: uuid(),
    name: "Chargebacks",
    value: "chargeback",
  },
  {
    id: uuid(),
    name: "Cashbacks",
    value: "cashback",
  },
  {
    id: uuid(),
    name: "Refer & Earn",
    value: "refer",
  },
];

const transactionStatusFilter = [
  {
    id: uuid(),
    name: "Successful",
  },
  {
    id: uuid(),
    name: "Pending",
  },
  {
    id: uuid(),
    name: "Failed",
  },
];

const Filter = ({
  visible,
  onclose,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  handleTransactionSelect,
  handleTransactionStatusSelect,
  transactionStatus,
  transactionType,
  setApplyFilter,
  clearFilter,
}: Props) => {
  return (
    <Modal visible={visible} onClose={onclose} title="Filter">
      <div className="flex items-center justify-between mb-7">
        <button className="px-[18px] tracking-tighter py-[10px] border border-gray-50 bg-white-100 rounded-[100px] text-black-300 text-sm font-semibold">
          Today
        </button>
        <button className="px-[18px] whitespace-nowrap tracking-tighter py-[10px] border border-gray-50 bg-white-100 rounded-[100px] text-black-300 text-sm font-semibold">
          Last 7 days
        </button>
        <button className="px-[18px] whitespace-nowrap tracking-tighter py-[10px] border border-gray-50 bg-white-100 rounded-[100px] text-black-300 text-sm font-semibold">
          This month
        </button>
        <button className="px-[18px] whitespace-nowrap tracking-tighter py-[10px] border border-gray-50 bg-white-100 rounded-[100px] text-black-300 text-sm font-semibold">
          Last 3 months
        </button>
      </div>

      <div className="flex flex-col gap-3 mb-6">
        <p className="text-base font-semibold text-black-300">Date Range</p>
        <div className="w-full pr-[10px]">
          <DateSelect
            startValue={startDate}
            endValue={endDate}
            onChange={() => {}}
            setStartValue={setStartDate}
            setEndValue={setEndDate}
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 mb-6">
        <p className="text-base font-semibold text-black-300">
          Transaction Type
        </p>
        <div className="w-full pr-[10px]">
          <Select
            value={transactionType}
            placeholder="Select Transaction Type"
            list={transactionFilters}
            onChange={handleTransactionSelect}
            multiSelect
          />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-base font-semibold text-black-300">
          Transaction Status
        </p>
        <div className="w-full pr-[10px]">
          <Select
            value={transactionStatus}
            placeholder="Select Transaction Status"
            list={transactionStatusFilter}
            onChange={handleTransactionStatusSelect}
            multiSelect
          />
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 px-6 py-5 flex gap-3">
        <button
          className="w-full py-3 flex justify-center bg-white-100 rounded-[100px] text-black-300 border border-gray-50 text-base font-semibold"
          onClick={() => clearFilter()}
        >
          Clear
        </button>
        <button
          className="w-full py-3 flex justify-center bg-black-100 rounded-[100px] text-base font-semibold text-white-100"
          onClick={() => {
            setApplyFilter(true);
            onclose(false);
          }}
        >
          Apply
        </button>
      </div>
    </Modal>
  );
};

export default Filter;
