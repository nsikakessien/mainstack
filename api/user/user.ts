import { useQuery } from "react-query";
import User from ".";

const USER = "user";
const TRANSACTIONS = "transactions";
const WALLET = "wallet";

export const useGetUser = () => useQuery([USER], () => User.getUser());
export const useGetTransactions = () =>
  useQuery([TRANSACTIONS], () => User.getUserTransactions());
export const useGetWallet = () =>
  useQuery([WALLET], () => User.getUserWallet());
