import DateSelect from "@components/date-select/DateSelect";
import Modal from "@components/modal/Modal";
import Select, { Data } from "@components/select/Select";
import React from "react";
import { DayValue } from "react-modern-calendar-datepicker";
import { uuid } from "uuidv4";

interface Props {
  visible: boolean;
  onclose: (shouldClose: boolean) => void;
  tempStartDate: DayValue;
  tempEndDate: DayValue;
  tempTransactionType: Data[];
  tempTransactionStatus: Data[];
  setStartDate: React.Dispatch<React.SetStateAction<DayValue>>;
  setEndDate: React.Dispatch<React.SetStateAction<DayValue>>;
  setTempStartDate: React.Dispatch<React.SetStateAction<DayValue>>;
  setTempEndDate: React.Dispatch<React.SetStateAction<DayValue>>;
  setTransactionType: React.Dispatch<React.SetStateAction<Data[]>>;
  setTransactionStatus: React.Dispatch<React.SetStateAction<Data[]>>;
  setTempTransactionType: React.Dispatch<React.SetStateAction<Data[]>>;
  setTempTransactionStatus: React.Dispatch<React.SetStateAction<Data[]>>;
  clearFilter: () => void;
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
  tempEndDate,
  tempStartDate,
  setTempEndDate,
  setTempStartDate,
  setTempTransactionStatus,
  setTempTransactionType,
  tempTransactionStatus,
  tempTransactionType,
  setStartDate,
  setEndDate,
  setTransactionStatus,
  setTransactionType,
  clearFilter,
}: Props) => {
  const handleTransactionSelect = (value: Data) => {
    const isSelected = tempTransactionType.find(
      (val) => val.name === value.name
    );

    if (isSelected) {
      const newTransactions = tempTransactionType.filter(
        (val) => val.name !== value.name
      );
      setTempTransactionType(newTransactions);
    } else {
      setTempTransactionType([...tempTransactionType, value]);
    }
  };

  const handleTransactionStatusSelect = (value: Data) => {
    const isSelected = tempTransactionStatus.find(
      (val) => val.name === value.name
    );

    if (isSelected) {
      const newTransactions = tempTransactionStatus.filter(
        (val) => val.name !== value.name
      );
      setTempTransactionStatus(newTransactions);
    } else {
      setTempTransactionStatus([...tempTransactionStatus, value]);
    }
  };
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
            startValue={tempStartDate}
            endValue={tempEndDate}
            onChange={() => {}}
            setStartValue={setTempStartDate}
            setEndValue={setTempEndDate}
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 mb-6">
        <p className="text-base font-semibold text-black-300">
          Transaction Type
        </p>
        <div className="w-full pr-[10px]">
          <Select
            value={tempTransactionType}
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
            value={tempTransactionStatus}
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
          onClick={() => {
            clearFilter();
          }}
        >
          Clear
        </button>
        <button
          className="w-full py-3 flex justify-center bg-black-100 rounded-[100px] text-base font-semibold text-white-100"
          onClick={() => {
            setEndDate(tempEndDate);
            setStartDate(tempStartDate);
            setTransactionStatus(tempTransactionStatus);
            setTransactionType(tempTransactionType);
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
