import { useQuery } from "react-query";
import User from ".";

const USER = "user";
const TRANSACTIONS = "transactions";

export const useGetUser = () => useQuery([USER], () => User.getUser());
export const useGetTransactions = () =>
  useQuery([TRANSACTIONS], () => User.getUserTransactions());
