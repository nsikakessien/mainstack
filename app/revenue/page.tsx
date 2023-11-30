"use client";
import { Transactions, Wallet } from "@api/user/types";
import { Chart, registerables } from "chart.js";
import { useGetTransactions, useGetWallet } from "@api/user/user";
import Loader from "@components/loader/Loader";
import React, { useEffect, useMemo, useState } from "react";
import { Line } from "react-chartjs-2";
import currencyFormatter from "@utils/formatCurrency";
import Image from "next/image";
import moment from "moment";
import Filter from "@components/filter/Filter";
import { DayValue } from "react-modern-calendar-datepicker";
import { Data } from "@components/select/Select";

Chart.register(...registerables);

const RevenuePage = () => {
  const [startDate, setStartDate] = useState<DayValue>({
    year: moment().subtract(7, "days").year(),
    month: moment().subtract(7, "days").month() + 1,
    day: moment().subtract(7, "days").date(),
  });
  const [endDate, setEndDate] = useState<DayValue>({
    year: moment().year(),
    month: moment().month() + 1,
    day: moment().date(),
  });
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transactions[]
  >([]);
  const [openFilter, setOpenFilter] = useState(false);
  const [applyFilter, setApplyFilter] = useState(false);
  const [transactionType, setTransactionType] = useState<Data[]>([]);
  const [transactionStatus, setTransactionStatus] = useState<Data[]>([]);
  const [filterCount, setFilterCount] = useState(0);

  const { data: transactions, isLoading } = useGetTransactions();
  const { data: walletData, isLoading: loadingWallet } = useGetWallet();

  const wallet = useMemo(() => walletData?.data as Wallet, [walletData]);

  const changeDateFormat = (date: DayValue) => {
    return new Date(`${date?.year}-${date?.month as number}-${date?.day}`);
  };

  const walletDetails = [
    {
      id: crypto.randomUUID(),
      name: "Ledger Balance",
      value: wallet?.ledger_balance,
    },
    {
      id: crypto.randomUUID(),
      name: "Total Payout",
      value: wallet?.total_payout,
    },
    {
      id: crypto.randomUUID(),
      name: "Total Revenue",
      value: wallet?.total_revenue,
    },
    {
      id: crypto.randomUUID(),
      name: "Pending Payout",
      value: wallet?.pending_payout,
    },
  ];

  const getDatesBetween = (start: DayValue, end: DayValue): Date[] => {
    const changeStartDate = changeDateFormat(start);
    const changeEndDate = changeDateFormat(end);
    const dates: Date[] = [];
    let currentDate = new Date(changeStartDate);

    while (currentDate <= changeEndDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  const data = {
    labels: getDatesBetween(startDate, endDate),
    datasets: [
      {
        data:
          filteredTransactions.length > 0
            ? filteredTransactions.map((item) => item.amount)
            : Array(getDatesBetween(startDate, endDate).length).fill(50),
        fill: false,
        borderColor: "#FF5403",
        borderWidth: 1,
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          autoSkip: false,
          callback: (value: any, index: number, values: any) => {
            if (index === 0) {
              return moment(changeDateFormat(startDate)).format("MMM D, YYYY");
            } else if (index === values.length - 1) {
              return moment(changeDateFormat(endDate)).format("MMM D, YYYY");
            } else {
              return "";
            }
          },
        },
      },
      y: {
        display: false,
      },
    },
  };

  const clearFilter = () => {
    setTransactionStatus([]);
    setTransactionType([]);
    setStartDate({
      year: moment().subtract(7, "days").year(),
      month: moment().subtract(7, "days").month() + 1,
      day: moment().subtract(7, "days").date(),
    });
    setEndDate({
      year: moment().year(),
      month: moment().month() + 1,
      day: moment().date(),
    });
  };

  useEffect(() => {
    if (transactions?.success) {
      const listOfTransactions = transactions?.data as Transactions[];
      let filterValues: Transactions[] = listOfTransactions;

      if (startDate?.day && endDate?.day) {
        filterValues = listOfTransactions.filter(
          (item) =>
            moment(item.date).isBetween(
              changeDateFormat(startDate),
              changeDateFormat(endDate),
              "day"
            ) ||
            moment(item.date).isSame(changeDateFormat(startDate), "day") ||
            moment(item.date).isSame(changeDateFormat(endDate), "day")
        );
      }

      if (transactionType.length > 0) {
        let arr: Transactions[] = [];

        filterValues.map((item) => {
          if (transactionType.find((val) => val.value === item.type)) {
            arr.push(item);
          }
        });

        filterValues = arr;
      }
      if (transactionStatus.length > 0) {
        let arr: Transactions[] = [];

        filterValues.map((item) => {
          if (
            transactionStatus.find(
              (val) => val.name.toLowerCase() === item.status
            )
          ) {
            arr.push(item);
          }
        });

        filterValues = arr;
      }

      setFilteredTransactions(filterValues);
      setApplyFilter(false);
    } else {
      setFilteredTransactions([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applyFilter]);

  const getStatusColor = (text: string) => {
    switch (text) {
      case "successful":
        return "text-jade-400";
      case "pending":
        return "text-jade-400";
      default:
        return "text-gray-400";
    }
  };

  const handleTransactionSelect = (value: Data) => {
    const isSelected = transactionType.find((val) => val.name === value.name);

    if (isSelected) {
      const newTransactions = transactionType.filter(
        (val) => val.name !== value.name
      );
      setTransactionType(newTransactions);
    } else {
      setTransactionType([...transactionType, value]);
    }
  };

  const handleTransactionStatusSelect = (value: Data) => {
    const isSelected = transactionStatus.find((val) => val.name === value.name);

    if (isSelected) {
      const newTransactions = transactionStatus.filter(
        (val) => val.name !== value.name
      );
      setTransactionStatus(newTransactions);
    } else {
      setTransactionStatus([...transactionStatus, value]);
    }
  };

  useEffect(() => {
    const isDateFilter = startDate?.day && endDate?.day ? 1 : 0;
    const isTypeFilter = transactionType.length > 0 ? 1 : 0;
    const isStatusFilter = transactionStatus.length > 0 ? 1 : 0;

    setFilterCount(isDateFilter + isTypeFilter + isStatusFilter);
  }, [
    endDate?.day,
    startDate?.day,
    transactionStatus.length,
    transactionType.length,
  ]);

  if (isLoading || loadingWallet) return <Loader />;

  return (
    <>
      <section className="lg:px-[140px] pt-16 pb-[164px]">
        <div className="flex lg:justify-between lg:flex-row flex-col lg:gap-0 gap-8 w-full mb-24">
          <div className="flex flex-col lg:w-2/3 w-full justify-center gap-4">
            <div className="flex lg:gap-16 gap-3">
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium text-gray-400 text-left">
                  Available Balance
                </p>
                <p className="text-4xl font-bold text-black-300 text-left">
                  {currencyFormatter.format(wallet.balance)}
                </p>
              </div>

              <button className="text-base font-semibold text-white-100 bg-black-300 rounded-[100px] px-7 py-[14px]">
                Withdraw
              </button>
            </div>
            <div className="flex justify-center">
              <Line options={options} data={data} />
            </div>
          </div>

          <div className="flex flex-col justify-between">
            {walletDetails.map((details) => (
              <div key={details.id} className="flex flex-col gap-2">
                <div className="flex w-[271px] justify-between">
                  <p className="text-sm font-medium text-gray-400">
                    {details.name}
                  </p>
                  <Image
                    src="./assets/icons/info.svg"
                    alt="info icon"
                    width={20}
                    height={20}
                  />
                </div>

                <p className="text-[28px] font-bold text-black-300">
                  {currencyFormatter.format(details.value)}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-[57px]">
          <div className="flex w-full lg:justify-between lg:flex-row flex-col lg:gap-0 gap-4">
            <div className="flex flex-col">
              <p className="text-black-300 text-2xl font-bold">{`${filteredTransactions?.length} Transactions`}</p>
              <p>
                {startDate?.day === moment().subtract(7, "days").date() &&
                startDate.month === moment().subtract(7, "days").month() + 1 &&
                startDate.year === moment().subtract(7, "days").year() &&
                endDate?.day === moment().date() &&
                endDate.month === moment().month() + 1 &&
                endDate.year === moment().year() &&
                !applyFilter
                  ? "Your transactions for the last 7 days"
                  : "Your transactions for All Time"}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                className="bg-gray-50 rounded-[100px] text-black-300 py-3 pr-5 pl-[30px] flex items-center gap-3"
                onClick={() => setOpenFilter(true)}
              >
                <div className="flex gap-1 items-center">
                  <p className="text-base font-semibold">Filter</p>
                  {filterCount > 0 && (
                    <span className="bg-black-300 text-xs font-medium text-white-100 w-5 h-5 flex justify-center items-center rounded-full">
                      {filterCount}
                    </span>
                  )}
                </div>
                <Image
                  src="./assets/icons/black-caret-down.svg"
                  alt="caret icon"
                  width={20}
                  height={20}
                />
              </button>
              <button className="bg-gray-50 rounded-[100px] text-black-300 py-3 pr-5 pl-[30px] flex items-center gap-3">
                <p className="text-base font-semibold">Export list</p>
                <Image
                  src="./assets/icons/export.svg"
                  alt="caret icon"
                  width={20}
                  height={20}
                />
              </button>
            </div>
          </div>

          {filteredTransactions?.length ? (
            <div className="flex flex-col gap-6">
              {filteredTransactions?.map((transaction) => (
                <div
                  key={transaction.payment_reference}
                  className="flex justify-between items-center"
                >
                  <div className="flex items-center gap-[14.5px]">
                    <Image
                      src={
                        transaction.type === "deposit"
                          ? "./assets/icons/credit-eclipse.svg"
                          : "./assets/icons/debit-eclipse.svg"
                      }
                      alt="deposit logo"
                      width={48}
                      height={48}
                    />
                    <div className="flex flex-col gap-[9px]">
                      <p className="text-base font-medium text-black-300">
                        {transaction.type === "deposit"
                          ? transaction?.metadata?.type
                          : "Cash withdrawal"}
                      </p>
                      <p
                        className={`text-sm font-medium ${
                          transaction.type === "deposit"
                            ? "text-gray-400"
                            : getStatusColor(transaction.status)
                        }`}
                      >
                        {transaction.type === "deposit"
                          ? transaction?.metadata?.name
                          : transaction.status}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <p className="text-base font-bold text-black-300">
                      {currencyFormatter.format(transaction.amount)}
                    </p>
                    <p className="text-gray-400 text-sm font-medium">
                      {moment(transaction.date).format("MMM DD, YYYY")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full flex justify-center">
              <div className="flex flex-col items-start">
                <Image
                  src="./assets/icons/empty-icon.svg"
                  alt="empty transaction icon"
                  className="mb-5"
                  width={48}
                  height={48}
                />

                <div className="flex flex-col gap-[10px] mb-8">
                  <p className="text-black-300 text-[28px] font-bold max-w-[369px]">
                    No matching transaction found for the selected filter
                  </p>
                  <p className="text-base text-gray-400 font-medium">
                    Change your filters to see more results, or add a new
                    product.
                  </p>
                </div>

                <button
                  className="text-base font-semibold text-black-300 px-6 py-3 bg-gray-50 rounded-[100px]"
                  onClick={() => clearFilter()}
                >
                  Clear Filter
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
      <Filter
        visible={openFilter}
        onclose={setOpenFilter}
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        transactionType={transactionType}
        transactionStatus={transactionStatus}
        handleTransactionSelect={handleTransactionSelect}
        handleTransactionStatusSelect={handleTransactionStatusSelect}
        setEndDate={setEndDate}
        setApplyFilter={setApplyFilter}
        clearFilter={clearFilter}
      />
    </>
  );
};

export default RevenuePage;
