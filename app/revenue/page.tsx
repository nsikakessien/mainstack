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

Chart.register(...registerables);

const RevenuePage = () => {
  const [startDate, setStartDate] = useState(moment().subtract(7, "days"));
  const [endDate, setEndDate] = useState(moment());
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transactions[]
  >([]);

  const { data: transactions, isLoading } = useGetTransactions();
  const { data: walletData, isLoading: loadingWallet } = useGetWallet();

  const wallet = useMemo(() => walletData?.data as Wallet, [walletData]);

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

  const getDatesBetween = (start: Date, end: Date): Date[] => {
    const dates: Date[] = [];
    let currentDate = new Date(start);

    while (currentDate <= end) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  const data = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        data: [10, 20, 15, 25, 30],
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
            if (index === 0 || index === values.length - 1) {
              return value;
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

  useEffect(() => {
    if (transactions?.success) {
      const listOfTransactions = transactions?.data as Transactions[];
      setFilteredTransactions(listOfTransactions);
    } else {
      setFilteredTransactions([]);
    }
  }, [transactions]);

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

  if (isLoading || loadingWallet) return <Loader />;

  return (
    <section className="lg:px-[140px] pt-16">
      <div className="flex justify-between w-full mb-24">
        <div className="flex flex-col w-2/3">
          <div className="flex gap-16">
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
          <div className="">
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
        <div className="flex w-full justify-between">
          <div className="flex flex-col">
            <p className="text-black-300 text-2xl font-bold">{`${filteredTransactions?.length} Transactions`}</p>
            <p>Your transactions for the last 7 days</p>
          </div>

          <div className="flex items-center gap-3">
            <button className="bg-gray-50 rounded-[100px] text-black-300 py-3 pr-5 pl-[30px] flex items-center gap-3">
              <p className="text-base font-semibold">Filter</p>
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
      </div>
    </section>
  );
};

export default RevenuePage;
