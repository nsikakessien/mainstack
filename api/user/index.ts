import axiosInstance from "@api/axiosConfig";
import {
  ErrorResponse,
  Response,
  Transactions,
  UserDetails,
  Wallet,
} from "./types";

class User {
  public static async getUser(): Promise<
    Response<UserDetails | ErrorResponse | null>
  > {
    try {
      const response = await axiosInstance.get("user");
      const { data } = response || {};

      return {
        success: true,
        data,
      };
    } catch (error: any) {
      const errorResponse = error.response;
      const { data } = errorResponse || {};
      return {
        success: false,
        data,
      };
    }
  }

  public static async getUserTransactions(): Promise<
    Response<Transactions[] | ErrorResponse | null>
  > {
    try {
      const response = await axiosInstance.get("transactions");
      const { data } = response || {};

      return {
        success: true,
        data,
      };
    } catch (error: any) {
      const errorResponse = error.response;
      const { data } = errorResponse || {};
      return {
        success: false,
        data,
      };
    }
  }

  public static async getUserWallet(): Promise<
    Response<Wallet | ErrorResponse | null>
  > {
    try {
      const response = await axiosInstance.get("wallet");
      const { data } = response || {};

      return {
        success: true,
        data,
      };
    } catch (error: any) {
      const errorResponse = error.response;
      const { data } = errorResponse || {};
      return {
        success: false,
        data,
      };
    }
  }
}

export default User;
