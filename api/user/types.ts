export interface Response<T> {
  success: boolean;
  status?: string | number;
  data: T;
}

export interface UserDetails {
  email: string;
  first_name: string;
  last_name: string;
}

export interface ErrorResponse {
  success: boolean;
  data: string;
}

export interface TransactionMetadata {
  name: string;
  type: string;
  email: string;
  quantity: number;
  country: string;
  product_name: string;
}

export interface Transactions {
  amount: number;
  metadata: TransactionMetadata;
  payment_reference: string;
  status: string;
  type: string;
  date: string;
}

export interface Wallet {
  balance: number;
  total_payout: number;
  total_revenue: number;
  pending_payout: number;
  ledger_balance: number;
}
