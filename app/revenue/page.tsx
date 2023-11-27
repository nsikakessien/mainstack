"use client";
import { Transactions } from "@api/user/types";
import { Chart, registerables } from "chart.js";
import { useGetTransactions } from "@api/user/user";
import Loader from "@components/loader/Loader";
import React, { useMemo, useState } from "react";
import { Line } from "react-chartjs-2";

Chart.register(...registerables);

const RevenuePage = () => {
  const [startDate, setStartDate] = useState(new Date("2023-01-01"));
  const [endDate, setEndDate] = useState(new Date("2023-01-10"));
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  const { data: transactions, isLoading } = useGetTransactions();
  const listOfTransactions = useMemo(
    () => transactions?.data as Transactions[],
    [transactions]
  );

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
            console.log();
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

  if (isLoading) return <Loader />;

  return (
    <section className="lg:px-[140px]">
      <div className="grid grid-cols-3 w-full justify-between">
        <div className="col-span-2">
          <div>
            <Line options={options} data={data} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default RevenuePage;
